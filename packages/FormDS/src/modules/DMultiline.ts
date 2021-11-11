'use strict';

import DFormElement from "./DFormElement";
import {MultilineValidations} from "../containers";
import { ExcludeDefault } from '@sisukas/base-runtime';
import "reflect-metadata"; 
import {Type} from "@sisukas/base-runtime";
import { NodeItem } from "@sisukas/coder-interface";

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
        const container = node.section('form.input.container');

        container.section('form.input.label', {'for':this.name}).html(this.label);
        container.section('form.input.textarea',{placeholder:this.settings.placeholder,
                                                name:this.name,
                                                id:this.name,
                                                rows:6});
        container.section('form.input.error',{name:this.name});
        
    }
}
