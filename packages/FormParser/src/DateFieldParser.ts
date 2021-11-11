import {DDate} from "@sisukas/form-ds";
import {BaseElementParser} from "./BaseElementParser";

export class DateFieldParser extends BaseElementParser
{
    private field:DDate=new DDate();
    constructor(e:HTMLElement)
    {
        super(e);
    }
    public parse()
    {
        this.field.name = this.getName();
        this.field.label = this.getLabel();
        this.field.validations.required.enabled = this.isRequired();
        this.field.validations.max_date.date = this.getMaxDate();
        this.field.validations.min_date.date = this.getMinDate();
        this.field.validations.content_type.type = "date"

        return this.field;
    }
}