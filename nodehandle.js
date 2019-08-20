const jsdom = require("jsdom");
const {
        JSDOM
} = jsdom;
var textblocktag = ["body", "article", "div", "table", "tr", "td", "th", "dl", "dt", "dd", "p"];

var isTextBlockTag = (tagname) => {
        if (tagname == undefined)
                return false;
        var tag = tagname.toLowerCase();
        if (textblocktag.indexOf(tag) != -1)
                return true;
        else
                return false;
}

var isCanDeleteNode = (node) => {
        if (!isTextBlockTag(node.tagName) && (node.firstChild == undefined))
                return true;
        else
                return false;
}

var isMeaninglessTextBlock = (node) => {
        //console.log("fuck"+node);
        if (isLeafNode(node) && (node.innerText == undefined))
                return true;
        else
                return false;
}

var isLeafNode = (node) => {
        if (node.firstChild == undefined)
                return true;
        return false;
}

var deleteNode = (node) => {
        if (node == undefined) {
                //console.log("节点为空，不能删除")
                return;
        }
        var parent = node.parentElement;

        if (parent != undefined) {
                var removed = parent.removeChild(node);
                //console.log("删除" + removed.innerHTML);
                return removed;
        }
        //console.log("父节点为空,不能删除"+node);

}



var childNodeExistsTextnode = (node, existstextnodeflag) => {
        if (!isLeafNode(node)) {
                var childnodes = node.childNodes;
                for (item in childnodes) {
                        var childitem = childnodes[item];
                        childNodeExistsTextnode(childitem, existstextnodeflag);
                }


        } else {
                if (isTextBlockTag(node.tagName)) {
                        existstextnodeflag.textnode = true;
                        return;
                } else
                        return;
        }
}

var checkEmptyNode = (node) => {
        if (node == undefined)
                return;
        if (!isLeafNode(node)) {
                var childnodes = node.childNodes;
                for (item in childnodes) {
                        var childitem = childnodes[item];
                        checkEmptyNode(childitem);
                }


        } else {

                if (isMeaninglessTextBlock(node)) {
                        var parent = node.parentElement;
                        deleteNode(node);
                        //checkEmptyNode(parent);
                        return;
                } else
                        return;
        }
        return node;
}



module.exports.checkEmptyNode = checkEmptyNode;
module.exports.isTextBlockTag = isTextBlockTag;
module.exports.childNodeExistsTextnode = childNodeExistsTextnode;
module.exports.deleteNode = deleteNode;
module.exports.isLeafNode = isLeafNode;
module.exports.isMeaninglessTextBlock = isMeaninglessTextBlock;
