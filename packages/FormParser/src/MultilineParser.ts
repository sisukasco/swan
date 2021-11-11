import {DMultiline} from "@sisukas/form-ds";
import {BaseElementParser} from "./BaseElementParser";

export class MultilineParser extends BaseElementParser
{
    private field:DMultiline=new DMultiline();
    constructor(e:HTMLElement)
    {
        super(e);
    }
    public parse()
    {
        this.field.name = this.getName();
        this.field.label = this.getLabel();
        this.field.validations.required.enabled = this.isRequired();
        this.field.validations.maxlength.size = this.getMaxLength();
        this.field.validations.minlength.size = this.getMinLength();

        return this.field;
    }
}