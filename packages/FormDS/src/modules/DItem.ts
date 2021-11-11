import { ExcludeDefault } from '@sisukas/base-runtime';

export default class DItem
{
    
    @ExcludeDefault("")
    public name:string="";
    
    @ExcludeDefault("")
    public value:string="";
    
    constructor(name:string, value:string)
    {
        this.name = name;
        this.value = value;
    }
}