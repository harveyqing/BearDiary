// entry.js

var diaries = require("../../demo/diaries.js");
var toolbar = [
    '../../images/nav/download.png', '../../images/nav/fav.png',
    '../../images/nav/share.png', '../../images/nav/comment.png',
]

Page({
    data: {
        diary: undefined,
        toolbar: toolbar,
    },

    onLoad: function(params) {
        var id = params["id"], diary;
        if (id === undefined) {
            diary = diaries.diaries[0];
        } else {
            diary = diaries.diaries[id % 2]
        }

        this.setData({
            diary: diary,
        })
    },

    onHide: function() {}
})
