'use strict';
import DFormElement from "./DFormElement";
import {NumberValidations} from "../containers";

import "reflect-metadata"; 
import {Type} from "@sisukas/base-runtime";
import {NodeItem} from "@sisukas/coder-interface";
import { ExcludeDefault } from '@sisukas/base-runtime';
import {InputAttributes } from "./attribs";

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

    public code(coder:NodeItem)
    {
        const container = coder.section('form.input.container');

        container.section('form.input.label', {'for':this.name}).html(this.label);
        const attrs:InputAttributes = {
            type:'number', 
            name:this.name,
            id:this.name
        }
        if(this.settings.placeholder){
            attrs['placeholder'] = this.settings.placeholder
        }

        container.section('form.input.input',attrs);
        container.section('form.input.error',{name:this.name});
    }
}
 
export default DNumber;