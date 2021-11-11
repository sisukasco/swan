
import $ from "@sisukas/jquery";

import {DItem, DDropDown} from "@sisukas/form-ds";

import {BaseElementParser} from "./BaseElementParser";

//TODO: set a max number of items that will be parsed, to avoid overflows

export class DropDownParser extends BaseElementParser{
    
    private field:DDropDown = new DDropDown();
    
    constructor(e:HTMLElement)
    {
        super(e);
    }
    public parse()
    {
        this.field.name = this.getName();
        this.field.label = this.getLabel();
        this.field.validations.required.enabled = this.isRequired();
        this.field.settings.items = []
        $("option", this.$e).each((__i,opt)=>{
            let name = $(opt).text();
            let v = $(opt).attr("value")
            if(v === undefined)
            {
                v = name;
            }
            let itm = new DItem(name, v);
            this.field.settings.items.push(itm);
        })
        
        return this.field;
    }
}