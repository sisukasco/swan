import BaseNodeGen from "./BaseNodeGen";
import {NodeItem} from "@sisukas/coder-interface";

export default
class SpacedNodeGen extends BaseNodeGen
{
    private code_was_intended=false;

    constructor( node:NodeItem)
    {
        super(node);
    }
    public start_tag():string
    {
        return "\n"+super.start_tag();
    }
    public inner_html():string
    {
        const orig_code = super.inner_html();
        let code = orig_code.split("\n");
        if(code.length > 1)
        {
            this.code_was_intended = true;
            code = code.map((ln)=>("  "+ln));
            return code.join("\n");
        }
        else
        {
            this.code_was_intended = false;
           return orig_code; 
        }
    }
    public end_tag():string
    {
        if(this.code_was_intended)
        {
            return "\n"+super.end_tag();
        }
        else
        {
            return super.end_tag();
        }
        
    }
    protected makeChildNodeGen(child:NodeItem)
    {
        return new SpacedNodeGen(child);
    }
}