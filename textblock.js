var grabtextblock = require('./grabtextblock');
var irrelevantwords = ["版权", "声明", "搜索", "首页", "主页", "帮助", "注册", "登录", "反馈", "设置", "分享", "下载"];
//获取文本块中的文字总长度
var getAllLength = (textnode) => {
        var text = textnode.textContent;
        if (text)
                return text.length;
        return 0;
}
//获取链接文字的总长度
var getLinkLength = (textnode) => {
        var linklist = textnode.querySelectorAll("a");
        var sum = 0;
        if (linklist.length > 0)
                linklist.forEach((link) => {
                        var text = link.textContent;
                        if (text)
                                sum = sum + text.length;

                });
        return sum;
}




//获取为无效词的文字总长度
var getUnrelatedLength = (textnode) => {
        var text = textnode.textContent;
        var sum = 0;
        if (text)
                irrelevantwords.forEach((irwords) => {
                        var irwordsnum = (text.split(irwords)).length - 1;
                        if (irwordsnum > 0)
                                sum = irwordsnum * (irwords.length) + sum;



                });
        return sum;

}

//链接密度
var DL = (textnode) => {
        if(getAllLength(textnode)==0)
                return 0;
        var density = getLinkLength(textnode) / getAllLength(textnode);
        console.log("这个标签文本块的链接密度为" + density);
        return density;
}

//无关词密度
var DU = (textnode) => {
        if(getAllLength(textnode)==0)
                return 0;
        var density = getUnrelatedLength(textnode) / getAllLength(textnode);
        console.log("这个标签文本块的无关词密度为" + density);
        return density;

}

var handleTextBlock = (maytextnode, Lmax, Umax) => {
        if (maytextnode.childElementCount > 0) {
                var childlist = maytextnode.children;
                for (var i = 0; i < childlist.length; i++)
                        handleTextBlock(childlist[i], Lmax, Umax);
        } else {
                if (DL(maytextnode) > Lmax | DU(maytextnode) > Umax) {
                        console.log("大于阈值，删除节点");
                        var parent = maytextnode.parentElement;
                        if (parent == undefined)
                                return;
                        var removed = parent.removeChild(maytextnode);

                }
                else
                        console.log("小于阈值，正文节点保留");

        }



        return maytextnode;
}

module.exports.handleTextBlock = handleTextBlock;
module.exports.getAllLength = getAllLength;
module.exports.getLinkLength = getLinkLength;
module.exports.getUnrelatedLength = getUnrelatedLength;
module.exports.DL = DL;
module.exports.DU = DU;
