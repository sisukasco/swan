import 
{
    Required, 
    MaxLength, 
    MinLength, 
    Pattern
} 
from "../validations";
import InputValidations from "../validations/InputValidations";
import "reflect-metadata"; 
import { Type } from "class-transformer";
import { OnlyIfEnabled } from "../containers/ValidationSerializer";

export default class PasswordValidations extends InputValidations
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
    
    @Type(() => Pattern)
    @OnlyIfEnabled()
    pattern:Pattern = new Pattern;
    
}

