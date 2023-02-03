'use strict';
import DFormElement from "./DFormElement";
import {RangeValidations} from "../containers"
import "reflect-metadata"; 
import {Type} from "class-transformer";
import {NodeItem} from "@sisukas/coder-interface";


class DRange extends DFormElement
{
   
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
        const container = coder.section('form.input.container');

        container.section('form.input.label', {'for':this.name}).html(this.label);
        container.section('form.input.input',{type:'range', 
        novalidate:"novalidate",
        name:this.name,
        id:this.name});
        container.section('form.input.error',{name:this.name});
    }
}
 
export default DRange;