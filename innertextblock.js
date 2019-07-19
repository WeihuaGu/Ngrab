//文本块内部

var linetag = ["p", "tr", "div", "li", "br"];
var lookingLeafnode = (textnode, textlinearray, index = 0) => {
        if (textnode.childElementCount > 0) {
                /** 
                if (isAlinebreakTag(textnode.tagName)) {
                        var linedic = {"node":undefined,"text":textnode.childNodes[0].nodeValue ? textnode.childNodes[0].nodeValue : textnode.textContent,"index":index};
                        textlinearray.push(linedic);
                }
                **/
                var childlist = textnode.children;
                for (var i = 0; i < childlist.length; i++)
                        lookingLeafnode(childlist[i], textlinearray, index++);
        } else {
                if (isAlinebreakTag(textnode.tagName)) {
                        var linedic = {
                                "node": textnode,
                                "text": textnode.textContent,
                                "index": index
                        };
                        textlinearray.push(linedic);
                } else
                ;
                //console.log(textnode+"不是换行标签"+"其内容为:"+textnode.textContent);

        }

}
var isAlinebreakTag = (tagname) => {
        if (tagname == undefined)
                return false;
        var tag = tagname.toLowerCase();
        if (linetag.indexOf(tag) != -1)
                return true;
        else
                return false;
}
var getTextlineArray = (textnode) => {
        var textlinearray = [];
        lookingLeafnode(textnode, textlinearray);
        return textlinearray;

}

var len = (textlinearray, i) => {
        return textlinearray[i].text.lenght;
}

var dens = (textlinearray, X, H) => {
        var sum = 0;
        for (var i = X; i <= X + H; i++)
                sum = sum + len(textlinearray, i);

        return sum / H;
}

var textWindowDensity = (textlinearray, i, textwindowhigh) => {
        var LineCount = textlinearray.length;
        if (i>= (LineCount - textwindowhigh))
                dens(textlinearray, LineCount - textwindowhigh, textwindowhigh);
        if (i<= textwindowhigh)
                dens(textlinearray, 0, textwindowhigh);
        if (textwindowhigh < i < (LineCount - textwindowhigh))
                dens(textlinearray, i - textwindowhigh, 2*textwindowhigh + 1);
}

var getDmin = (textlinearray, textwindowhigh, densitycoefficient) => {
        var densitys = [];
        var LineCount = textlinearray.length;
        for (var i = 0; i < LineCount; i++)
                densitys.push(textWindowDensity(textlinearray, i, textwindowhigh));
        return Math.max(densitys) * densitycoefficient;
}

var hindleInnerTextBlock = (textnode, textwindowhigh = 3, densitycoefficient = 0.3) => {
        var maynoiseline = [];
        var textlinearray = getTextlineArray(textnode);
        var LineCount = textlinearray.length;
        var Dmin = getDmin(textlinearray, textwindowhigh, densitycoefficient);
        for (var i = 0; i < LineCount; i++) {
                if (textWindowDensity(textlinearray, i, textwindowhigh) < Dmin)
                        maynoiseline.push(i);

        }
        if (maynoiseline.length > 0) {
                var consecutivenums = getConsecutivenumbers(maynoiseline);
                if (consecutivenums.length > 0) {
                        if (consecutivenums[0][0] < 3)
                                consecutivenums[0].forEach((num) => {
                                        deleteTextnode(textlinearray[num].node);


                                });
                        if (consecutivenums[consecutivenums.length - 1][0] > (Math.max(maynoiseline) - 3))
                                consecutivenums[consecutivenums.length - 1].forEach((num) => {
                                        deleteTextnode(textlinearray[num].node);


                                });
                }
        }
}



var deleteTextnode = (textnode) => {
        var parent = textnode.parentElement;
        if (parent == undefined)
                return;
        var removed = parent.removeChild(textnode);
}


var getConsecutivenumbers = (arr) => {
        var result = [],
                i = 0;
        result[i] = [arr[0]];
        arr.reduce(function(prev, cur) {
                cur - prev === 1 ? result[i].push(cur) : result[++i] = [cur];
                return cur;
        });
        return result;
}


module.exports.getTextlineArray = getTextlineArray;
module.exports.hindleInnerTextBlock = hindleInnerTextBlock;
