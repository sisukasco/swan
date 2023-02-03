import {MustCheck} from "../validations";
import InputValidations from "../validations/InputValidations";
import "reflect-metadata"; 
import {Type} from "class-transformer";
import { OnlyIfEnabled } from "./ValidationSerializer";

export default class CheckboxValidations extends InputValidations
{
    @Type(() => MustCheck) 
    @OnlyIfEnabled()
    must_check:MustCheck = new MustCheck();
    
}