import FormValidation from "./FormValidation";

interface ComparisonMapping
{
    [op:string]:string
}
export default
class Comparison extends FormValidation
{
    constructor(public op:string, public elmnt_name:string)
    {
        super();
    }
    get stringForm()
    {
        return(this.op+' '+this.elmnt_name);
    }
    public is_enabled():boolean
    {
        if(!this.op || !this.elmnt_name)
        {
            return false;
        }
        return true;
    }
    public get_class_name()
    {
        return "comparison";
    }
    public get short_name():string
    {
        return(`${this.op} ${this.elmnt_name}`);
    }
    public getCode()
    {
        const mapping:ComparisonMapping={'<':'isLessThanField',
            '<=':'isLessThanOrEqualToField',
            '=':'isEqualToField',
            '!=':'isNotEqualToField',
            '>':'isGreaterThanField',
            '>=':'isGreaterThanOrEqualToField'
        };

        return(`${mapping[this.op]}("${this.elmnt_name}")`);

    }
}
