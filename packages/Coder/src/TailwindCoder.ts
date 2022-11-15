import { NodeItem, Attributes } from "@sisukas/coder-interface";
import { CodingAssistant } from "./types";
import { NodeContext } from "./NodeContext"

export
    class TailwindCoder implements CodingAssistant {
    private context: NodeContext;

    constructor(context: NodeContext) {
        this.context = context;
    }
    nodec(tag: string, attribs: Attributes, attribs2: Attributes) {
        return this.context.builder.makeNodeItem(tag, attribs, attribs2);
    }
    make(section: string, attributes: Attributes): NodeItem | null {
        if (section == 'layout.container') {
            return this.nodec('div', { class: ['container mx-auto'] }, attributes);
        }
        if (section == 'layout.page') {
            return this.nodec('div', { class: ['page'] }, attributes);
        }
        else if (section == 'layout.row') {
            return this.nodec('div', { class: ['flex', 'mb-4','space-x-4'] }, attributes);
        }
        else if (section == 'layout.col') {
            //*layout.col is not required. Can be removed.
            return this.nodec('', {}, attributes);
        }
        else if (section == 'layout.page.top_section') {
            return this.nodec('div', { class: ['sfm-page-top'] }, attributes);
        }
        else if (section == 'layout.page.container') {
            return this.nodec('div', { class: ['sfm-pages'] }, attributes);
        }
        else if (section == 'layout.page') {
            return this.nodec('div', { class: ['sfm-page'] }, attributes);
        }
        else if (section == 'layout.page.bottom_section') {
            return this.nodec('div', { class: ['sfm-page-bottom'] }, attributes);
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
         
            return this.nodec('div', { class: ['text-xs','text-gray-500'] }, {});
        }
        else if (section == 'element.container') {
            let colx = ''
            if (attributes.width) {
                if (attributes.width <= 33) {
                    colx = 'w-1/3'
                }
                else if (attributes.width <= 66) {
                    colx = 'w-2/3'
                }
                else {
                    colx = 'w-full'
                }
                delete attributes.width
            }
            else {
                colx = 'w-auto';
            }

            const classes = []
            classes.push(colx);

            return this.nodec('div', { class: classes }, attributes);
        }
        else if (section == 'form.input.container') {
            let colx = ''
            if (attributes.width) {
                if (attributes.width <= 33) {
                    colx = 'w-1/3'
                }
                else if (attributes.width <= 66) {
                    colx = 'w-2/3'
                }
                else {
                    colx = 'w-full'
                }
                delete attributes.width
            }
            else {
                colx = 'w-auto';
            }
            const classes = []
            classes.push(colx);
            if (attributes.type && attributes.type == 'Checkbox') {
                classes.push('pt-5');
                delete attributes.type
            }

            if (attributes.type && attributes.type == 'SubmitButton') {
                classes.push('flex')

                if (attributes['alignment'] == 'left') {
                    classes.push('justify-start');
                }
                else if (attributes['alignment'] == 'right') {
                    classes.push('justify-end');
                }
                else if (attributes['alignment'] == 'center') {
                    classes.push('justify-center');
                }

                delete attributes['alignment']
            }

            //return this.nodec('div',{}, attributes);
            //return this.nodec('',{}, attributes);
            return this.nodec('div', { class: classes }, attributes);
        }
        else if (section == 'form.input.label') {
            return this.nodec('label', { class: ["block"] }, attributes);

        }
        else if (section == 'form.input.input') {
            return this.nodec('input', { class:["w-full"] }, attributes);

        }
        else if (section == 'form.input.select') {
            return this.nodec('select', { class:["w-full"] }, attributes);
        }
        else if (section == 'form.input.textarea') {
            return this.nodec('textarea', { class:["w-full"] }, attributes);
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
                    classes.push("flex", "flex-wrap")
                    
                }
                delete attributes.arrangement
            }
            return this.nodec('div', {class: classes}, attributes);
        }
        else if (section == 'form.group.label') {

            return this.nodec('label', {  }, attributes);
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

}
