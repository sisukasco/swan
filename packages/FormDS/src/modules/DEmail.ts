'use strict';
import DFormElement from "./DFormElement";
import {EmailValidations} from "../containers"
import "reflect-metadata"; 
import {Type} from "@sisukas/base-runtime";
import {NodeItem} from "@sisukas/coder-interface";
import { ExcludeDefault } from '@sisukas/base-runtime';
import {InputAttributes } from "./attribs";

class DEmailSettings
{
    @ExcludeDefault('')
    public placeholder:string='';
}
class DEmail extends DFormElement
{
    public settings = new DEmailSettings();

    @Type(() => EmailValidations) 
    public validations = new EmailValidations();

    constructor()
    {
        super('Email','Email:');
        this.validations.content_type.type='email';
    }
    public get default_value()
    {
        return '';
    }

    public code(coder:NodeItem)
    {
        const container = coder.section('form.input.container', { width: this.width});

        container.section('form.input.label', {'for':this.name}).html(this.label);

        const attrs:InputAttributes = {
            type:'email', 
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
 
export default DEmail;