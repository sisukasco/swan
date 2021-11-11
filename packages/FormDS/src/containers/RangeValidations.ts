
import { Required,Min, Max, 
    InputValidations, MultiplesOf, ContentType } from "../validations";
import Comparisons from "../validations/Comparisons";
import "reflect-metadata"; 
import {Type} from "@sisukas/base-runtime";
import { OnlyIfEnabled } from "./ValidationSerializer";

export default class RangeValidations extends InputValidations
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

    @Type(() => ContentType) 
    @OnlyIfEnabled()
    content_type: ContentType = new ContentType("number");
    
    @Type(() => Comparisons)
    @OnlyIfEnabled()
    comparisons:Comparisons=new Comparisons();
    
    
    @Type(() => MultiplesOf)
    @OnlyIfEnabled()
    multiples_of:MultiplesOf=new MultiplesOf();
}