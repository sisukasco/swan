import { ExcludeDefault } from "../lib/TxUtils";

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