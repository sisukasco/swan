'use strict';
import DFormElement from "./DFormElement";
import {CheckboxValidations} from "../containers";
import "reflect-metadata"; 
import {Type} from "@sisukas/base-runtime";
import { NodeItem } from "@sisukas/coder-interface";
import { ExcludeDefault } from '@sisukas/base-runtime';

class CheckboxSettings
{
    @ExcludeDefault('on')
    public value:string='on';
}
export default
class DCheckbox extends DFormElement
{
    @Type(() => CheckboxSettings)
    public settings= new CheckboxSettings();
    
    @Type(() => CheckboxValidations) 
    public readonly validations = new CheckboxValidations();

    constructor()
    {
        super('Checkbox','Enable this item?');
    }
    get default_value()
    {
        return null;
    }

    public code(node:NodeItem)
    {
        const container = node.section('form.input.container', {type: this.type, width: this.width});

        container.section('form.input.input', {type:"checkbox", name:this.name, id:this.name});

        container.section('form.input.label', 
        {type:"checkbox","for":this.name} )
        .html(this.label);
        container.section('form.input.error',{name:this.name});
        
    }
    public getConverterCode()
    {
        return(".defaultTo(false)");
    }

    
}