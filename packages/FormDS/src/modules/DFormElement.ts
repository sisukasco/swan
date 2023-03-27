'use strict';
import DElement from "../elements/DElement";

import {ExcludeDefault} from "../lib/TxUtils"
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

    public hasLabel(){
        return(this.label && this.label.trim().length > 0)
    }

    public get validations_array():FormValidation[]
    {
        return this.validations.asArray();
    }

    public get enabled_validations():FormValidation[]
    {
        return this.validations.enabled_validations();
    }

}

export default DFormElement;