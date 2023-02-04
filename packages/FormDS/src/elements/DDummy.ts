'use strict';
import DElement from './DElement';
import { NodeItem} from "@sisukas/coder-interface";

class DDummy extends DElement
{
    constructor()
    {
        super('Dummy');
    }

    public is_hidden():boolean
	{
		return true;
    }
    
    public code(coder:NodeItem)
    {
        coder.startTag('div', {name:this.name, class:['dummy']});
        
    }
}

export default DDummy;