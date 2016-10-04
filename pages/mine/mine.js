// mine.js

// 自定义标签
var iconPath = "../../images/icons/"
var tabs = [
    {
        "icon": iconPath + "mark.png",
        "iconActive": iconPath + "markHL.png",
        "title": "日记",
        "extraStyle": "",
    },
    {
        "icon": iconPath + "collect.png",
        "iconActive": iconPath + "collectHL.png",
        "title": "收藏",
        "extraStyle": "",
    },
    {
        "icon": iconPath + "like.png",
        "iconActive": iconPath + "likeHL.png",
        "title": "喜欢",
        "extraStyle": "",
    },
    {
        "icon": iconPath + "more.png",
        "iconActive": iconPath + "moreHL.png",
        "title": "更多",
        "extraStyle": "border:none;",
    },
]


Page({

    // data
    data: {
        mineContentStyle: "",
        tabs: tabs,
        currentTab: "tab1",
        highLightIndex: "0",
        modalShowStyle: "",  // 模态对话框样式 
        dairyTitle: "",  // 日记标题
    },

    // events
    touchTab: function(event){  // 点击tab项事件
        var tabIndex = parseInt(event.currentTarget.id);
        var template = "tab" + (tabIndex + 1).toString();

        this.setData({
            currentTab: template,
            highLightIndex: tabIndex.toString()
        }
        );
    },

    // 点击新建日记按钮
    touchMsg: function (event) {
        this.setData({
            modalShowStyle: "opacity:1;pointer-events:auto;"
        })
    },

    // 新建日记
    touchAddNew: function(event) {
        wx.navigateTo({
            url: "../new/new"
        })
    },

    // 取消标题输入
    touchCancel: function(event) {
        this.setData({
            modalShowStyle: "",
            dairyTitle: "",
        })
    }, 

    // 标题输入事件
    titleInput: function(event) {
        this.setData({
            dairyTitle: event.detail.value,
        })
    }
})
