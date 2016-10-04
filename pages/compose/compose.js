// compose.js
// TODO 并不是所有非中文字符宽度都为中文字符宽度一半，需特殊处理

const CHAR_WIDTH = 14;  // in rpx, 一个字符的宽度
const RESOLUTION = 750;  // 微信规定屏幕宽度为750rpx
const MARGIN = 10;  // 写字面板左右margin
const ROW_CHARS = Math.floor((RESOLUTION - 2 * MARGIN) / CHAR_WIDTH);

// 计算字符串长度（英文占一个字符，中文汉字占2个字符）
function strlen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
            len++;
        } else {
            len += 2;
        }
    }
    return len;
}

Page({

    // 数据
    data: {
        row: 0,
        column: 0,
        text: '',  // 全部文本
        curText: '',  // 当前行文本
        curLen: 0,  // 当前行文本字符长度
        lines: [''],  // 所有行
        isNew: false,  // 是否需要添加新行
    },

    // 初始化当前输入框
    initInput: function() {
    },

    // 事件
    userInput: function(e) {
        var context = e.detail;
        var lines = this.data.lines;
        var row = this.data.row;

        if (context.value.length != context.cursor) {
            console.log('用户正在输入中！');
        } else {
            var len = strlen(context.value);
            console.log('长度' + len.toString())
            if (len == ROW_CHARS) {  // 需换行
                console.log('当前行已满，需换行！' + row.toString());
                lines[lines.length - 1] = context.value;
                lines.push('');

                row += 1;
                console.log('*****' + row.toString());

                this.setData({
                    lines: lines,
                    row: row,
                });
            }
        }
        console.log(e);
    },
    userInputChange: function(e) {
        console.log(e);
    }
})
