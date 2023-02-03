import 
{
    ContentType, 
    Required, 
    MaxLength, 
    MinLength, 
    Confirm,
    Unique,
    Pattern
} 
from "../validations";
import InputValidations from "../validations/InputValidations";
import "reflect-metadata"; 
import { Type } from "class-transformer";
import { OnlyIfEnabled } from "../containers/ValidationSerializer";

/*
The validations use separate class instead of making use of an indexed interface
(like this:
interface Validations
{
    [name:string]:FormValidation
}    
)
because the class approach makes it easy to serialize and deserialize the element
The indexed interface would need to keep the type of each validation type to 
re-create the validation on deserialization
*/
export default class TextboxValidations extends InputValidations
{
    @Type(() => Required) 
    @OnlyIfEnabled()
    required:Required=new Required();

    @Type(() => ContentType) 
    @OnlyIfEnabled()
    content_type:ContentType = new ContentType("");

    @Type(() => MaxLength) 
    @OnlyIfEnabled()
    maxlength:MaxLength = new MaxLength;

    @Type(() => MinLength)
    @OnlyIfEnabled()
    minlength:MinLength = new MinLength;

    @Type(() => Confirm) 
    @OnlyIfEnabled()
    confirm:Confirm = new Confirm;

    @Type(() => Unique)
    @OnlyIfEnabled()
    unique:Unique = new Unique;
    
    @Type(() => Pattern)
    @OnlyIfEnabled()
    pattern:Pattern = new Pattern;
    
}

