var cheerio = require("cheerio");
var page = require('./page');
var grabtextblock = require('./grabtextblock');
var textblock = require('./textblock');
var testurl = "https://www.jianshu.com/p/63d8d32a03fe";
page.getCleanPage(testurl).then((data) => {
        var blocks=grabtextblock.getTextBlocks(data.body);
        console.log(blocks);
}, (err) => {
        console.log(err);
});

