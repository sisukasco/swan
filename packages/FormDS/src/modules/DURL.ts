'use strict';
import DFormElement from "./DFormElement";
import {URLValidations} from "../containers"
import "reflect-metadata"; 
import {Type} from "@sisukas/base-runtime";
import {NodeItem} from "@sisukas/coder-interface";
import { ExcludeDefault } from '@sisukas/base-runtime';

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

    public code(coder:NodeItem)
    {
        const container = coder.section('form.input.container');

        container.section('form.input.label', {'for':this.name}).html(this.label);
        container.section('form.input.input',{type:'url', 
        placeholder:this.settings.placeholder, novalidate:"novalidate",
        name:this.name,
        id:this.name});
        container.section('form.input.error',{name:this.name});
    }
}
 
export default DURL;