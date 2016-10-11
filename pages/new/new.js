// new.js
// TODO 并不是所有非中文字符宽度都为中文字符宽度一半，需特殊处理
// TODO 由于文本框聚焦存在bug，故编辑模式待实现

const input = require('../../utils/input.js');
const config = require('../../config.js');
const geo = require('../../services/geo.js');

const RESOLUTION = 750;  // 微信规定屏幕宽度为750rpx
const MARGIN = 10;  // 写字面板左右margin
const ROW_CHARS = Math.floor((RESOLUTION - 2 * MARGIN) / config.input.charWidth);
const MAX_CHAR = 1000;  // 最多输1000字符

const TEXT = 'TEXT';

var mediaActionSheetItems = ['拍照', '选择照片', '选择视频'];

Page({

  data: {
    // 日记对象
    diary: {
      meta: {},
      list: [],
    },

    // 页面所处模式
    showMode: 'common',

    // 输入框状态对象
    inputStatus: {
      row: 0,
      column: 0,
      lines: [''],
      mode: 'INPUT',
      auto: false,  // 是否有自动换行
    },

    // 待传至模板对象
    data: null,

    // 当前位置信息
    poi: null,

    // 点击`图片`tab的action-sheet
    mediaActionSheetHidden: true,

    // 多媒体文件插入action-sheet
    mediaActionSheetItems: mediaActionSheetItems,

    // 是否显示底部tab栏
    showTab: true,
  },

  // 数据初始化
  init() {
    this.getPoi();
    this.setData({
      data: this.data,
    })
  },

  // 页面初始化
  onLoad: function(options) {
    if (options) {
      let title = options.title;
      if (title) {this.setData({'diary.title': title});}
    }

    this.init();
  },

  // 页面渲染完成
  onReady: function(){
    wx.setNavigationBarTitle({title: '编辑日记'});
  },

  onShow:function(){
    // 页面显示
  },

  onHide:function(){
    // 页面隐藏
  },

  onUnload:function(){
    // 页面关闭
  },

  // 清除正在输入文本
  clearInput() {
    this.setData({inputStatus: {
      row: 0,
      common: 0,
      lines: [''],
      mode: 'INPUT',
      auto: false,
    }});
  },

  // 结束文本输入
  inputDone() {
    let text = this.data.inputStatus.lines.join('\n');
    let diary = this.data.diary;

    if (text) {
      diary.list.push(this.makeContent(TEXT, text, ''));
      this.setData({diary: diary});
    }

    this.inputCancel();
  },

  // 进入文本编辑模式
  inputTouch(event) {
    this.setData({showMode: 'inputText', data: this.data});
  },

  // 取消文本编辑
  inputCancel() {
    this.setData({showMode: 'common'});
    this.clearInput();
  },

  // 文本输入
  textInput(event) {
    console.log(event);
    let context = event.detail;

    // 输入模式
    if (this.data.inputStatus.mode === 'INPUT') {
      if (context.value.length != context.cursor) {
        console.log('用户输入中...');
      } else {
        let text = context.value;
        let len = input.strlen(text);
        let lines = this.data.inputStatus.lines;
        let row = this.data.inputStatus.row;
        let [extra, extra_index] = [[['']], 0];
        console.log('当前文本长度: ' + len);

        // 当前输入长度超过规定长度
        if (len >= ROW_CHARS) {
          // TODO 此处方案不完善
          while (input.strlen(text) > ROW_CHARS) {
            let last = text[text.length - 1];

            if (input.strlen(extra[extra_index] + last) > ROW_CHARS) {
              extra_index += 1;
              extra[extra_index] = [''];
            }
            extra[extra_index].unshift(last);
            text = text.slice(0, -1);
          }
      }

      lines[lines.length - 1] = text;
      if (extra_index) {
        extra.reverse().forEach((element, index, array) => {
          lines.push(element.join(''));
          row += 1;
        });
      }

      let inputStatus = {
        lines: lines,
        row: row,
        mode: 'INPUT',
        auto: true,  // // 自动换行的则处于输入模式
      };

      this.setData({inputStatus, data: this.data});
      }
    }
  },

  // 文本框获取到焦点
  focusInput(event) {
    let isInitialInput = this.data.inputStatus.row == 0 &&
                         this.data.inputStatus.lines[0] == 0;
    let isAutoInput = this.data.inputStatus.mode == 'INPUT' &&
                      this.data.inputStatus.auto == true;
    let mode = 'EDIT';

    if (isInitialInput || isAutoInput) {
      mode = 'INPUT';
    }

    this.setData({'inputStatus.mode': mode});
  },

  // 点击多媒体插入按钮
  mediaTouch() {
    this.setData({
      showTab: false,
      data: this.data,
      mediaActionSheetHidden: false,
    });
  },

  mediaActionSheetChange(event) {
    this.setData({
      showTab: true,
      mediaActionSheetHidden: true,
      data: this.data,
    })
  },

  // 获得当前位置信息
  getPoi() {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        geo.mapRequest(
          'geocoder',
          {'location': geo.formatLocation(res)},
          loc => {
            let poi = {
              'latitude': res.latitude,
              'longitude': res.longitude,
              'name': loc.result.address,
            };
            that.setData({poi: poi});
          })
      }
    })
  },

  // 构造日记内容对象
  makeContent(type, content, description) {
    return {
      type: type,
      content: content,
      description: description,
      poi: this.data.poi,
    }
  }
})
