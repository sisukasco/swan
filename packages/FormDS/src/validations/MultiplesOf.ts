
import FormValidation from "./FormValidation";

export default
class MultiplesOf extends FormValidation
{
    public start:number|null=null;
    public multiplicand:number|null=null;
    
    public is_enabled()
    {
        return((this.start === null || this.multiplicand === null)?false:true);
    }

    public get short_name():string
    {
        return('steps_of_'+this.multiplicand+'from_'+this.start);
    }
    public getCode()
    {
        return 'multiplesOf('+String(this.start)+','+String(this.multiplicand)+')';
    }
    public get_class_name()
    {
        return "multiples-of";
    }
}