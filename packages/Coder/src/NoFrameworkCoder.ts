import { NodeItem, Attributes } from "@sisukas/coder-interface";
import { CodingAssistant } from "./types";
import { NodeContext } from "./NodeContext"

export
    class NoFrameworkCoder implements CodingAssistant {
    private context: NodeContext;

    constructor(context: NodeContext) {
        this.context = context;
    }
    nodec(tag: string, attribs: Attributes, attribs2: Attributes) {
        return this.context.builder.makeNodeItem(tag, attribs, attribs2);
    }
    make(section: string, attributes: Attributes): NodeItem | null {
        if (section == 'layout.container') {
            return this.nodec('div', { class: ['container'] }, attributes);
        }
        if (section == 'layout.page') {
            return this.nodec('div', { class: ['page'] }, attributes);
        }
        else if (section == 'layout.row') {
            return this.nodec('div', { style:"display: flex; margin-bottom: 4rem;" }, attributes);
        }
        else if (section == 'layout.col') {
            //*layout.col is not required. Can be removed.
            return this.nodec('', {}, attributes);
        }
        else if (section == 'heading') {
            let type = "h1"
            if(typeof(attributes["type"]) == "string"){
                type = attributes["type"]
            }
            delete attributes["type"]

            return this.nodec(type,{},attributes);
        }
        else if (section == 'heading.hint') {
         
            return this.nodec('div', { style:"font-size: 2rem;" }, {});
        }
        else if (section == 'element.container') {
            let width = 100
            if (attributes.width) {
                width =  attributes.width as number
                delete attributes.width
            }

            return this.nodec('div', { style: `width:${width}%;` }, attributes);
        }
        else if (section == 'form.input.container') {
            let width = 100
            if (attributes.width) {
                width =  attributes.width as number
                delete attributes.width
            }
            if (attributes.type && attributes.type == 'Checkbox') {
                delete attributes.type
            }

            if (attributes.type && attributes.type == 'SubmitButton') {
                

                if (attributes['alignment'] == 'left') {
                }
                else if (attributes['alignment'] == 'right') {
                }
                else if (attributes['alignment'] == 'center') {
                }

                delete attributes['alignment']
            }

            //return this.nodec('div',{}, attributes);
            //return this.nodec('',{}, attributes);
            return this.nodec('div', { style: `width:${width}%;`  }, attributes);
        }
        else if (section == 'form.input.label') {
            if (attributes['type'] == 'checkbox') {
                delete attributes['type'];
                return this.nodec('label', { }, attributes);
            }
            else {
                return this.nodec('label', { style:"display:block" }, attributes);
            }

        }
        else if (section == 'form.input.input') {
            if (attributes['type'] == 'checkbox' || attributes['type'] == 'radio') {
                return this.nodec('input', {  }, attributes);
            }
            else {
                return this.nodec('input', {  }, attributes);
            }

        }
        else if (section == 'form.input.select') {
            return this.nodec('select', { class: ['form-select'] }, attributes);
        }
        else if (section == 'form.input.textarea') {
            return this.nodec('textarea', { class: ['form-control'] }, attributes);
        }
        else if (section == 'form.group.container') {
            //.startTag({class:['form-group']}, attributes)
            let classes=[]

           /* let colx = ''
            if (attributes.width) {
                if (attributes.width <= 33) {
                    colx = 'col-md-4'
                }
                else if (attributes.width <= 66) {
                    colx = 'col-md-8'
                }
                else {
                    colx = 'col-12'
                }
                delete attributes.width
            }
            else {
                colx = 'col';
            }
            classes.push(colx);    */        

            if(attributes.arrangement)
            {
                if(attributes.arrangement == 'horizontal'){
                    classes.push("d-flex", "flex-wrap")
                    
                }
                delete attributes.arrangement
            }
            return this.nodec('div', {class: classes}, attributes);
        }
        else if (section == 'form.group.label') {

            return this.nodec('label', { class: ['form-check-label']  }, attributes);
        }
        else if (section == 'form.group.item.container') {
            let classes = ["form-check"]
            if(attributes.arrangement)
            {
                if(attributes.arrangement == 'horizontal'){
                    classes.push("form-check-inline","me-3")
                }
                delete attributes.arrangement
            }            
            return this.nodec('div', { class: classes  }, attributes);
        }
        else if (section == 'button.container') {
            return this.nodec('div', { }, attributes);
        }/*
        Error area is not added for the time being. Later may be there can be an option to enable */
        else if (section == 'form.input.error') {
            //return this.nodec('div',{class:['text-danger']},attributes);

            return this.nodec('', {}, attributes);
        }
        else if (section == 'button.button') {
            let attribs = { ...attributes }
            let classes = ['btn', 'btn-lg', 'px-4'];

            if (attribs['alignment']) {
                delete attribs['alignment'];
            }
            return this.nodec('button', { class: classes }, attribs);
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
