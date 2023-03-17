'use strict';
import DFormElement from "./DFormElement";
import {DateTimeValidations} from "../containers"
import "reflect-metadata"; 
import {Type} from "class-transformer";
import {NodeItem} from "@sisukas/coder-interface";


class DDateTime extends DFormElement
{

    @Type(() => DateTimeValidations) 
    public validations = new DateTimeValidations();

    constructor()
    {
        super('DateTime','Date:');
        this.validations.content_type.type='datetime';
    }
    public get default_value()
    {
        return '';
    }

    public code(coder:NodeItem)
    {
        const container = coder.section('form.input.container');

        container.section('form.input.label', {'for':this.name}).html(this.label);
        container.section('form.input.input',{type:'datetime-local', 
        name:this.name,
        id:this.name});
        container.section('form.input.error',{name:this.name});
    }
}
 
export default DDateTime;