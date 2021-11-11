
import {generateCode} from "../src/Coder"
import { NodeItem } from "@sisukas/coder-interface";
import {ElementWithSections} from "./utils"
/*
spec:

generateCode(options, root:Codeable):GeneratedCode

pm = new PageMaker(content:Codeable)


generateCode(options, pm)

code.getHtml()

code.getCodeBlock("FormProc")
*/

test("CODER1: test simple element codegen", ()=>
{
    const elmnt = {
        code(node:NodeItem)
        {
            node.startTag("div")
            .attribute("title", "some title")
            .attribute("class", "classA")
            .attribute("class", "classB")
            .text("3 < 5")
        }
    };
    
    const gc = generateCode(elmnt, {})
    
    const html = gc.getHTMLCode(/** indent*/false)
    
    //console.log("Generated html", html);
    
    expect(html).toEqual(`<div title="some title" class="classA classB">3 &lt; 5</div>`)
})

test("CODER2: bootstrap code generation", ()=>
{
    const elmnt = new ElementWithSections()
    const gc = generateCode(elmnt, {framework:"bootstrap"})
    const html = gc.getHTMLCode(/** indent*/false)
    //console.log("Generated html", html);
    
    expect(html).toEqual(`<div><div class="container"><div class="row my-3"><form action="#" method="post"><div class="col"><label>Name is</label></div><div class="col"><input type="text" name="name" class="form-control"/></div></form></div></div></div>`)
})