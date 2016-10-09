// new.js
// TODO 并不是所有非中文字符宽度都为中文字符宽度一半，需特殊处理

const input = require('../../utils/input.js');
const config = require('../../config.js');

const RESOLUTION = 750;  // 微信规定屏幕宽度为750rpx
const MARGIN = 10;  // 写字面板左右margin
const ROW_CHARS = Math.floor((RESOLUTION - 2 * MARGIN) / config.input.charWidth);
const MAX_CHAR = 1000;  // 最多输1000字符

Page({

  data: {
    // 日记对象
    diary: {},

    // 页面所处模式
    showMode: 'common',

    // 输入框状态对象
    input: {
      row: 0,
      column: 0,
      lines: [''],
    },

    // 待传至模板对象
    data: null,
  },

  // 页面初始化
  onLoad: function(options){
    if (options) {
      let title = options.title;
      if (title) {this.setData({'diary.title': title});}
    }

    this.setData({data: this.data.diary});
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
    this.setData({input: {row: 0, common: 0, lines: ['']}});
  },

  // 进入文本编辑模式
  inputTouch(event) {
    this.setData({showMode: 'inputText', data: this.data.input});
  },

  // 取消文本编辑
  inputCancel() {
    this.setData({showMode: 'common'});
    this.clearInput();
  },

  // 文本输入
  textInput(event) {
    let context = event.detail;
    let [lines, row] = [this.data.input.lines, this.data.input.row];

    if (context.value.length != context.cursor) {
      console.log('用户输入中...');
    } else {
      let len = input.strlen(context.value);
      console.log('当前文本长度: ' + len);

      // 当前输入长度超过规定长度
      if (len >= ROW_CHARS) {
        let text = context.value;
        let [extra, extra_index] = [[['']], 0];

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

        lines[lines.length - 1] = text;
        extra.reverse().forEach((element, index, array) => {
          lines.push(element.join(''));
          row += 1;
        })

        this.setData({'input.lines': lines, 'input.row': row});
        this.setData({data: this.data.input});
      }
    }
  }
})
