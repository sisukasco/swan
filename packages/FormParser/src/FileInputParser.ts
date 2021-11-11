import {DSimpleFileUpload} from "@sisukas/form-ds";
import {BaseElementParser} from "./BaseElementParser";

export class FileInputParser extends BaseElementParser
{
    private field:DSimpleFileUpload=new DSimpleFileUpload();
    constructor(e:HTMLElement)
    {
        super(e);
    }
    public parse()
    {
        this.field.name = this.getName();
        this.field.label = this.getLabel();
        this.field.validations.required.enabled = this.isRequired();
        this.field.validations.file_extension.valid_extensions = this.getValidFileTypes()
        return this.field;
    }
    protected getValidFileTypes()
    {
        var attr = this.$e.attr('accept');
        
        if (attr === undefined )
        {
            return '';
        }
        return attr;
    }
}