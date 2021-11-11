import FormValidation from "./FormValidation";

export default
class Max extends FormValidation
{
    public num:number|null=null;

    public is_enabled()
    {
        return((this.num === null)?false:true);
    }
    public get short_name():string
    {
        return('max:'+this.num);
    }
    public getCode()
    {
        return (`isMaximum(${this.num})`);
    }

    public get_class_name()
    {
        return "max";
    }
}