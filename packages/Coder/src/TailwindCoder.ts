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
        else if (section == 'heading.container') {
            const classes=[]
            if (attributes.alignment) {
                if (attributes.alignment == "center") {
                    classes.push("text-center")
                }
                else if (attributes.alignment == "right") {
                    classes.push("text-right")
                }
                delete attributes.alignment
            }
            classes.push(this.containerWidth(attributes));

            return this.nodec('div',{class: classes},attributes);
        }
        else if (section == 'heading') {
            let type = "h1"
            const classes=[]
            if(typeof(attributes["type"]) == "string"){
                type = attributes["type"]
                switch(type){
                    case 'h1':
                        classes.push("text-3xl")
                        break;
                    case 'h2':
                        classes.push("text-2xl")
                        break;
                    case 'h3':
                        classes.push("text-xl")
                        break;
                    case 'h4':
                        classes.push("text-lg")
                        break;                       
                }
            }
            delete attributes["type"]
            

            return this.nodec(type,{class: classes},attributes);
        }
        else if (section == 'heading.hint') {
         
            return this.nodec('div', { class: ['text-xs','text-gray-500'] }, {});
        }
        else if (section == 'label.container') {
            const classes=["flex", "items-center"]
            if (attributes.alignment) {
                if (attributes.alignment == "center") {
                    classes.push("justify-center")
                }
                else if (attributes.alignment == "right") {
                    classes.push("justify-end")
                }
                delete attributes.alignment
            }
            classes.push(this.containerWidth(attributes));

            return this.nodec('div',{class: classes},attributes);
        }    
        else if (section == 'label') {
            return this.nodec('label',{},attributes);
        }    
        else if (section == 'element.container') {

            const classes = []
            classes.push(this.containerWidth(attributes));

            return this.nodec('div', { class: classes }, attributes);
        }
        else if (section == 'form.input.container') {
            const classes = []
            classes.push(this.containerWidth(attributes));

            if (attributes.type) {
                if(attributes.type == 'Checkbox')
                {
                    classes.push('flex', 'items-center');
                } else if(attributes.type == 'SubmitButton')
                {
                    classes.push('flex')
                } 

                delete attributes.type
            }

            if (attributes.alignment) {

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
            let classes = ["block"]

            if (attributes['type']) {
                if (attributes['type'] == 'checkbox'){
                    classes = ['pl-1']
                }
                delete attributes['type'];
            }

            return this.nodec('label', { class: classes }, attributes);
        }
        else if (section == 'form.input.input') {
            if (attributes['type'] == 'checkbox' || attributes['type'] == 'radio') {

                return this.nodec('input', {  }, attributes);
            }
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


            if(attributes.arrangement)
            {
                if(attributes.arrangement == 'horizontal'){
                    classes.push("flex", "flex-wrap")
                    
                }else{
                    classes.push("space-y-1")
                }
                delete attributes.arrangement
            }
            return this.nodec('div', {class: classes}, attributes);
        }
        else if (section == 'form.group.label') {

            return this.nodec('label', {  }, attributes);
        }
        else if (section == 'form.group.item.container') {
            let classes:string[] = ["flex" ,"items-center"]
            if(attributes.arrangement)
            {
                if(attributes.arrangement == 'horizontal'){
                    classes.push("mr-3")
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
            let classes = ['px-6', 'py-2', 'rounded', 'shadow'];

            if (attribs['alignment']) {
                delete attribs['alignment'];
            }
            return this.nodec('button', { class: classes }, attribs);
        }


        return null;
    }

    containerWidth(attributes:Attributes){
        let colx = ''
        if (attributes.width) {
            if (attributes.width <= 25) {
                colx = 'w-1/4'
            }
            else if (attributes.width <= 50) {
                colx = 'w-1/2'
            }
            else if (attributes.width <= 75) {
                colx = 'w-3/4'
            }
            else {
                colx = 'w-full'
            }
            delete attributes.width
        }
        else {
            colx = 'w-auto';
        }
        return colx;
    }

}
