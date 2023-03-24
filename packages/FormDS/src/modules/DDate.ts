'use strict';
import DFormElement from "./DFormElement";
import {DateValidations} from "../containers"
import "reflect-metadata"; 
import {Type} from "class-transformer";
import {NodeItem, Attributes} from "@sisukas/coder-interface";
import { Sidekick } from '../coder/Sidekick';


class DDate extends DFormElement
{

    @Type(() => DateValidations) 
    public validations = new DateValidations();

    constructor()
    {
        super('Date','Date:');
        this.validations.content_type.type='date';
    }
    public get default_value()
    {
        return '';
    }

    public code(coder:NodeItem, sidekick: Sidekick )
    {
        const container = coder.startTag('div', {class: sidekick.css.inputContainerClasses(this.width)})
        if(this.hasLabel()){
            container
              .startTag('label', { for: this.name, class: sidekick.css.labelClasses() })
              .html(this.label);
        }

        // const container = coder.section('form.input.container', { width: this.width});

        /*
        if(this.hasLabel()){
            container.section('form.input.label', {'for':this.name}).html(this.label);
        }
        */
        const attrs:Attributes = {
            type:'date', 
            class: sidekick.css.inputClasses(),
            name:this.name,
            id:this.name
        }
        
        if(this.validations.required.enabled){
            attrs['required'] = 'required'
        }
        if(this.validations.max_date.is_enabled()){
            attrs['max'] = String(this.validations.max_date)
        }
        if(this.validations.min_date.is_enabled()){
            attrs['min'] = String(this.validations.min_date)
        }

        container.startTag('input',attrs)

        //container.section('form.input.input',attrs);

        //container.section('form.input.error',{name:this.name});

    }
}
 
export default DDate;