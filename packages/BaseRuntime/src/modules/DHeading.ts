'use strict';
import DElement from './DElement';
import { NodeItem} from "@sisukas/coder-interface";
 
class DHeading extends DElement
{
    public settings = {
        content:'Heading',
        type:'h2',
        hint:'short description',
        alignment:'left'
    }
    constructor()
    {
        super('Heading');
    }
    has_hint()
    {
        return(this.settings.hint?true:false);
    }

    public code(coder:NodeItem)
    {
        coder.startTag(this.settings.type, {class:['w-100']})
        .html(this.settings.content)
        .startTag('div',{class:['heading-hint', 'w-100']})
        .html(this.settings.hint);
        
        coder.style(
            `
            .heading-hint
            {
            color:#888;
            font-size: 0.9rem;
            }
         `
        )
        
    }
}

export default DHeading;