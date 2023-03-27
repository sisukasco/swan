'use strict';
import DFormElement from "./DFormElement";
import {CheckboxValidations} from "../containers";
import "reflect-metadata"; 
import {Type} from "class-transformer";
import { NodeItem, Attributes } from "@sisukas/coder-interface";
import { ExcludeDefault } from "../lib/TxUtils";
import { Sidekick } from '../coder/Sidekick';

class CheckboxSettings
{
    @ExcludeDefault('on')
    public value:string='on';
}
export default
class DCheckbox extends DFormElement
{
    @Type(() => CheckboxSettings)
    public settings= new CheckboxSettings();
    
    @Type(() => CheckboxValidations) 
    public readonly validations = new CheckboxValidations();

    constructor()
    {
        super('Checkbox','Enable this item?');
    }
    get default_value()
    {
        return null;
    }

    public code(coder:NodeItem, sidekick: Sidekick)
    {
        const container = coder.startTag('div', {class: [...sidekick.css.inputContainerClasses(this.width),
            ...sidekick.css.flexAlignmentClasses("")] })

        const inside = container.startTag("div")
        const attrs:Attributes= {
            type:"checkbox", 
            class: sidekick.css.inputCheckboxClasses(),
            name:this.name, 
            id:this.name
        }
        inside.startTag('input', attrs)

        inside.startTag('label', {"for":this.name, class: sidekick.css.labelCheckboxClasses()}).html(this.label)
    }
    
}