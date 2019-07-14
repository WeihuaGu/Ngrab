var cheerio = require("cheerio");
var page = require('./page');
var grabtextblock = require('./grabtextblock');
var testurl = "https://xueqiu.com/6195589551/129583938";
page.getCleanPage(testurl).then((data) => {
        var blocks=grabtextblock.getTextBlocks(data.body);
        console.log(blocks);
}, (err) => {
        console.log(err);
});

