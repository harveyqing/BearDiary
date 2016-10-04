// index.js

var app = getApp()

var diaries = require("../../demo/list.js")

Page({

    data: {
        diaries: diaries.data.diaries,
        deviceInfo: {},
    },

    onLoad() {
        var that = this;
        // 获取当前设备信息
        app.getDeviceInfo(function(deviceInfo) {
            that.setData({
                deviceInfo: deviceInfo,
            });

            console.log(deviceInfo);
        })
    }
})
