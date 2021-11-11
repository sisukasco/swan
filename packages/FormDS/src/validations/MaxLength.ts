
import FormValidation from "./FormValidation";

export default
class MaxLength extends FormValidation
{
    public size:number|null=null;
    
    public is_enabled()
    {
        return((this.size === null)?false:true);
    }

    public get short_name():string
    {
        return('maxlength:'+this.size);
    }
    public getCode()
    {
        return 'checkMaxLength('+this.size+')';
    }
    public get_class_name()
    {
        return "max-length";
    }
}