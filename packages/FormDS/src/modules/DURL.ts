'use strict';
import DFormElement from "./DFormElement";
import {URLValidations} from "../containers"
import "reflect-metadata"; 
import {Type} from "class-transformer";
import { NodeItem, Attributes } from "@sisukas/coder-interface";
import { ExcludeDefault } from "../lib/TxUtils";
import { Sidekick } from '../coder/Sidekick';

class DURLSettings
{
    @ExcludeDefault('')
    public placeholder:string='';
}
class DURL extends DFormElement
{
    public settings = new DURLSettings();

    @Type(() => URLValidations) 
    public validations = new URLValidations();

    constructor()
    {
        super('URL','URL:');
        this.validations.content_type.type='url';
    }
    public get default_value()
    {
        return '';
    }

    public code(coder:NodeItem, sidekick: Sidekick)
    {
        const container = coder.startTag('div', {class: sidekick.css.inputContainerClasses(this.width)})

        if(this.hasLabel()){
            container
              .startTag('label', { for: this.name, class: sidekick.css.labelClasses() })
              .html(this.label);
        }
        
        const attrs:Attributes ={
            type:'url', 
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
 
export default DURL;