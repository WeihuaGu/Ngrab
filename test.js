var page = require('./page');
var testurl = "https://xueqiu.com/6195589551/129583938";
page.getCleanPage(testurl).then((data) => {
        console.log(data);
}, (err) => {
        console.log(err);
});

