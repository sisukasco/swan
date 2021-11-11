import FormValidation from "./FormValidation";


export default
class Min extends FormValidation
{
    public num:number|null=null;

    public is_enabled()
    {
        return((this.num === null)?false:true);
    }
    public get short_name():string
    {
        //return('≥'+this.num);
        return("min:"+this.num);
    }
    public getCode()
    {
        return (`isMinimum(${this.num})`);
    }
    public get_class_name()
    {
        return "min";
    }
}