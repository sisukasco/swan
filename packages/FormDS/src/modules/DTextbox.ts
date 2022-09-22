'use strict';

import "reflect-metadata"; 
import DFormElement from "./DFormElement";
import {TextboxValidations} from "../containers";
import {NodeItem} from "@sisukas/coder-interface";
import { ExcludeDefault } from '@sisukas/base-runtime';
import { Type } from "@sisukas/base-runtime";
import {InputAttributes } from "./attribs";


class TextboxSettings
{
    @ExcludeDefault('')
    public placeholder: string = '';
    
    @ExcludeDefault('')
    public default_value:string='';
}


class DTextbox extends DFormElement
{
    @Type(()=>TextboxSettings)
    public settings = new TextboxSettings();

    @Type(()=>TextboxValidations)
    public readonly validations = new TextboxValidations();

    constructor()
    {
        super('Textbox', 'Your Question Here:');
    }
    
    get default_value()
    {
        return this.settings.default_value
    }

    public code(coder:NodeItem)
    {
        const container = coder.section('form.input.container');

        container.section('form.input.label', {'for':this.name}).html(this.label);
        const attrs:InputAttributes = {
            type:'text', 
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
 
export default DTextbox;