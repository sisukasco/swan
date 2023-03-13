import DFormElement from "./DFormElement";
import {CalcFieldValidations} from "../containers";
import "reflect-metadata"; 
import {Type} from "class-transformer";
import {NodeItem} from "@sisukas/coder-interface";
import { ExcludeDefault } from "../lib/TxUtils";
import {InputAttributes } from "./attribs";

class CalculationFieldSettings
{
    public formula:string=''

    @ExcludeDefault('')
    public format:string=''

    @ExcludeDefault('')
    public currency_code:string=''
}

export default class DCalculationField extends DFormElement
{
    @Type(() => CalculationFieldSettings)
    public settings= new CalculationFieldSettings();

    @Type(()=>CalcFieldValidations)
    public readonly validations:CalcFieldValidations = new CalcFieldValidations;

    constructor()
    {
        super('CalculationField', 'Calculated:');
        
    }

    public code(coder:NodeItem)
    {
        const container = coder.section('form.input.container', { width: this.width});

        container.section('form.input.label', {'for':this.name}).html(this.label);

        

        let format = ""
        if(this.settings.format == "currency"){
            if(this.settings.currency_code && this.settings.currency_code.length == 3){
                format = "currency|"+this.settings.currency_code.toLocaleLowerCase()
            }else{
                format = "currency|usd"
            }
        }else if(this.settings.format == "number"){
            format = "number"
        }
        const attrs:InputAttributes = {
            type:'text', 
            name:this.name,
            id:this.name,
            readonly:"readonly",
            "r-calc": this.settings.formula
        }

        if(format){
            attrs["r-format"] = format
        }
        
        container.section('form.input.input',attrs);

        coder.addDependency('nitti','https://unpkg.com/@sisukas/nitti@1.0.9/dist/nitti.js','script');
    }
}
 