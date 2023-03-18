'use strict';
import DFormElement from "./DFormElement";
import {PhoneValidations} from "../containers"
import "reflect-metadata"; 
import {Type} from "class-transformer";
import {NodeItem} from "@sisukas/coder-interface";
import { ExcludeDefault } from "../lib/TxUtils";
import {InputAttributes } from "./attribs";

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

    public code(coder:NodeItem)
    {
        const container = coder.section('form.input.container');

        if(this.hasLabel()){
            container.section('form.input.label', {'for':this.name}).html(this.label);
        }
        
        const attrs:InputAttributes ={
            type:'tel', 
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

        container.section('form.input.input',attrs);

        

        container.section('form.input.error',{name:this.name});
    }
}
 
export default DPhone;