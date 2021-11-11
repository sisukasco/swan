import HNode from './HNode';
import {NodeItem, Attributes} from "@sisukas/coder-interface";
import {ICodingAssistant,INodeContext, 
    INodeBuilder, ICodingAssistantsHandler} from "./types";
import {merge} from "./utils";

export
class CodeFactory implements INodeBuilder, ICodingAssistantsHandler
{
    private context:INodeContext;
    private assistants:ICodingAssistant[]=[];
    constructor(context:INodeContext)
    {
        this.context = context;
    }
    makeSection(section:string, attributes:Attributes={}):NodeItem
    {
        let node = this.makeMainAssistant(section, attributes);
        
        if(null == node)
        {
            throw new Error(`section ${section} can't be handled`);
        }

        this.announce(section, node);
        return node;
    }
    
    register(assistant:ICodingAssistant)
    {
        this.assistants.push(assistant);
    }
    
    private makeMainAssistant(section:string, attributes:Attributes):NodeItem|null
    {
        for(let asst of this.assistants)
        {
            if(asst.make)
            {
                const node = asst.make(section, attributes);
                if(node)
                {
                    return node;
                }
            }
        }
        return null;
    }
    private announce(section:string, node:NodeItem):void
    {
        for(let asst of this.assistants)
        {
            if(asst.modify)
            {
                asst.modify(section, node);
            }
        }
    }
    makeNodeItem(tag:string,attributes:Attributes, addnl_attributes:Attributes):NodeItem
    {
        const node = new HNode(this.context,tag,merge(attributes, addnl_attributes));
        this.announce('tag', node);
        return node;
    }
    
}



