'use strict';
import DFormElement from "./DFormElement";
import {DropdownValidations} from "../containers";
import "reflect-metadata"; 
import {Type} from "class-transformer";
import { NodeItem, Attributes } from "@sisukas/coder-interface";
import { ExcludeEmpty } from "../lib/TxUtils";
import DItem,{getTextFromItems, getItemsJSON, itemsFromText} from "./DItem";
import {IGroupItemSettings} from "./IGroupItemSettings"
import { Sidekick } from '../coder/Sidekick';

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
    
    public code(coder:NodeItem, sidekick: Sidekick)
    {
        const container = coder.startTag('div', {class: sidekick.css.inputContainerClasses(this.width)})

        if(this.hasLabel()){
            container
              .startTag('label', { for: this.name, class: sidekick.css.labelClasses() })
              .html(this.label);
        }

        const attrs:Attributes = {
            class: sidekick.css.selectFieldClasses(),
            name:this.name,
            id:this.name            
        }

        if(this.validations.required.enabled){
            attrs["required"]="required"
        }
        const sel = container.startTag('select', attrs)
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

    }
    
}
