import FormValidation from "./FormValidation";

export default
class MinSelections extends FormValidation
{
    public num:number|null=null;
    
    public is_enabled()
    {
        return((this.num === null)?false:true);
    }

    public get short_name():string
    {
        return('min.count:'+this.num);
    }
    
    public getCode()
    {
        return 'hasMinSelections('+this.num+')';
    }
    public get_class_name()
    {
        return "min_count";
    }
}