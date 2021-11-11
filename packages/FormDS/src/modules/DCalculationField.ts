import DFormElement from "./DFormElement";
import {CalcFieldValidations} from "../containers";
import "reflect-metadata"; 
import {Type} from "@sisukas/base-runtime";
import {NodeItem} from "@sisukas/coder-interface";

export default class DCalculationField extends DFormElement
{
    public settings= {
        placeholder:'0.00',
        formula:'',
        format_currency:false,
        hidden:false,
        align:'right',
        text_size:'md'
    };

    @Type(()=>CalcFieldValidations)
    public readonly validations:CalcFieldValidations = new CalcFieldValidations;

    constructor()
    {
        super('CalculationField', 'Calculated:');
        
    }

    public code(coder:NodeItem)
    {
        const container = coder.section('form.input.container');
        container.section('form.input.label', 
        {'for':this.name}).html(this.label);

        container.startTag("calculated-field",
        {
            formula:this.settings.formula,
            
            placeholder: this.settings.placeholder,
            ":variables":"form_data",
            size: this.settings.text_size,
            align: this.settings.align,
            ":hidden":this.settings.hidden,
            name:this.name
        });
        
        coder.createCodeBlock('calc-field',
        `var CalculatedField = this["@sisukas/aves"].CalculatedField;
         Vue.component("calculated-field",CalculatedField); `);

        coder.addDependency('aves','http://cdn.dollarforms.io/scripts/aves/1.0.0','script');
    }
}
 