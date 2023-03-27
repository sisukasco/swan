import {IGeneratedCode } from "./types"
import {Codeable} from "@sisukas/coder-interface"
import HNode from "./HNode"
import {NodeContext} from "./NodeContext"
import GeneratedCode from "./GeneratedCode"
//import {CodegenOptions} from "./CodegenOptions"



export function generateCode(content:Codeable):IGeneratedCode
{
    const context = new NodeContext()
   /* const opts = new CodegenOptions()
    opts.merge(options, context)
    
    for(let a of opts.assistants)
    {
        context.builder.register(a)
    }*/
    
    const nod = new HNode(context,"");
    
    content.code(nod)
    
    const code = new GeneratedCode(nod, context.supp_code)
    return code;
}