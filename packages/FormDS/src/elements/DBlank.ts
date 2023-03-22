'use strict';
import DElement from './DElement';
import { NodeItem} from "@sisukas/coder-interface";
 
class DBlank extends DElement
{
    public settings = {
    }
    constructor()
    {
        super('Blank');
    }

    public code(coder:NodeItem)
    {
        coder.section('label.container', {width: this.width});
    }
}

export default DBlank;