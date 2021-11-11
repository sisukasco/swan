import FormValidation from "./FormValidation";

export default
class MustCheck extends FormValidation
{
    public enabled=false;
    
    public is_enabled():boolean
    {
        return this.enabled;
    }
    public get short_name():string
    {
        return('must.check');
    }
    public getCode()
    {
        return 'isChecked()';
    }
    public get_class_name()
    {
        return "must_check";
    }
}