import FormValidation from "./FormValidation";


export default
class MaxSelections extends FormValidation
{
    public num:number|null=null;

    public is_enabled()
    {
        return((this.num === null)?false:true);
    }
    
    public get short_name():string
    {
        return('max.count:'+this.num);
    }

    public getCode()
    {
        return 'hasMaxSelections('+this.num+')';
    }
    public get_class_name()
    {
        return "max_count";
    }
}