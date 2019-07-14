const jsdom = require("jsdom");
const {
        JSDOM
} = jsdom;
var textblocktag = ["div", "table", "tr", "td", "th", "ul", "li", "dl", "dt", "dd"];

var isTextBlockTag = (tagname) => {
        if(tagname==undefined)
                return false;
        var tag = tagname.toLowerCase();
        if (textblocktag.indexOf(tag) != -1)
                return true;
        else
                return false;
}

var getRawRoot = (data) => {
        var dom = new JSDOM(data);
        return dom.window.document.body;
}



var getTextBlocksByNode = (root) => {
        var childnodes = root.childNodes;
        if (childnodes == undefined)
                return ;
        for (item in childnodes) {
                var childitem = childnodes[item];
                if (isTextBlockTag(childitem.tagName)) {
                        //console.log(childitem + "是textblock节点");
                        getTextBlocksByNode(childitem);
                } else {
                        var parent = childitem.parentElement;
                        //console.log(childitem+ "不是textblock,删除它");
                        if(parent==undefined)
                                continue;
                        var removed = parent.removeChild(childitem);
                }


        }

        return root;
}

var getTextBlocks = (data) =>{
        return getTextBlocksByNode(getRawRoot(data));
}
module.exports.getTextBlocks = getTextBlocks;
