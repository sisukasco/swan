'use strict';
import DElement from './DElement';
import { NodeItem} from "@sisukas/coder-interface";
 
class DLabel extends DElement
{
    public settings = {
        content:'Your label:',
        alignment:'right'
    }
    constructor()
    {
        super('Label');
    }

    public code(coder:NodeItem)
    {

        const container = coder.section('label.container', {width: this.width, alignment: this.settings.alignment});

        container.section("label",{}).html(this.settings.content)
    }
}

export default DLabel;