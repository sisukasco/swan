import {CodingAssistant, ICodegenOptions} from "./types"
import {BootstrapCoder} from "./BootstrapCoder"
import {NodeContext} from "./NodeContext"
import {NoFrameworkCoder} from "./NoFrameworkCoder"
import { TailwindCoder } from "./TailwindCoder"

export class CodegenOptions
{
    public assistants:CodingAssistant[]=[]
    public merge(opts:ICodegenOptions, context: NodeContext)
    {
        for(let opt in opts)
        {
            if(opt == "framework" )
            {
                if(opts[opt] == "bootstrap"){
                    this.assistants.push(new BootstrapCoder(context))
                }else if(opts[opt] == "tailwind"){
                    this.assistants.push(new TailwindCoder(context))
                }else{
                    this.assistants.push(new NoFrameworkCoder(context))
                }
                
            }
            else if(opt == "assistants")
            {
                this.assistants.concat(opts[opt] || [])    
            }
        }
    }
}