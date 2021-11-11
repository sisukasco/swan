import {DTextbox} from "@sisukas/form-ds";
import {BaseElementParser} from "./BaseElementParser";

export class TextboxParser extends BaseElementParser
{
    private field:DTextbox=new DTextbox();
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
        this.field.validations.pattern.regexp = this.getPatternValidation();

        return this.field;
    }
}