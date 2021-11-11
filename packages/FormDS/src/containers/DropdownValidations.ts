import {Required} from "../validations";
import InputValidations from "../validations/InputValidations";
import "reflect-metadata"; 
import {Type} from "@sisukas/base-runtime";
import { OnlyIfEnabled } from "../containers/ValidationSerializer";

export default class DropdownValidations extends InputValidations
{
    @Type(() => Required) 
    @OnlyIfEnabled()
    required:Required=new Required();
    
    public hasValidations()
    {
        return this.required.is_enabled()?true:false;
    }
}