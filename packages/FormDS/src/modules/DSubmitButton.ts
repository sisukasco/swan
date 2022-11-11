import DFormElement from "./DFormElement";
import { NodeItem } from '@sisukas/coder-interface';
import "reflect-metadata"; 
import { ExcludeDefault, Type } from '@sisukas/base-runtime';

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
    code(node:NodeItem)
    {
        node.section('form.input.container',{alignment:this.settings.alignment, type: this.type, width: this.width})
            .section('button.button', {
                alignment:this.settings.alignment, 
                size:this.settings.size,
                style:this.styles(),
                type:'submit'
            }).text(this.settings.label);

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
