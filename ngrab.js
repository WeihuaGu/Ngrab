var page = require('./page');
var downloadtextblocks = require('./downloadtextblocks');
var textblock = require('./textblock');
var innertextblock = require('./innertextblock');
var getMainPage = (url, outputform, callback) => {
        page.getCleanPage(url).then((data) => {
                var blocks = downloadtextblocks.getTextBlocks(data.body);
                var textblocks = textblock.handleTextBlock(blocks, 0.6, 0.1);
                var handledinnertextblocks = innertextblock.hindleInnerTextBlocks(textblocks);
                if (outputform == "text") {
                        callback(null, handledinnertextblocks.textContent);
                        return;
                }
                if (outputform == "html") {
                        callback(null, handledinnertextblocks.outerHTML);
                        return;
                }
        }, (err) => {
                callback(err, null);
        });

}
module.exports.getMainPage = getMainPage;
