
import {htmlEntities} from "./xss-safety";
import single_tags from "./single-tags.json";
import toInlineStyle from "@f/to-inline-style";
import {NodeItem} from "@sisukas/coder-interface";


export default 
class BaseNodeGen
{
    constructor(protected node:NodeItem)
    {
    }
    public code()
    {
        if(single_tags.indexOf(this.node.tag_name)>=0)
        {
            return(this.start_tag()+
            this.attributes()+ '/>');
        } 
        if(!this.node.tag_name)
        {
            return this.inner_html();
        }
        return(this.start_tag()+
        this.attributes()+ '>'+
        this.inner_html()+
        this.end_tag())

    }
    public start_tag():string
    {
        if(!this.node.tag_name) return '';
        return('<'+this.node.tag_name);
    }

    public attributes():string
    {
        let code ='';
        if(!this.node.attributes)
        {
            return('')
        }
        for(let name in this.node.attributes)
        {
            let value = this.node.attributes[name];
            let actual:any = '';
            if(name == 'class' && Array.isArray(value))
            {
                if(value.length <= 0){
                    continue; //skip if class array is empty
                }
                actual = value.join(' ');
            }
            else if(name=='style' && typeof value === 'object' && value !== null)
            {
                actual = toInlineStyle(value);
                //actual = actual.split(';').join('; ')
            }
            else
            {
                actual = String(value);
            }

            /*
            Empty value is possible for example, first item of dropdown. can be 0 or false also
            
            if(!actual)
            {
                continue;//skip if empty value. checked attribute do checked="checked"
            }*/

            actual=htmlEntities(actual);

            code += ` ${name}="${actual}"`
        }

        return code;
    }

    public inner_html():string
    {
        if(!this.node.children)
        {
            return('');
        }
        let ret_html='';
        for(let child of this.node.children)
        {
            if(child.type && child.type == 'text')
            {
                ret_html += child.getHTMLCode();
            }
            else
            {
                const node_gen = this.makeChildNodeGen(child);
                ret_html+= node_gen.code();
            }
        }
        return ret_html;
    }
    protected makeChildNodeGen(child:NodeItem)
    {
        return new BaseNodeGen(child);
    }
    public end_tag()
    {
        return('</'+this.node.tag_name+'>');
    }
}