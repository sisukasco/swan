import FormValidation from "./FormValidation";

export default
class MinLength extends FormValidation
{
    public size:number|null=null;

    public is_enabled()
    {
        return((this.size === null)?false:true);
    }

    public get short_name():string
    {
        return('minlength:'+this.size);
    }
    public getCode()
    {
        return 'checkMinLength('+this.size+')';
    }
    public get_class_name()
    {
        return "min-length";
    }
}