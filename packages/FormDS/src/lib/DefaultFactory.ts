'use strict';
import element_classes from '../modules';
import {plainToClass} from "class-transformer";
export default class DefaultFactory
{
    makeFromPlainObject(elmnt:any)
    {
        let classname ='D'+elmnt.type;
        if(!element_classes[classname])
        {
            return null;
        }
        return plainToClass(element_classes[classname], elmnt); 
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