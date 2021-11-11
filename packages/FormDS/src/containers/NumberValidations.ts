
import { Required,Min, Max, InputValidations } from "../validations";
import Comparisons from "../validations/Comparisons";
import "reflect-metadata"; 
import {Type} from "@sisukas/base-runtime";
import { OnlyIfEnabled } from "../containers/ValidationSerializer";

export default class NumberValidations extends InputValidations
{
    @Type(() => Required) 
    @OnlyIfEnabled()
    required:Required=new Required();

    @Type(() => Min) 
    @OnlyIfEnabled()
    min:Min=new Min();

    @Type(() => Max) 
    @OnlyIfEnabled()
    max:Max=new Max(); 
    
    @Type(() => Comparisons)
    @OnlyIfEnabled()
    comparisons:Comparisons=new Comparisons();
    
}