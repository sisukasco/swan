import 
{
    Required, 
    MaxLength, 
    MinLength, Confirm,Unique,ContentType
} 
from "../validations";
import InputValidations from "../validations/InputValidations";
import "reflect-metadata"; 
import {Type} from "@sisukas/base-runtime";
import { OnlyIfEnabled } from "../containers/ValidationSerializer";


export default class EmailValidations extends InputValidations
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

    @Type(() => Confirm)
    @OnlyIfEnabled() 
    confirm:Confirm = new Confirm;

    @Type(() => Unique) 
    @OnlyIfEnabled()
    unique:Unique = new Unique;

    @Type(() => ContentType)
    @OnlyIfEnabled() 
    content_type:ContentType = new ContentType("email");
}