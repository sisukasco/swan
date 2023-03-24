import DFormElement from "./DFormElement";
import { NodeItem, Attributes } from '@sisukas/coder-interface';
import "reflect-metadata"; 
import { Type } from 'class-transformer';
import { ExcludeDefault } from "../lib/TxUtils";
import { Sidekick } from '../coder/Sidekick';

class SubmitButtonSettings
{
    public label = 'Submit'

    @ExcludeDefault('left')
    public alignment = 'left'

    @ExcludeDefault('md')
    public size = 'md'

    @ExcludeDefault('#007bff')
    public bgColor = '#007bff'
}

export default
class DSubmitButton  extends DFormElement
{

    @Type(()=>SubmitButtonSettings)
    public settings = new SubmitButtonSettings();

    constructor()
    {
        super('SubmitButton');
    }
    code(coder:NodeItem, sidekick: Sidekick)
    {
        const container = coder.startTag('div', {class: [...sidekick.css.inputContainerClasses(this.width),
            ...sidekick.css.flexAlignmentClasses(this.settings.alignment)] })

        const attribs:Attributes = {
            class: sidekick.css.buttonClasses(),
            style: this.styles(),
            type:'submit'
        }
        container.startTag("button", attribs).text(this.settings.label)
        
       /* node.section('form.input.container',{alignment:this.settings.alignment, type: this.type, width: this.width})
            .section('button.button', {
                alignment:this.settings.alignment, 
                size:this.settings.size,
                style:this.styles(),
                type:'submit'
            }).text(this.settings.label);
            */
    }

    

    styles()
    {
     return(
        {
            'background-color': this.settings.bgColor,
            'border-color': this.settings.bgColor ,
            'color': 'white'
        }); 
    }
} 
