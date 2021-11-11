import "reflect-metadata";
import { ExcludeDefault } from "@sisukas/base-runtime";
import {escapeQuotes} from "../utils";

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

    public getValidatorCode():string
    {
        let ret_code = this.getCode();
        if(this.has_condition)
        {
            ret_code +=`.onlyWhen("${escapeQuotes(this.condition)}")`;
        }
        if(this.has_custom_message)
        {
            ret_code +=`.message("${escapeQuotes(this.message) }")`;
        }
        return ret_code;
    }
}