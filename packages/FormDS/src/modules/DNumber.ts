'use strict';
import DFormElement from "./DFormElement";
import {NumberValidations} from "../containers";

import "reflect-metadata"; 
import {Type} from "class-transformer";
import {NodeItem, Attributes} from "@sisukas/coder-interface";
import { ExcludeDefault } from "../lib/TxUtils";
import { Sidekick } from '../coder/Sidekick';

class NumberSettings
{
    
    @ExcludeDefault('')
    public placeholder:string='';
    
    @ExcludeDefault('')
    public default_value:string='';
    
    @ExcludeDefault(true)
    public show_spinner:boolean= true;
    
    @ExcludeDefault(true)
    public right_align:boolean = true;
}
class DNumber extends DFormElement
{
    
    @Type(() => NumberSettings) 
    public settings:NumberSettings= new NumberSettings();
    
    constructor()
    {
        super('Number', 'Edit this Label:');
    }
    
    @Type(() => NumberValidations) 
    public readonly validations:NumberValidations=new NumberValidations(); 
 

    get default_value():any
    {
        if(this.settings.default_value == '')
        {
            return '';
        }
        
        return Number(this.settings.default_value);
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
            type:'number', 
            class: sidekick.css.inputClasses(),
            name:this.name,
            id:this.name,
        }
        if(this.settings.placeholder){
            attrs['placeholder'] = this.settings.placeholder
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
 
export default DNumber;