var ngrab = require('./ngrab');
var testurl = "https://www.jianshu.com/p/e7b3ab521742";
ngrab.getMainPage(testurl,"html",(err,result)=>{
    if(err)
        console.log(err);
    else
        console.log(result);


});
