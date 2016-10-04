// app.js

App({

  onLaunch: function () {
  },

  getUserInfo:function(cb){
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
  }

})
