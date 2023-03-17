'use strict';
import DFormElement from "./DFormElement";
import {RangeValidations} from "../containers"
import "reflect-metadata"; 
import {Type} from "class-transformer";
import {NodeItem} from "@sisukas/coder-interface";
import { ExcludeDefault } from "../lib/TxUtils";
import {InputAttributes } from "./attribs";

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

    public code(coder:NodeItem)
    {
        const container = coder.section('form.input.container', { width: this.width});

        if(this.hasLabel()){
            container.section('form.input.label', {'for':this.name}).html(this.label);
        }
        const attrs:InputAttributes = {
            type:'range', 
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

        container.section('form.input.input',attrs);
        container.section('form.input.error',{name:this.name});        
    }
}
 
export default DRange;