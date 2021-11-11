import FormValidation from "./FormValidation";

export default
class MaxDate extends FormValidation
{
    public date:string|null=null;

    public is_enabled()
    {
        return((this.date === null|| this.date === "")?false:true);
    }

    public get short_name():string
    {
        return('max_date:'+this.date);
    }
    public getCode()
    {
        return 'onOrBefore('+this.date+')';
    }
    public get_class_name()
    {
        return "max_date";
    }
}