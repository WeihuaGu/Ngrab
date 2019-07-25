var textblock = require('./textblock');
const jsdom = require("jsdom");
const {
        JSDOM
} = jsdom;

var dom = new JSDOM(`<body>
 <div id="_so_pdsBy_0"></div>

</body>`);
var body = dom.window.document.body;

console.log(textblock.getLinkLength(body));
console.log(textblock.getAllLength(body));
console.log(textblock.getUnrelatedLength(body));
console.log(textblock.DL(body));
console.log(textblock.DU(body));

console.log("test no text div");
console.log(body.innerText);
console.log("ha ha");

