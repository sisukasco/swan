import 
{
    Required, 
    MaxLength, 
    MinLength
} 
from "../validations";
import InputValidations from "../validations/InputValidations";
import "reflect-metadata"; 
import {Type} from "@sisukas/base-runtime";
import { OnlyIfEnabled } from "../containers/ValidationSerializer";

export default class MultilineValidations extends InputValidations
{
    @Type(() => Required) 
    @OnlyIfEnabled()
    required:Required=new Required();

    @Type(() => MaxLength) 
    @OnlyIfEnabled()
    maxlength:MaxLength = new MaxLength;

    @Type(() => MinLength) 
    @OnlyIfEnabled() 
    minlength:MinLength = new MinLength;   
}