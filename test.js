var ngrab = require('./ngrab');
var testurl = "https://xueqiu.com/5159163033/129847502";
ngrab.getMainPage(testurl,"html",(err,result)=>{
    if(err)
        console.log(err);
    else
        console.log(result);


});
