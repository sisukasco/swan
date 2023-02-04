
import FactoryWrapper from "./FactoryWrapper";
import FormRuntimeFactory from "./FormRuntimeFactory"
import DefaultFactory from "./DefaultFactory";

import {FactoryType} from "./FactoryType";

export default (function (global:any) 
{
    if(global.sim_factory)
    {
        return global.sim_factory;
    }
    else
    {
        global.sim_factory = new FactoryWrapper( <FactoryType><unknown> new DefaultFactory);
        global.sim_factory.addFactory(<FactoryType><unknown>new FormRuntimeFactory())
        return global.sim_factory;
    }
    
})(typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {});
