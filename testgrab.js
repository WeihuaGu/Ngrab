var grabtextblock = require('./grabtextblock');
var testdata = `<body>
<div id="note-fixed-ad-container">
    <div id="fixed-ad-container">
      <div id="write-notes-ad"></div>
      <div id="youdao-fixed-ad">ha</div>
      <div id="yuxi-fixed-ad"></div>
       <div id="zhangxin-fixed-ad"></div>
      <div id="_so_pdsBy_0"></div>
    </div>
  </div>
</body>`;
var result=grabtextblock.getTextBlocks(testdata);
console.log(result.outerHTML);

