import {DCheckboxGroup} from "@sisukas/form-ds";
import {BaseElementParser} from "./BaseElementParser";
import $ from "@sisukas/jquery";


class CheckboxItemParser extends BaseElementParser
{
    constructor(e:HTMLElement)
    {
        super(e);
    }
    public parse()
    {
        return({
            name: this.getLabel(),
            value: this.getValue()    
        })
    }
}

export class CheckboxGroupParser extends BaseElementParser
{
    private field:DCheckboxGroup=new DCheckboxGroup();
    constructor(e:HTMLElement)
    {
        super(e);
    }
    public parse()
    {
        this.field.name = this.getName();
        this.parseItems();
        return this.field;
    }
 
    private parseItems()
    {
        const e = <HTMLInputElement>this.e
        $(`[name="${e.name}"]`, this.form).each((__i,se)=>{
            let bp = new CheckboxItemParser(se)
            const p = bp.parse()
            this.field.settings.addItem(p.name, p.value)
        })
    }
}