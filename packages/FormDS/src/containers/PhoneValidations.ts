import 
{
    Required, 
    MaxLength, 
    MinLength, Unique,ContentType,
    Pattern
} 
from "../validations";
import InputValidations from "../validations/InputValidations";
import "reflect-metadata"; 
import {Type} from "@sisukas/base-runtime";
import { OnlyIfEnabled } from "../containers/ValidationSerializer";


export default class PhoneValidations extends InputValidations
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

    @Type(() => Unique) 
    @OnlyIfEnabled()
    unique:Unique = new Unique;

    @Type(() => ContentType)
    @OnlyIfEnabled() 
    content_type:ContentType = new ContentType("phone");
    
    @Type(() => Pattern)
    @OnlyIfEnabled()
    pattern:Pattern = new Pattern;
}