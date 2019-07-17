var textblock = require('./textblock');
const jsdom = require("jsdom");
const {
        JSDOM
} = jsdom;

var dom = new JSDOM(`<body>
        <div>文本 帮助 主页</div>
        <div>文本<ul class="list pl0"><li class="dib dim mr2 mr3-ns"><a class="c6c55db4 link f6-ns f7 fw5 npme-hidden" id="nav-enterprise-link" data-event-name="npm Enterprise" href="/products/enterprise">npm Enterprise</a></li><li class="dib dim mr2 mr3-ns"><a class="c6c55db4 link f6-ns f7 fw5 npme-hidden" id="nav-products-link" href="/products">Products</a></li><li class="dib dim mr2 mr3-ns"><a class="c6c55db4 link f6-ns f7 fw5 npme-hidden" id="nav-solutions-link" href="/solutions">Solutions</a></li><li class="dib dim mr2 mr3-ns"><a class="c6c55db4 link f6-ns f7 fw5 npme-hidden" id="nav-resources-link" href="/resources">Resources</a></li><li class="dib dim mr2 mr3-ns"><a class="c6c55db4 link f6-ns f7 fw5" id="nav-docs-link" href="https://docs.npmjs.com">Docs</a></li><li class="dib dim"><a class="c6c55db4 link f6-ns f7 fw5" id="nav-support-link" href="/support">Support</a></li></ul></div>
        
</body>`);
var body = dom.window.document.body;

console.log(textblock.getLinkLength(body));
console.log(textblock.getAllLength(body));
console.log(textblock.getUnrelatedLength(body));
