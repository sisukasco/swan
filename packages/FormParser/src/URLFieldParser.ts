import {DURL} from "@sisukas/form-ds";
import {BaseElementParser, parseElementType} from "./BaseElementParser";

export class URLFieldParser extends BaseElementParser
{
    private field:DURL=new DURL();
    constructor(e:HTMLElement)
    {
        super(e);
        
    }
    public parse()
    {
        if(parseElementType(this.e) != "URL")
        {
            throw new Error("The type of this element is not URL!")
        }
        this.field.name = this.getName();
        this.field.label = this.getLabel();
        this.field.validations.required.enabled = this.isRequired();
        this.field.validations.maxlength.size = this.getMaxLength();
        this.field.validations.minlength.size = this.getMinLength();
        this.field.validations.content_type.type='url';
        this.field.validations.pattern.regexp = this.getPatternValidation();
        return this.field;
    }
}