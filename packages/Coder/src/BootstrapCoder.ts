import { NodeItem, Attributes } from "@sisukas/coder-interface";
import { CodingAssistant } from "./types";
import { NodeContext } from "./NodeContext"

export
    class BootstrapCoder implements CodingAssistant {
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
            return this.nodec('div', { class: ['row', 'mb-3'] }, attributes);
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
                    classes.push("text-end")
                }
                delete attributes.alignment
            }
            classes.push(this.containerWidth(attributes));

            return this.nodec('div',{class: classes},attributes);
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
         
            return this.nodec('div', { class: ['fs-6','fw-light'] }, {});
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
                    classes.push('pt-5');
                } else if(attributes.type == 'SubmitButton')
                {
                    classes.push('d-flex')
                } 

                delete attributes.type
            }

            if (attributes.alignment) {

                if (attributes['alignment'] == 'left') {
                    classes.push('justify-content-start');
                }
                else if (attributes['alignment'] == 'right') {
                    classes.push('justify-content-end');
                }
                else if (attributes['alignment'] == 'center') {
                    classes.push('justify-content-center');
                }

                delete attributes['alignment']
            }

            //return this.nodec('div',{}, attributes);
            //return this.nodec('',{}, attributes);
            return this.nodec('div', { class: classes }, attributes);
        }
        else if (section == 'form.input.label') {
            if (attributes['type'] == 'checkbox') {
                delete attributes['type'];
                return this.nodec('label', { class: ["form-check-label"] }, attributes);
            }
            else {
                return this.nodec('label', { class: ["form-label"] }, attributes);
            }

        }
        else if (section == 'form.input.input') {
            if (attributes['type'] == 'checkbox' || attributes['type'] == 'radio') {
                return this.nodec('input', { class: ["form-check-input"] }, attributes);
            }
            else {
                return this.nodec('input', { class: ['form-control'] }, attributes);
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

    containerWidth(attributes:Attributes){
        let colx = ''
        if (attributes.width) {
            if (attributes.width <= 25) {
                colx = 'col-md-3'
            }
            else if (attributes.width <= 50) {
                colx = 'col-md-6'
            }
            else if (attributes.width <= 75) {
                colx = 'col-md-9'
            }
            else {
                colx = 'col-12'
            }
            delete attributes.width
        }
        else {
            colx = 'col';
        }
        return colx;
    }    

}
