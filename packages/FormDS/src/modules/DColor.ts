import DFormElement from "./DFormElement";
import {ColorValidations} from "../containers"
import "reflect-metadata"; 
import {Type} from "class-transformer";
import {NodeItem, Attributes} from "@sisukas/coder-interface";
import { Sidekick } from '../coder/Sidekick';

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

    public code(coder:NodeItem, sidekick: Sidekick )
    {
        const container = coder.startTag('div', {class: sidekick.css.inputContainerClasses(this.width)})
        if(this.hasLabel()){
            container
              .startTag('label', { for: this.name, class: sidekick.css.labelClasses() })
              .html(this.label);
        }
        const attrs:Attributes = {
            type:'color', 
            class: sidekick.css.inputClasses(),
            name:this.name,
            id:this.name
        }


        container.startTag('input',attrs)
    }
}
 
export default DColor;