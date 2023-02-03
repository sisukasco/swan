import 
{
    Required, 
    MaxLength, 
    MinLength,
    ContentType,
    Pattern
} 
from "../validations";
import InputValidations from "../validations/InputValidations";
import "reflect-metadata"; 
import {Type} from "class-transformer";
import { OnlyIfEnabled } from "../containers/ValidationSerializer";


export default class URLValidations extends InputValidations
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

    @Type(() => ContentType)
    @OnlyIfEnabled() 
    content_type:ContentType = new ContentType("url");
    
    @Type(() => Pattern)
    @OnlyIfEnabled()
    pattern:Pattern = new Pattern;
}