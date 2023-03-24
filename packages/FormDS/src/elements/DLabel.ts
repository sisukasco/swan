'use strict';
import DElement from './DElement';
import { NodeItem} from "@sisukas/coder-interface";
import { Sidekick } from '../coder/Sidekick';

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

    public code(coder:NodeItem, sidekick: Sidekick)
    {
        const container = coder.startTag('div', {class: [...sidekick.css.inputContainerClasses(this.width),
            ...sidekick.css.flexAlignmentClasses(this.settings.alignment)] })

        //const container = coder.section('label.container', {width: this.width, alignment: this.settings.alignment});

        container.startTag("label").html(this.settings.content)
    }
}

export default DLabel;