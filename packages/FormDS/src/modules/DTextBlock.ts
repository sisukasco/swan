'use strict';
import DElement from './DElement';
import { NodeItem} from "@sisukas/coder-interface";

class DTextBlock extends DElement
{
    public content:string = 'The contents of the text block';
    constructor()
    {
        super('TextBlock');
    }
    public is_empty()
    {
        return ((this.content)?false:true);
    }

    public code(coder:NodeItem)
    {
        
        const container = coder.section('element.container', {width: this.width});

        container.startTag('div', {class:['sim-textblock']}).html(this.content);
        container.style(`
        .sim-textblock p
        {
        margin:0;
        padding:0;
        }
        `);
    }
}

export default DTextBlock;