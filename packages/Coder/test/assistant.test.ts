import HNode from "../src/HNode";
import BaseNodeGen from "../src/BaseNodeGen";
import {NodeContext} from "../src/NodeContext"
import { NodeItem} from "@sisukas/coder-interface";
import {BootstrapCoder} from "../src/BootstrapCoder"
import {ElementWithSections} from "./utils"

test("ASSIST1: test adding a class using coding assistant", ()=>
{
    const assist1 = {
        modify(__section:string,node:NodeItem)
        {
            if(node.tag_name == 'input')
            {
                node.attribute('class', 'two');
            }
        } 
    };
    
    const context = new NodeContext()
    context.builder.register(assist1)
    
    const node = new HNode(context,"div");
    
    node.startTag('div',{class:['one']}).startTag('input',{class:['one']});
    
    const nodegen = new BaseNodeGen(node);
    const html = nodegen.code();
    //console.log("Generated html", html);
    
    expect(html).toEqual(`<div><div class="one"><input class="one two"/></div></div>`)
    
})
test("ASSIST2: test BootstrapCoder", ()=>
{
    const context = new NodeContext()
    
    context.builder.register(new BootstrapCoder(context))
    
    const nod = new HNode(context,"div");
    
    const elmnt = new ElementWithSections()
    elmnt.code(nod)
    
    const nodegen = new BaseNodeGen(nod);
    const html = nodegen.code();
    console.log("Generated html", html);
    
    expect(html).toEqual(`<div><div><div class="container"><div class="row mb-3"><form action="#" method="post"><div class="col"><label>Name is</label></div><div class="col"><input type="text" name="name"/></div></form></div></div></div></div>`);
})