
import { Required, 
    InputValidations, 
    ContentType} from "../validations";
import "reflect-metadata"; 
import {Type} from "class-transformer";
import { OnlyIfEnabled } from "./ValidationSerializer";

export default class ColorValidations extends InputValidations
{
    @Type(() => Required) 
    @OnlyIfEnabled()
    required:Required=new Required();

    @Type(() => ContentType)
    @OnlyIfEnabled() 
    content_type:ContentType = new ContentType("color");
}