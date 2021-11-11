import FormValidation from "./FormValidation";

export default
class ShouldSelect extends FormValidation
{
   public item:string='';
   
   is_enabled():boolean
   {
       return (this.item.length > 0 ? true:false);
   }

   public get short_name():string
    {
        return('should.select:'+this.item);
    }

   public getCode()
   {
       return(`shouldSelect("${this.item}")`);
   }
   public get_class_name()
   {
       return "should_select";
   }
}