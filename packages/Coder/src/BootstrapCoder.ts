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
            return this.nodec('div',{class:['row','mb-3']}, attributes);
        }
        else if(section == 'layout.col')
        {
            //*layout.col is not required. Can be removed.
            return this.nodec('',{}, attributes);
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
            let colx=''
            if(attributes.width)
            {
                if(attributes.width <= 33)
                {   
                    colx ='col-md-4'
                }
                else if(attributes.width <= 66)
                {
                    colx ='col-md-8'
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
            const classes=[]
            classes.push(colx);
            if(attributes.type && attributes.type == 'Checkbox')
            {
                classes.push('pt-5');
                delete attributes.type
            }
            //return this.nodec('div',{}, attributes);
            //return this.nodec('',{}, attributes);
            return this.nodec('div',{class:classes}, attributes);
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
                return this.nodec('label',{class:["form-label"]}, attributes);
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
            return this.nodec('select',{class:['form-select']}, attributes);
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
        }/*
        Error area is not added for the time being. Later may be there can be an option to enable */
        else if(section == 'form.input.error')
        {
            //return this.nodec('div',{class:['text-danger']},attributes);

            return this.nodec('',{},attributes);
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
    /*modify(section:string,node:NodeItem)
    {
        if(section == 'tag' && 
            node.tag_name =='input')
        {
            node.attribute('class', 'form-control');
        }
    }*/
    
}
