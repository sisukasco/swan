import DFormElement from "./DFormElement";
import {ColorValidations} from "../containers"
import "reflect-metadata"; 
import {Type} from "class-transformer";
import {NodeItem} from "@sisukas/coder-interface";

class DColor extends DFormElement
{
    @Type(() => ColorValidations) 
    public validations = new ColorValidations();

    constructor()
    {
        super('Color','Color:');
        this.validations.content_type.type='color';
    }
    public get default_value()
    {
        return '';
    }

    public code(coder:NodeItem)
    {
        const container = coder.section('form.input.container');

        container.section('form.input.label', {'for':this.name}).html(this.label);
        container.section('form.input.input',{type:'color', 
        novalidate:"novalidate",
        name:this.name,
        id:this.name});
        container.section('form.input.error',{name:this.name});
    }
}
 
export default DColor;