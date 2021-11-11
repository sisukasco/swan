import FormValidation from "./FormValidation";

export default
class Unique extends FormValidation
{
    public enabled:boolean=false;
    
    public get_class_name()
    {
        return "unique";
    }
    public is_enabled():boolean
    {
        return this.enabled;
    }
    public get short_name():string
    {
        return('unique');
    }
}