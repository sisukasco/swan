import DRadioButton from "./DRadioButton";
import DCheckboxGroup from "./DCheckboxGroup";
import { Sidekick } from '../coder/Sidekick';

import { NodeItem } from "@sisukas/coder-interface";

interface ChoiceItem
{
    name:string;
    value?:string;
}


export default class GroupChoice
{
    constructor(private elmnt:DCheckboxGroup|DRadioButton, private type:"checkbox"|"radio") 
    {
        
    }
    code(coder:NodeItem, sidekick: Sidekick)
    {

        const container = coder.startTag('div', {class: sidekick.css.inputContainerClasses(this.elmnt.width)})

        //const container = node.section('form.input.container', { width: this.elmnt.width});
        //container.section('form.group.label').html(this.elmnt.label);

        if(this.elmnt.label && this.elmnt.label.trim().length > 0){
            container
              .startTag('label')
              .html(this.elmnt.label);
        }

        let gcontainer = container.startTag('div', {class: sidekick.css.groupContainerClasses(this.elmnt.settings.arrangement)})

        //let gcontainer = container.section('form.group.container', 
        // { arrangement: this.elmnt.settings.arrangement});

        for(let i=0;i<this.elmnt.settings.items.length;i++)
        {
            this.item_code(this.elmnt.settings.items[i],i, gcontainer, sidekick);
        }

        coder.style(this.style());
    }

    private item_code(item:ChoiceItem,idx:number, container:NodeItem, sidekick: Sidekick)
    {
        let id = this.elmnt.name+'_'+idx;
        let value = item.value?item.value:item.name;

        let item_container =  container.startTag('div',{ class: sidekick.css.groupItemContainerClasses(this.elmnt.settings.arrangement) })
        // let item_container = 
        // container.section('form.group.item.container',{ arrangement: this.elmnt.settings.arrangement });

        item_container.startTag('input', {type:this.type, name:this.elmnt.name,value, id, class: sidekick.css.inputCheckboxClasses()})
        //item_container
        //    .section('form.input.input', {type:this.type, name:this.elmnt.name,value, id});
        
        item_container.startTag('label',{ class: sidekick.css.labelCheckboxClasses(), "for":id} ).html(item.name)
        //item_container.section('form.input.label', {type:"checkbox", "for":id} ).html(item.name);
    }


    public style()
    {
        return(
            `.sim-group-label
            {
                display:block;
            }
            .sim-group-item.sim-check-vertical
            {
                margin-bottom:0.5rem;
            }
            .sim-group-item.form-check-inline
            {
                margin-right:1rem;
            }`       
        );
    }
}