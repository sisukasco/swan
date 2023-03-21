'use strict';
import DFormElement from "./DFormElement";
import {DropdownValidations} from "../containers";
import "reflect-metadata"; 
import {Type} from "class-transformer";
import { NodeItem } from "@sisukas/coder-interface";
import { ExcludeEmpty } from "../lib/TxUtils";
import DItem,{getTextFromItems, getItemsJSON, itemsFromText} from "./DItem";
import {InputAttributes } from "./attribs";
import {IGroupItemSettings} from "./IGroupItemSettings"

class DropDownSettings implements IGroupItemSettings
{
    @Type(()=>DItem)
    public items:DItem[]=[];
    
    public set items_text(str_items:string)
    {
        let items;
        try{
            items = itemsFromText(str_items);
        }catch(e){
            return;
        }
        this.items = items
    }
    public get items_text()
    {
        return getTextFromItems(this.items)
    }

    public get items_json(){
        return getItemsJSON(this.items)
    }
}
export default
class DDropDown extends DFormElement
{
    @Type(()=>DropDownSettings)
    public settings = new DropDownSettings()

    @Type(() => DropdownValidations)
    @ExcludeEmpty((v)=>(v.hasValidations()))
    public readonly validations = new DropdownValidations();


    public get items():DItem[]
    {
        return this.settings.items;
    }

    constructor()
    {
        super('DropDown','Your Question Here:');
    }
    get default_value()
    {
        return('');
    }
    
    public code(node:NodeItem)
    {
        const container = node.section('form.input.container', {type: this.type, width: this.width});
        if(this.hasLabel()){        
            container.section('form.input.label', {'for':this.name}).html(this.label);
        }

        const attrs:InputAttributes = {
            name:this.name,
            id:this.name            
        }

        if(this.validations.required.enabled){
            attrs["required"]="required"
        }
        const sel = container.section('form.input.select',attrs);

        for(let i=0;i<this.items.length;i++)
        {
            const attrs:any={};
            if(i==0)
            {
                attrs.value='';
            }

            if(this.items[i].rvalue){
                attrs["r-value"]=this.items[i].rvalue;
            }
            
            sel.startTag('option', attrs).text(this.items[i].value);
        }
        container.section('form.input.error',{name:this.name});

    }
    
}
