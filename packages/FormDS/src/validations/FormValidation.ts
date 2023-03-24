import "reflect-metadata";
import { ExcludeDefault } from "../lib/TxUtils";

export  default abstract class FormValidation
{
    @ExcludeDefault("")
    public message:string='';
    
    @ExcludeDefault("")
    public condition:string='';

    constructor()
    {
        
    }
    public get has_custom_message()
    {
        return (this.message && this.message.length > 0)? true:false;
    }
    public set has_custom_message(has:boolean)
    {
        if(!has){ this.message=''; }
    }
    public get has_condition()
    {
        return (this.condition && this.condition.length > 0)? true:false;
    }
    public set has_condition(has:boolean)
    {
        if(!has){ this.condition=''; }
    }

    public is_enabled():boolean
    {
        return false;
    }
    public get contained_validations():FormValidation[]
    {
        return [];
    }
    public abstract get_class_name():string;
    
    public get short_name()
    {
        return 'unnamed';
    }
    public getCode()
    {
        return '';
    }

}