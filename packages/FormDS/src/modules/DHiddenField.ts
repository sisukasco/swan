'use strict';
import DFormElement from "./DFormElement";
import {NodeItem} from "@sisukas/coder-interface";
import { ExcludeDefault } from '@sisukas/base-runtime';

class HiddenFieldSettings
{
    @ExcludeDefault('')    
    public value:string=''
}
class DHiddenField extends DFormElement
{
    public settings = new HiddenFieldSettings()

    constructor()
    {
        super('HiddenField');
    }
    public is_hidden()
	{
		return true;
    }
    get default_value()
	{
		return this.settings.value;
    }
    public code(coder:NodeItem)
    {
        coder.startTag('input',{type:'hidden', name:this.name, value:this.settings.value});
    }
    
}

export default DHiddenField;