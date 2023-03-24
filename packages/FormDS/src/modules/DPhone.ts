'use strict';
import DFormElement from "./DFormElement";
import {PhoneValidations} from "../containers"
import "reflect-metadata"; 
import {Type} from "class-transformer";
import {NodeItem, Attributes} from "@sisukas/coder-interface";
import { ExcludeDefault } from "../lib/TxUtils";
import { Sidekick } from '../coder/Sidekick';

class DPhoneSettings
{
    @ExcludeDefault('')
    public placeholder:string='';
}
class DPhone extends DFormElement
{
    public settings = new DPhoneSettings();

    @Type(() => PhoneValidations) 
    public validations = new PhoneValidations();

    constructor()
    {
        super('Phone','Phone:');
        this.validations.content_type.type='phone';
    }
    public get default_value()
    {
        return '';
    }

    public code(coder:NodeItem, sidekick: Sidekick)
    {
        const container = coder.startTag('div', {class: sidekick.css.inputContainerClasses(this.width)})

        //const container = coder.section('form.input.container');

        if(this.hasLabel()){
            container
              .startTag('label', { for: this.name, class: sidekick.css.labelClasses() })
              .html(this.label);
        }
        /*
        if(this.hasLabel()){
            container.section('form.input.label', {'for':this.name}).html(this.label);
        }
        */
        
        const attrs:Attributes ={
            type:'tel', 
            class: sidekick.css.inputClasses(),
            name:this.name,
            id:this.name
        }

        if(this.settings.placeholder){
            attrs['placeholder'] = this.settings.placeholder
        }

        if(this.validations.required.enabled){
            attrs['required'] = 'required'
        }
        if(this.validations.maxlength.size != null){
            attrs['maxlength'] = String(this.validations.maxlength.size)
        }
        if(this.validations.minlength.size != null){
            attrs['minlength'] = String(this.validations.minlength.size)
        }

        container.startTag('input',attrs)
    }
}
 
export default DPhone;