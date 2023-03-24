import DFormElement from "./DFormElement";
import {CalcFieldValidations} from "../containers";
import "reflect-metadata"; 
import {Type} from "class-transformer";
import {NodeItem, Attributes} from "@sisukas/coder-interface";
import { ExcludeDefault } from "../lib/TxUtils";
import { Sidekick } from '../coder/Sidekick';

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

    public code(coder:NodeItem, sidekick: Sidekick)
    {
        const container = coder.startTag('div', {class: sidekick.css.inputContainerClasses(this.width)})
        //const container = coder.section('form.input.container', { width: this.width});

        /*
        if(this.hasLabel()){
            container.section('form.input.label', {'for':this.name}).html(this.label);
        }

        */
        if(this.hasLabel()){
            container
              .startTag('label', { for: this.name, class: sidekick.css.labelClasses() })
              .html(this.label);
        }
        

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
        const attrs:Attributes = {
            type:'text', 
            class: sidekick.css.inputClasses(),
            name:this.name,
            id:this.name,
            readonly:"readonly",
            "r-calc": this.settings.formula
        }

        if(format){
            attrs["r-format"] = format
        }
        
        container.startTag('input',attrs)
        
        //container.section('form.input.input',attrs);

        coder.addDependency('nitti','https://unpkg.com/@sisukas/nitti@1.0.9/dist/nitti.js','script');
    }
}
 