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

        const container = coder.section('heading.container', {width: this.width, alignment: this.settings.alignment});

        container.section("heading", {type: this.settings.type}).html(this.settings.content)
        if(this.settings.hint){
            container.section("heading.hint").html(this.settings.hint);
        }
    }
}

export default DHeading;