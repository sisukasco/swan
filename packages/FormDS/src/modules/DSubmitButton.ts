'use strict';
import {DElement} from '@sisukas/base-runtime';
import { NodeItem } from '@sisukas/coder-interface';

export default
class DSubmitButton extends DElement
{
    public settings =
    {
        label:'Submit',
        alignment:'left',
        size:'md',
        bgColor:'#007bff'
    };

    constructor()
    {
        super('SubmitButton');
    }
    code(node:NodeItem)
    {
        node.section('button.container',{alignment:this.settings.alignment})
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
            'border-color': this.settings.bgColor 
        }); 
    }
} 
