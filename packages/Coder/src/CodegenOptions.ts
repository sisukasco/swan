import {CodingAssistant, ICodegenOptions} from "./types"
import {BootstrapCoder} from "./BootstrapCoder"
import {NodeContext} from "./NodeContext"

export class CodegenOptions
{
    public assistants:CodingAssistant[]=[]
    public merge(opts:ICodegenOptions, context: NodeContext)
    {
        for(let opt in opts)
        {
            if(opt == "framework" && opts[opt] == "bootstrap")
            {
                this.assistants.push(new BootstrapCoder(context))
            }
            else if(opt == "assistants")
            {
                this.assistants.concat(opts[opt] || [])    
            }
        }
    }
}