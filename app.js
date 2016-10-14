// app.js

const config = require('config');

App({

  onLaunch: function () {
    this.getDiaryList();
  },

  getUserInfo:function(cb){
  },

  getDiaryList() {
    var that = this;

    wx.getStorage({
      key: config.storage.diaryListKey,
      success: (res) => {
        this.globalData.diaryList = res.data;
      }
    })
  },

  getDeviceInfo: function(callback) {
    var that = this;

    if (this.globalData.deviceInfo) {
      typeof callback == "function" && callback(this.globalData.deviceInfo)
    } else {
      wx.getSystemInfo({
        success: function(res) {
          that.globalData.deviceInfo = res;
          typeof callback == "function" && callback(that.globalData.deviceInfo)
        }
      })
    }
  },

  globalData: {
    deviceInfo: null,
    diaryList: null,
  }

})
