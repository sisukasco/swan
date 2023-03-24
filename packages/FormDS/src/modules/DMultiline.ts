'use strict';

import DFormElement from "./DFormElement";
import {MultilineValidations} from "../containers";
import { ExcludeDefault } from "../lib/TxUtils";
import "reflect-metadata"; 
import {Type} from "class-transformer";
import { NodeItem, Attributes } from "@sisukas/coder-interface";
import { Sidekick } from '../coder/Sidekick';

class MultilineSettings
{
    @ExcludeDefault('')
    public placeholder:string='';
    
    @ExcludeDefault('')
    public default_value:string='';
    
    @ExcludeDefault(6)
    public num_rows:number=6;
}

export default class DMultiline extends DFormElement
{
    @Type(() => MultilineSettings)
    public settings= new MultilineSettings();

    @Type(() => MultilineValidations) 
    public readonly validations = new MultilineValidations();

    constructor()
    {
        super('Multiline', 'Your Question Here:');
    }
    get default_value()
    {
        return this.settings.default_value;
    }

    public code(coder:NodeItem, sidekick: Sidekick)
    {
        const container = coder.startTag('div', {class: sidekick.css.inputContainerClasses(this.width)})
        //const container = node.section('form.input.container', {type: this.type, width: this.width});

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

        const attrs:Attributes = {
            name:this.name,
            class: sidekick.css.inputClasses(),
            id:this.name,
            rows: String(this.settings.num_rows)
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

        container.startTag('textarea',attrs)
        
    }
}
