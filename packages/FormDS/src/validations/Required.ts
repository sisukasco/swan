import FormValidation from "./FormValidation";

export default
class Required extends FormValidation
{
    public enabled=false;
    
    public is_enabled():boolean
    {
        return this.enabled;
    }
    public get short_name():string
    {
        return('required');
    }
    public getCode()
    {
        return 'isRequired()';
    }
    public get_class_name()
    {
        return "required";
    }
}