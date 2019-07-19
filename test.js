var cheerio = require("cheerio");
var page = require('./page');
var grabtextblock = require('./grabtextblock');
var textblock = require('./textblock');
var innertextblock = require('./innertextblock');
var testurl = "https://xueqiu.com/5159163033/129847502";
page.getCleanPage(testurl).then((data) => {
        var blocks=grabtextblock.getTextBlocks(data.body);
        console.log(innertextblock.getTextlineArray(textblock.handleTextBlock(blocks,0.6,0.1)));
}, (err) => {
        console.log(err);
});

