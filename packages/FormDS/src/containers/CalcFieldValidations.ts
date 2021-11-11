import {Min, Max} from "../validations";
import InputValidations from "../validations/InputValidations";
import "reflect-metadata"; 
import {Type} from "@sisukas/base-runtime";


export default class CalcFieldValidations extends InputValidations
{
    @Type(()=>Min)
    public min:Min = new Min();

    @Type(()=>Max)
    public max:Max =  new Max()
};