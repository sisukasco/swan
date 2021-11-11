'use strict';
import {DElement, ExcludeDefault} from '@sisukas/base-runtime';
import {FormValidation, InputValidations} from "../validations";

abstract class DFormElement extends DElement
{
    @ExcludeDefault("")
    public label:string="";
    
	constructor(type:string, label:string='')
	{
        super(type);
        this.label = label;
    }
    public is_input()
    {
        return true;
    }
    public readonly validations:InputValidations= new InputValidations()
    
    get default_value():any
	{
		return '';
	}


    public get validations_array():FormValidation[]
    {
        return this.validations.asArray();
    }

    public get enabled_validations():FormValidation[]
    {
        return this.validations.enabled_validations();
    }

    public getValidationType()
    {
        return("string()");
    }
    
    public get validation_code():string
    {
        let validations=''
        for(let validn of this.enabled_validations)
        {
            const v_code = validn.getValidatorCode();
            if(v_code)
            {
                validations += '.'+v_code;
            }
        }
        if(validations.length > 0)
        {
            return(`boel.field("${this.name}")`+validations)
        }
        return('');
    }
    public getConverterCode():string|null
    {
        return null;
    }

    public get converter_code():string
    {
        let code = this.getConverterCode();
        if(code)
        {
            return(`urge.field("${this.name}")`+code);
        }
        return('');
    }
}

export default DFormElement;