// dairy.js

var app = getApp();

var diaries = require("../../demo/diaries.js");

Page({
    data: {
        dairy: diaries.diaries[0],
    },

    onLoad: function(params) {
        console.log(params);
    }
})
