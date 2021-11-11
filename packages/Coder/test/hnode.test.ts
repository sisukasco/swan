import HNode from "../src/HNode";
import BaseNodeGen from "../src/BaseNodeGen";
import {NodeContext} from "../src/NodeContext"

test("HNODE1: simple test case", ()=>
{
    const context = new NodeContext()
    
    const nod = new HNode(context,"div",{class:['mt-2','p2']});
    
    nod.startTag('div').attribute("style", "width:160px");
    const nodegen = new BaseNodeGen(nod);
    const html = nodegen.code();

    //console.log("Generated html", html);
    expect(html).toEqual(`<div class="mt-2 p2"><div style="width:160px"></div></div>`);
})

test("HNODE2: class attribute handling", ()=>
{
    const context = new NodeContext()
    
    const nod = new HNode(context,"body");
    const divNode = nod.startTag('div')
    
    divNode.attribute("class", "classA");
    divNode.attribute("class", "classB");
    divNode.attribute("class", "classC");
    
    const nodegen = new BaseNodeGen(nod);
    const html = nodegen.code();

    //console.log("Generated html", html);
    expect(html).toEqual(`<body><div class="classA classB classC"></div></body>`)
    
})

test("HNODE3: attribute with quotes handling", ()=>
{
    const context = new NodeContext()
    
    const nod = new HNode(context,"body");
    const divNode = nod.startTag('div')
    
    divNode.attribute("value", "som\"e value");
    
    const nodegen = new BaseNodeGen(nod);
    const html = nodegen.code();

    //console.log("Generated html", html);
    expect(html).toEqual(`<body><div value="som&quot;e value"></div></body>`)
})

test("HNODE4: attribute with new line handling", ()=>
{
    const context = new NodeContext()
    
    const nod = new HNode(context,"body");
    const divNode = nod.startTag('div')
    
    const attr =`
    this is line one
    and this, line2`
    
    divNode.attribute("value", attr);
    
    const nodegen = new BaseNodeGen(nod);
    const html = nodegen.code();

    //console.log("Generated html", html);
    expect(html).toEqual(`<body><div value="
    this is line one
    and this, line2"></div></body>`)
})

test("HNODE5: add and remove attribute", ()=>
{
    const context = new NodeContext()
    
    const nod = new HNode(context,"body");
    const divNode = nod.startTag('div')
    
    divNode.attribute("value", "green");
    divNode.attribute("name", "blue");
    divNode.removeAttribute("name")
    
    const nodegen = new BaseNodeGen(nod);
    const html = nodegen.code();

    console.log("Generated html", html);
    expect(html).toEqual(`<body><div value="green"></div></body>`)
})

test("HNODE6: add supplementary script code", ()=>
{
    const context = new NodeContext()
    
    const nod = new HNode(context,"body");
    const input = nod.startTag('input')
    
    input.attribute("name", "blue");
    input.attribute("type", "text");
    input.attribute("id", "blue");
    
    input.script(`const ip = document.getElementById("blue"); ip.value = "green";`)
    
    context.supp_code.insertBodyCode(nod)
    
    const nodegen = new BaseNodeGen(nod);
    const html = nodegen.code();
    
    //console.log("Generated html", html);
    
    expect(html).toEqual(`<body><input name="blue" type="text" id="blue"/><script>const ip = document.getElementById("blue"); ip.value = "green";</script></body>`)
})

test("HNODE7: add supplementary style code", ()=>
{
    const context = new NodeContext()
    
    const rootNode = new HNode(context,"html");
    const htmlNode = rootNode.startTag("html")
    const headNode = htmlNode.startTag("head")
    const bodyNode = htmlNode.startTag("body")
    const input = bodyNode.startTag('input')
    
    input.attribute("name", "blue");
    input.attribute("type", "text");
    input.attribute("id", "blue");
    
    input.style(`input[type=text]{ color:blue; }`)
    context.supp_code.insertHeadCode(headNode)
    
    const nodegen = new BaseNodeGen(htmlNode);
    const html = nodegen.code();
    
    //console.log("Generated html", html);
    
    expect(html).toEqual(`<html><head><style>input[type=text]{ color:blue; }</style></head><body><input name="blue" type="text" id="blue"/></body></html>`)
})

test("HNODE8: add textcontent", ()=>
{
    const context = new NodeContext()
    
    const nod = new HNode(context,"body")
    const divNode = nod.startTag('div')
    
    divNode.attribute("value", "green")
    divNode.text("<h1>Now this is a heading</h1>")
    divNode.text("This is another line")
    
    const nodegen = new BaseNodeGen(nod)
    const html = nodegen.code()

    //console.log("Generated html", html)
    
    expect(html).toEqual(`<body><div value="green">&lt;h1&gt;Now this is a heading&lt;/h1&gt;This is another line</div></body>`)
})

test("HNODE9: add html content", ()=>
{
    const context = new NodeContext()
    
    const nod = new HNode(context,"body")
    const divNode = nod.startTag('div')
    
    divNode.attribute("value", "green")
    divNode.html("<h1>Now this is a heading</h1>")
    divNode.html("<br>This is another line")
    
    const nodegen = new BaseNodeGen(nod)
    const html = nodegen.code()

    //console.log("Generated html", html)
    
    expect(html).toEqual(`<body><div value="green"><h1>Now this is a heading</h1><br>This is another line</div></body>`)
})