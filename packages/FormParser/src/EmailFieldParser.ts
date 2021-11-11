import {DEmail} from "@sisukas/form-ds";
import {BaseElementParser, parseElementType} from "./BaseElementParser";

export class EmailFieldParser extends BaseElementParser
{
    private field:DEmail=new DEmail();
    constructor(e:HTMLElement)
    {
        super(e);
        
    }
    public parse()
    {
        if(parseElementType(this.e) != "Email")
        {
            throw new Error("The type of this element is not email!")
        }
        this.field.name = this.getName();
        this.field.label = this.getLabel();
        this.field.validations.required.enabled = this.isRequired();
        this.field.validations.maxlength.size = this.getMaxLength();
        this.field.validations.minlength.size = this.getMinLength();
        this.field.validations.content_type.type='email'
        return this.field;
    }
}