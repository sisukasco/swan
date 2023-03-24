'use strict';
import DElement from './DElement';
import { NodeItem} from "@sisukas/coder-interface";
import { Sidekick } from '../coder/Sidekick';
 
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

    public code(coder:NodeItem, sidekick: Sidekick)
    {
        const container = coder.startTag('div', {class: [...sidekick.css.inputContainerClasses(this.width),
        ...sidekick.css.textAlignmentClasses(this.settings.alignment)] })

        //const container = coder.section('heading.container', {width: this.width, alignment: this.settings.alignment});

        container.startTag(this.settings.type,{class:sidekick.css.headingClasses(this.settings.type)}).html(this.settings.content)

        //container.section("heading", {type: this.settings.type}).html(this.settings.content)
        if(this.settings.hint){
            container.startTag('div',{class: sidekick.css.hintTextClasses() }).html(this.settings.hint)
            //container.section("heading.hint").html(this.settings.hint);
        }
    }
}

export default DHeading;