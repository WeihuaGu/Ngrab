var grabtextblock = require('./grabtextblock');
//获取文本块中的文字总长度
var getAllLength = (textnode) => {




}
//获取链接文字的总长度
var getLinkLength = (textnode) => {



}
//获取为无效词的文字总长度
var getUnrelatedLength = (textnode) => {



}

//链接密度
var DL = (textnode) => {
        return getLinkLength(textnode) / getAllLength(textnode);
}

//无关词密度
var DU = (textnode) => {
        return getUnrelatedLength(textnode) / getAllLength(textnode);

}

var handleTextBlock = (maytextnode, Lmax, Umax) => {
        if (grabtextblock.isTextBlockTag(maynode.tagname) | maynode.tagname == 'BODY') {
                if (maytextnode.childElementCount) {
                        var childlist = maytextnode.children;
                        for (var i = 0; i < childlist.length; i++)
                                handleTextBlock(childlist[i], Lmax, Umax);
                } else {
                        if (DL(maytextnode) > Lmax | DU(maytextnode) > Umax) {
                                var parent = maytextnode.parentElement;
                                if (parent == undefined)
                                        return;
                                var removed = parent.removeChild(maytextnode);



                        }

                }


        }
        return maytextnode;
}

module.exports.handleTextBlock = handleTextBlock;
