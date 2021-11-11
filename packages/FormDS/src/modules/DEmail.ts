'use strict';
import DFormElement from "./DFormElement";
import {EmailValidations} from "../containers"
import "reflect-metadata"; 
import {Type} from "@sisukas/base-runtime";
import {NodeItem} from "@sisukas/coder-interface";
import { ExcludeDefault } from '@sisukas/base-runtime';

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
        const container = coder.section('form.input.container');

        container.section('form.input.label', {'for':this.name}).html(this.label);
        container.section('form.input.input',{type:'email', 
        placeholder:this.settings.placeholder, novalidate:"novalidate",
        name:this.name,
        id:this.name});
        container.section('form.input.error',{name:this.name});
    }
}
 
export default DEmail;