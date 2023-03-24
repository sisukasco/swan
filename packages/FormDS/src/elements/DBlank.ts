'use strict';
import DElement from './DElement';
import { NodeItem} from "@sisukas/coder-interface";
import { Sidekick } from '../coder/Sidekick';
 
class DBlank extends DElement
{
    public settings = {
    }
    constructor()
    {
        super('Blank');
    }

    public code(coder:NodeItem, sidekick: Sidekick)
    {
       // coder.section('label.container', {width: this.width});

        const containerClasses = sidekick.css.inputContainerClasses(this.width);
        coder.startTag('div', { class: containerClasses });


    }
}

export default DBlank;