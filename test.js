var ngrab = require('./ngrab');
var testurl = "https://www.jianshu.com/p/f39172019836";
ngrab.getMainPage(testurl,"text",(err,result)=>{
    if(err)
        console.log(err);
    else
        console.log(result);


});
