'use strict';

import DFormElement from "./DFormElement";
import {MultilineValidations} from "../containers";
import { ExcludeDefault } from "../lib/TxUtils";
import "reflect-metadata"; 
import {Type} from "class-transformer";
import { NodeItem } from "@sisukas/coder-interface";
import {InputAttributes } from "./attribs";

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

    public code(node:NodeItem)
    {
        const container = node.section('form.input.container', {type: this.type, width: this.width});

        if(this.hasLabel()){
            container.section('form.input.label', {'for':this.name}).html(this.label);
        }

        const attrs:InputAttributes = {
            name:this.name,
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

        container.section('form.input.textarea',attrs);
        
        container.section('form.input.error',{name:this.name});
        
    }
}
