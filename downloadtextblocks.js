const jsdom = require("jsdom");
const {
        JSDOM
} = jsdom;
var nodehandle = require('./nodehandle');
var getRawRoot = (data) => {
        var dom = new JSDOM(data);
        return dom.window.document.body;
}
var getTextBlocksByNode = (node) => {
        if (nodehandle.isTextBlockTag(node.tagName)) {
                if (nodehandle.isLeafNode(node)) {
                        if (nodehandle.isMeaninglessTextBlock(node)) {
                                //console.log("删除无用的文本叶子节点" + node.tagName);
                                nodehandle.deleteNode(node);
                        }
                        return;
                } else {
                        var childnodes = node.childNodes;
                        for (item in childnodes) {
                                var childitem = childnodes[item];
                                getTextBlocksByNode(childitem);
                        }

                }
        } else {
                var existstextnodeflag = {
                        textnode: false
                };
                nodehandle.childNodeExistsTextnode(node, existstextnodeflag);
                if (!existstextnodeflag.textnode && node.tagName != undefined && node.tagName != "IMG") {
                        var parent = node.parentElement;
                        //console.log("删除非文本标签");
                        //console.log(node.tagName);
                        nodehandle.deleteNode(node);
                        return parent;
                }
                return node;
        }


        return node;
}

var getTextBlocks = (data) => {
        var blocks = getTextBlocksByNode(getRawRoot(data));
        var cleanbloks = nodehandle.checkEmptyNode(blocks);
        return cleanbloks;
}
module.exports.getTextBlocks = getTextBlocks;
