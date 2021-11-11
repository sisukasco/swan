import FormValidation from "./FormValidation";

export default class NumberComparison extends FormValidation
{
    private num_internal:number|null=null;
    public get num()
    {
        return this.num_internal;
    }
    public set num(s:any)
    {
        this.num_internal = (s === null|| s===''||Number.isNaN(s) )?null:Number(s);
        this.udate_message(this.num_internal);
    }
    protected udate_message(num:number|null):void
    {
    };

    public is_enabled()
    {
        return((this.num_internal === null)?false:true);
    }
    public get_class_name()
    {
        return "number-comparison";
    }
}