'use strict';
import DFormElement from "./DFormElement";
import {DateValidations} from "../containers"
import "reflect-metadata"; 
import {Type} from "@sisukas/base-runtime";
import {NodeItem} from "@sisukas/coder-interface";


class DDate extends DFormElement
{

    @Type(() => DateValidations) 
    public validations = new DateValidations();

    constructor()
    {
        super('Date','Date:');
        this.validations.content_type.type='date';
    }
    public get default_value()
    {
        return '';
    }

    public code(coder:NodeItem)
    {
        const container = coder.section('form.input.container');

        container.section('form.input.label', {'for':this.name}).html(this.label);
        container.section('form.input.input',{type:'date', 
        novalidate:"novalidate",
        name:this.name,
        id:this.name});
        container.section('form.input.error',{name:this.name});
    }
}
 
export default DDate;