# Ngrab
nodejs 实现的抓取页面正文的引擎

## 原理
> 请参考王少康 ，董科军 1,阎保平 的《使用特征文本密度的网页正文提取》

## 安装依赖
`npm install`

## 使用
```
var ngrab = require('./ngrab');
var testurl = "https://xueqiu.com/9769652619/121511582";
ngrab.getMainPage(testurl,"text",(err,result)=>{
    if(err)
        console.log(err);
    else
        console.log(result);


});
```
