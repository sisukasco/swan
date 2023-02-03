
import FormValidation from "./FormValidation";
import Comparison from "./Comparison";
import "reflect-metadata"; 
import {Type} from "class-transformer";

export default
class Comparisons extends FormValidation
{
    @Type(() => Comparison) 
    public comparisons:Comparison[]=[];

    constructor()
    {
        super();
    }
    public is_enabled():boolean
    {
        return(this.comparisons.length > 0 ? true:false);
    }
    public get_class_name()
    {
        return "comparisons";
    }
    public addComparison(op:string,other_name:string)
    {
        this.add(new Comparison(op,other_name));
    }
    public add(comp:Comparison):void
    {
        this.comparisons.push(comp);
    }
    public get contained_validations():FormValidation[]
    {
        return this.comparisons;
    }
}