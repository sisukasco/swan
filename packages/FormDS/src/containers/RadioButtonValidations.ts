import {Required, ShouldNotSelect, ShouldSelect} from "../validations";
import InputValidations from "../validations/InputValidations";
import "reflect-metadata"; 
import {Type} from "class-transformer";
import { OnlyIfEnabled } from "./ValidationSerializer";

export default class RadioButtonValidations extends InputValidations
{
    @Type(() => Required) 
    @OnlyIfEnabled()
    required:Required=new Required();

    @Type(() => ShouldSelect) 
    @OnlyIfEnabled()
    should_select:ShouldSelect=new ShouldSelect();

    @Type(() => ShouldNotSelect)
    @OnlyIfEnabled() 
    should_not_select:ShouldNotSelect=new ShouldNotSelect();    
}