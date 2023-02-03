import {Required, MaxSelections, MinSelections} from "../validations";
import InputValidations from "../validations/InputValidations";
import "reflect-metadata"; 
import {Type} from "class-transformer";
import { OnlyIfEnabled } from "./ValidationSerializer";

export default class CheckboxGroupValidations extends InputValidations
{
    @Type(() => Required) 
    @OnlyIfEnabled()
    required:Required=new Required();

    @Type(() => MaxSelections)
    @OnlyIfEnabled()
    max_count:MaxSelections = new MaxSelections();

    @Type(() => MinSelections)
    @OnlyIfEnabled()
    min_count:MinSelections = new MinSelections();
}