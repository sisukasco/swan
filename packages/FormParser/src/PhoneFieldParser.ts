import {DPhone} from "@sisukas/form-ds";
import {BaseElementParser, parseElementType} from "./BaseElementParser";

export class PhoneFieldParser extends BaseElementParser
{
    private field:DPhone=new DPhone();
    constructor(e:HTMLElement)
    {
        super(e);
        
    }
    public parse()
    {
        if(parseElementType(this.e) != "Phone")
        {
            throw new Error("The type of this element is not Phone!")
        }
        this.field.name = this.getName();
        this.field.label = this.getLabel();
        this.field.validations.required.enabled = this.isRequired();
        this.field.validations.maxlength.size = this.getMaxLength();
        this.field.validations.minlength.size = this.getMinLength();
        this.field.validations.content_type.type='phone'
        this.field.validations.pattern.regexp = this.getPatternValidation();
        return this.field;
    }
}