import FormValidation from "./FormValidation";

export default
class Confirm extends FormValidation
{
    public other:string=''
    public is_enabled():boolean
    {
        return this.other.length > 0 ? true: false;
    }
    public get short_name():string
    {
        return('confirm:'+this.other);
    }
    public get_class_name()
    {
        return "confirm";
    }
}