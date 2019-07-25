const jsdom = require("jsdom");
const {
        JSDOM
} = jsdom;
var textblocktag = ["body", "div", "table", "tr", "td", "th", "ul", "li", "dl", "dt", "dd"];

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
        console.log("fuck"+node);
        if(isLeafNode(node)&&(node.innerText == undefined))
                return true;
        else
                return false;
}

var isLeafNode = (node) => {
        console.log("fuck leaf"+node);
        if (node.firstChild == undefined)
                return true;
        return false;
}

var deleteNode = (node) => {
        var parent = node.parentElement;

        if (parent != undefined){
                var removed = parent.removeChild(node);
                console.log("删除"+removed);
                return removed;
        }
        console.log("父节点为空,不能删除");
        
}


var getRawRoot = (data) => {
        var dom = new JSDOM(data);
        return dom.window.document.body;
}



var getTextBlocksByNode = (node) => {
        if (isTextBlockTag(node.tagName)) {
                if (isLeafNode(node)) {
                        console.log("fuck fuck");
                        if(isMeaninglessTextBlock(node)){
                            deleteNode(node);
                            console.log("删除无用的文本叶子节点"+node.tagName);
                        }
                        return;
                }
                else{
                        var childnodes = node.childNodes;
                        for (item in childnodes) {
                                var childitem = childnodes[item];
                                getTextBlocksByNode(childitem);
                        }

                }
        } else {
                deleteNode(node);
                return ;
        }


        return node;
}

var getTextBlocks = (data) => {
        return getTextBlocksByNode(getRawRoot(data));
}
module.exports.getTextBlocks = getTextBlocks;
module.exports.isTextBlockTag = isTextBlockTag;
