
import { Required, 
    InputValidations, 
    ContentType,
    MinDate, MaxDate } from "../validations";
import "reflect-metadata"; 
import {Type} from "class-transformer";
import { OnlyIfEnabled } from "../containers/ValidationSerializer";

export default class DateTimeValidations extends InputValidations
{
    @Type(() => Required) 
    @OnlyIfEnabled()
    required:Required=new Required();

    @Type(() => MinDate) 
    @OnlyIfEnabled()
    min_date:MinDate=new MinDate();

    @Type(() => MaxDate) 
    @OnlyIfEnabled()
    max_date:MaxDate=new MaxDate(); 
    
    @Type(() => ContentType)
    @OnlyIfEnabled() 
    content_type:ContentType = new ContentType("datetime");
}