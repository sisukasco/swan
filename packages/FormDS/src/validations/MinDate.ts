import FormValidation from "./FormValidation";

export default
class MinDate extends FormValidation
{
    public date:string|null=null;

    public is_enabled()
    {
        return((this.date === null || this.date === "")?false:true);
    }

    public get short_name():string
    {
        return('min_date:'+this.date);
    }
    public getCode()
    {
        return 'onOrAfter('+this.date+')';
    }
    public get_class_name()
    {
        return "min_date";
    }
}