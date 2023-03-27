'use strict';
import DFormElement from "./DFormElement";
import {RangeValidations} from "../containers"
import "reflect-metadata"; 
import {Type} from "class-transformer";
import {NodeItem, Attributes} from "@sisukas/coder-interface";
import { ExcludeDefault } from "../lib/TxUtils";
import { Sidekick } from '../coder/Sidekick';

class NumberSettings
{
    
    @ExcludeDefault(0)
    public default_value:number=0;
}

class DRange extends DFormElement
{
   
    @Type(() => NumberSettings) 
    public settings:NumberSettings= new NumberSettings();
    
    @Type(() => RangeValidations) 
    public validations = new RangeValidations();

    constructor()
    {
        super('Range','Range:');
        this.validations.content_type.type='number';
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

        const attrs:Attributes = {
            type:'range', 
            class: sidekick.css.inputClasses(),
            name:this.name,
            id:this.name,
        }
        
        if(this.default_value){
            attrs['value'] = this.default_value
        }

        if(this.validations.required.enabled){
            attrs['required'] = 'required'
        }
        if(this.validations.min.num != null){
            attrs['min'] = String(this.validations.min.num)
        }
        if(this.validations.max.num != null){
            attrs['max'] = String(this.validations.max.num)
        }

        container.startTag('input',attrs)     
    }
}
 
export default DRange;