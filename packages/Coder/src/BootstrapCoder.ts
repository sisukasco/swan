import {NodeItem, Attributes} from "@sisukas/coder-interface";
import {CodingAssistant} from "./types";
import {NodeContext} from "./NodeContext"

export
class BootstrapCoder implements CodingAssistant
{
    private context:NodeContext;

    constructor(context:NodeContext)
    {
        this.context =context;
    }
    nodec(tag:string,attribs:Attributes,attribs2:Attributes)
    {
        return this.context.builder.makeNodeItem(tag,attribs, attribs2 );
    }
    make(section:string,attributes:Attributes):NodeItem|null
    {
        if(section == 'layout.container')
        {
            return this.nodec('div',{class:['container']}, attributes);
        }
        if(section == 'layout.page')
        {
            return this.nodec('div',{class:['page']}, attributes);
        }
        else if(section == 'layout.row')
        {
            return this.nodec('div',{class:['row','my-3']}, attributes);
        }
        else if(section == 'layout.col')
        {
            let colx=''
            if(attributes.width)
            {
                if(attributes.width <= 33)
                {   
                    colx ='col-4'
                }
                else if(attributes.width <= 66)
                {
                    colx ='col-8'
                }
                else
                {
                    colx='col-12'
                }
                delete attributes.width
            }
            else
            {
                colx = 'col';
            }
            
            return this.nodec('div',{class:[colx]}, attributes);
        }
        else if(section == 'layout.page.top_section')
        {
            return this.nodec('div',{class:['sfm-page-top']}, attributes);
        }
        else if(section == 'layout.page.container')
        {
            return this.nodec('div',{class:['sfm-pages']}, attributes);
        }
        else if(section == 'layout.page')
        {
            return this.nodec('div',{class:['sfm-page']}, attributes);
        }
        else if(section == 'layout.page.bottom_section')
        {
            return this.nodec('div',{class:['sfm-page-bottom']}, attributes);
        }

        else if(section == 'form.input.container')
        {
            return this.nodec('div',{class:['form-group']}, attributes);
        }
        else if(section == 'form.input.label')
        {
            if(attributes['type'] == 'checkbox')
            {
                delete attributes['type'];
                return this.nodec('label',{class:["form-check-label"]}, attributes);
            }
            else
            {
                return this.nodec('label',{}, attributes);
            }
            
        }
        else if(section == 'form.input.input')
        {
            if(attributes['type'] == 'checkbox' || attributes['type'] == 'radio')
            {
                return this.nodec('input',{class:["form-check-input"]}, attributes);
            }
            else
            {
                return this.nodec('input',{class:['form-control']}, attributes);
            }

        }
        else if(section == 'form.input.select')
        {
            return this.nodec('select',{class:['form-control']}, attributes);
        }
        else if(section == 'form.input.textarea')
        {
            return this.nodec('textarea',{class:['form-control']}, attributes);
        }
        else if(section == 'form.group.container')
        {
            //.startTag({class:['form-group']}, attributes)
            return this.nodec('div',{},attributes);
        }
        else if(section == 'form.group.label')
        {
            return this.nodec('label',{class:['form-check-label', 'sim-group-label']},attributes);
        }
        else if(section == 'form.group.item.container')
        {
            return this.nodec('div',{class:["form-check", "sim-group-item"]},attributes);
        }
        else if(section == 'button.container')
        {
            let attribs = {...attributes}
            let attrs={};

            if(attribs['alignment'] == 'center')
            {
                attrs= {'class':['text-center']};
            }
            delete attribs['alignment']
            return this.nodec('div',attrs,attribs);
        }
        else if(section == 'form.input.error')
        {
            return this.nodec('div',{class:['text-danger']},attributes);
        }
        else if(section == 'button.button')
        {
            let attribs = {...attributes}
            let classes = ['btn','btn-primary'];

            if(attribs['alignment'])
            {
                if(attribs['alignment'] == 'left')
                {
                    classes.push('float-left');
                }
                else if(attribs['alignment'] == 'right')
                {
                    classes.push('float-right');
                }

                delete attribs['alignment'];
            }

            if(attribs['size'])
            {
                let size_class = 'btn-'+attribs['size'];
                classes.push(size_class);
                delete attribs['size'];
            }

            return this.nodec('button',{class:classes},attribs);
        }

        
        return null;
    }
    modify(section:string,node:NodeItem)
    {
        if(section == 'tag' && 
            node.tag_name =='input')
        {
            node.attribute('class', 'form-control');
        }
    }
    
}
