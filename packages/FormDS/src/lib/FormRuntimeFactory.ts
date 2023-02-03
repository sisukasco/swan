'use strict';

import element_classes, { DFormElement } from '../modules/index';
import {plainToClass} from "class-transformer";

export default class FormRuntimeFactory
{
    fromPlainArray(fields:Object[]):DFormElement[]
    {
        let ret_fields:DFormElement[]=[]
        for(let f of fields)
        {
            const fe = this.makeFromPlainObject(f);
            if(fe != null)
            { 
                ret_fields.push(fe);
            }
        }
        return ret_fields;
    }
    makeFromPlainObject(elmnt:any):DFormElement|null
    {
        let classname ='D'+elmnt.type;
        if(!element_classes[classname])
        {
            return null;
        }
        if(elmnt.validations === null )
        {
            elmnt.validations = {};
        }
        if(elmnt.settings === null )
        {
            elmnt.settings = {};
        }
        
        const fe = <DFormElement><unknown>plainToClass(element_classes[classname], elmnt)
        if(fe.is_input() != true)
        {
            console.log("The Element was not deserialized correctly ", fe);
            return null;
        }
        
        return fe; 
    }
    makeObject(type:string)
    {
        let classname ='D'+type;
        if(element_classes[classname])
        {
            return new element_classes[classname];
        }
        return null;
    }
    

   
}