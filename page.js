var rp = require('request-promise');
var cheerio = require('cheerio');

var removetag = ["script","code","pre"];
var getPage = (url) => {
        return rp(url);
}

var removeExtraneousNodes = (page) => {
        const promise = new Promise((resolve, reject) => {
                if (page) {
                        $ = cheerio.load(page, {
                                decodeEntities: false
                        });
                        for (item in removetag)
                                $(removetag[item]).remove();

                        var pagedic = {
                                "title": $('title').text(),
                                "body": $('body').html()
                        };
                        resolve(pagedic);
                } else {
                        reject("移除无关节点出错");
                }
        });
        return promise;

}
var getCleanPage = (url) => {
        return getPage(url).then(removeExtraneousNodes);
}

module.exports.getCleanPage = getCleanPage;
