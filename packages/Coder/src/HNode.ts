import {NodeItem, Attributes, ChildrenArray, 
    AttributeValue} from "@sisukas/coder-interface"

import {ScriptNode, PlainTextNode, HTMLTextNode} from "./InnerNodes"
import {INodeContext} from "./types"

export default
class HNode implements NodeItem
{
    public type='node' as const;
    public tag_name:string='';
    public attributes:Attributes={};
    public children:ChildrenArray=[];
    private context:INodeContext;

    constructor(context:INodeContext,tag_name:string,
            attributes:Attributes={},
            children:ChildrenArray=[])
    {
        this.context = context;
        this.tag_name = tag_name;
        this.attributes = attributes;
        this.children = children;
    }

    public startTag(tag_name:string,attributes:Attributes={})
    {
        const node = new HNode(this.context,tag_name,attributes);

        this.children.push(node);
        return node;
    }
    attribute(name:string, value:AttributeValue)
    {
        if(name=='class')
        {
            if(!this.attributes['class'])
            {
                this.attributes['class'] = [];
            }
            if(Array.isArray(this.attributes['class']) )
            {
                if(Array.isArray(value))
                {
                    this.attributes['class'].concat(value)
                }
                else if(typeof value == 'string')
                {
                    this.attributes['class'].push(value);
                }
            }
            return this;
        }
        
        this.attributes[name] = value;
        return this;
    }
    getAttribute(name:string):AttributeValue|null
    {
        if(this.attributes[name])
        {
            return this.attributes[name];
        }
        return null;
    }
    removeAttribute(name:string)
    {
        if(this.attributes[name])
        {
            delete this.attributes[name];
        }
    }
    popAttribute(name:string):AttributeValue|null
    {
        const attr = this.getAttribute(name);
        this.removeAttribute(name);
        return attr;
    }
    text(txt:string)
    {
        this.children.push(new PlainTextNode(txt));
        return this;
    }
    html(htm:string)
    {
        this.children.push(new HTMLTextNode(htm));
        return this;
    }
    inline_script(scpt: string)
    {
        this.children.push(new ScriptNode(scpt));
        return this;
    }
    inline_style(stle:string)
    {
        this.children.push(new ScriptNode(stle));
        return this; 
    }
    style(code:string)
    {
        this.context.supp_code.addStyle(code);
    }
    script(code:string)
    {
        this.context.supp_code.addScript(code);
    }
    addDependency(package_name:string, cdn_link:string, str_type:string):void
    {
        this.context.supp_code.addDependency(package_name, cdn_link, str_type);
    }
    createCodeBlock(name:string,code:string )
    {
        this.context.supp_code.createCodeBlock(name,code);
    }
}
