import FormValidation from "./FormValidation";
import { ExcludeDefault } from '@sisukas/base-runtime';

export default
class ContentType extends FormValidation
{
    constructor(public type:string)
    {
        super();
    }
    
    @ExcludeDefault(false)
    public allow_spaces:boolean=false;
    
    public get_class_name()
    {
        return "content_type";
    }
    public is_enabled()
    {
        return((this.type.length > 0)?true:false);
    }
    public get short_name():string
    {
        return('is: '+this.type);
    }

}