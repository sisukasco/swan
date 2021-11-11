import {htmlEntities, filterHTML} from "./xss-safety";
import {TextNode} from "@sisukas/coder-interface";

export 
class ScriptNode implements TextNode
{
    public type='text' as const;
    public script_text='';

    constructor(script:string)
    {
        this.script_text = script;
    }
    public getHTMLCode()
    {
        return this.script_text;
    }
}
export
class PlainTextNode implements TextNode
{
    public type='text' as const;
    
    constructor(private text:string)
    {
    }
    public getHTMLCode()
    {
        return htmlEntities(this.text);
    }
}

export
class HTMLTextNode implements TextNode
{
    public type='text' as const;
    constructor(private html:string)
    {
    }
    public getHTMLCode()
    {
        return filterHTML(this.html);
    }

}