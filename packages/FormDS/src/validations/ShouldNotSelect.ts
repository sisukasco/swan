import FormValidation from "./FormValidation";

export default
class ShouldNotSelect extends FormValidation
{
   public item:string='';
   
   public get short_name():string
    {
        return('should.not.select:'+this.item);
    }

   is_enabled():boolean
   {
       return (this.item.length > 0 ? true:false);
   }
   public getCode()
   {
       return(`isNotEqualTo("${this.item}")`);
   }
    public get_class_name()
    {
        return "should_not_select";
    }
}