import FormValidation from "./FormValidation";

export default
class Pattern extends FormValidation
{
    public regexp:string='';
    public get_class_name()
    {
        return "pattern";
    }
    public is_enabled()
    {
        return((this.regexp.length > 0)?true:false);
    }
    
    public get short_name():string
    {
        return('pattern:'+this.regexp);
    }

}