import {FactoryType} from "./FactoryType";

export default class FactoryWrapper
{
    private factories:FactoryType[]=[];
    constructor(factory:FactoryType)
    {
        this.factories = [];
        if(factory)
        {
            this.addFactory(factory);
        }
    }
    addFactory(factory:FactoryType)
    {
        this.factories.push(factory);
    }
    make(obj_type:string, ...args:any[])
    {
        //console.log("factory making object type ",obj_type," num factories ",this.factories.length,"args ",...args );
        let obj = null;
        for(let i=0; i< this.factories.length; i++)
        {
            let fn_name = 'make'+obj_type;
            if(this.factories[i][fn_name])
            {
                obj = this.factories[i][fn_name](...args);
            }
            if(obj != null) { break;}
        }
        return obj;        
    }
    
    makeFromPlainObject(elmnt:any)
    {
        return this.make('FromPlainObject',elmnt);
    }
    makeObject(type:string)
    {
        return this.make('Object',type);
    }
    
}