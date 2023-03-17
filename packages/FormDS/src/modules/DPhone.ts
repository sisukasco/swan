'use strict';
import DFormElement from "./DFormElement";
import {PhoneValidations} from "../containers"
import "reflect-metadata"; 
import {Type} from "class-transformer";
import {NodeItem} from "@sisukas/coder-interface";
import { ExcludeDefault } from "../lib/TxUtils";

class DPhoneSettings
{
    @ExcludeDefault('')
    public placeholder:string='';
}
class DPhone extends DFormElement
{
    public settings = new DPhoneSettings();

    @Type(() => PhoneValidations) 
    public validations = new PhoneValidations();

    constructor()
    {
        super('Phone','Phone:');
        this.validations.content_type.type='phone';
    }
    public get default_value()
    {
        return '';
    }

    public code(coder:NodeItem)
    {
        const container = coder.section('form.input.container');

        container.section('form.input.label', {'for':this.name}).html(this.label);
        container.section('form.input.input',{type:'tel', 
        placeholder:this.settings.placeholder, 
        name:this.name,
        id:this.name});
        container.section('form.input.error',{name:this.name});
    }
}
 
export default DPhone;