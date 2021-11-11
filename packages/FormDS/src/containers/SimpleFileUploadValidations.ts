import {Required, FileExtension} from "../validations";
import InputValidations from "../validations/InputValidations";
import "reflect-metadata"; 
import {Type} from "@sisukas/base-runtime";
import { OnlyIfEnabled } from "./ValidationSerializer";

export default class SimpleFileUploadValidations extends InputValidations
{
    @Type(() => Required)
    @OnlyIfEnabled() 
    required:Required=new Required();

    @Type(()=>FileExtension)
    @OnlyIfEnabled()
    file_extension:FileExtension= new FileExtension();
}