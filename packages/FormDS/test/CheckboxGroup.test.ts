import DCheckboxGroup from "../src/modules/DCheckboxGroup";
import { serialize,deserialize } from "class-transformer";

describe("DCheckboxGroup", ()=>
{
    test('checkboxgroup setup', ()=>
    {
        let chkgroup = new DCheckboxGroup();
        expect(chkgroup.type).toEqual('CheckboxGroup');
    });

    test('checkboxgroup getting validations', ()=>
    {
        let chkgroup = new DCheckboxGroup();

        expect(chkgroup.validations_array.length).toEqual(3);
    });

    function make_checkbox_group():string
    {
        let chk_group = new DCheckboxGroup();
        chk_group.name = 'MyChkGroup';
        chk_group.validations.required.enabled=true;
        chk_group.validations.min_count.num = 6;
        return(serialize(chk_group));

    }

    test('CheckboxGroup serializes',()=>
    {
        let str_chk_group:string = make_checkbox_group();
        let chk_group = deserialize(DCheckboxGroup,str_chk_group );

        expect(chk_group.name).toEqual('MyChkGroup');
        expect(chk_group.validations.required.is_enabled()).toEqual(true);
        expect(chk_group.validations.min_count.is_enabled()).toEqual(true);
        expect(chk_group.validations.max_count.is_enabled()).toEqual(false);
    })

    test('chkgrp001: CheckboxGroup from JSON',()=>
    {
        let chk_group = new DCheckboxGroup();
        chk_group.name = 'Colors';

        chk_group.settings.items_text=`
        [
            {
              "name": "Red",
              "value": "red"
            },
            {
              "name": "Green",
              "value": "green"
            },
            {
              "name": "Blue",
              "value": "blue"
            },
            {
              "name": "White",
              "value": "white"
            },
            {
              "name": "Yellow",
              "value": "yellow"
            }
        ]  
        `

        expect(chk_group.settings.items[0].name).toBe("Red")
        expect(chk_group.settings.items[0].value).toBe("red")

        expect(chk_group.settings.items[1].name).toBe("Green")
        expect(chk_group.settings.items[1].value).toBe("green")

        expect(chk_group.settings.items[2].name).toBe("Blue")
        expect(chk_group.settings.items[2].value).toBe("blue")

    })
    

    test('chkgrp002: CheckboxGroup from JSON',()=>
    {
        let chk_group = new DCheckboxGroup();
        chk_group.name = 'Colors';

        chk_group.settings.items_text=`
        
        Red
        Green
        Blue
        White
        `

        expect(chk_group.settings.items[0].name).toBe("Red")
        expect(chk_group.settings.items[0].value).toBe("Red")

        expect(chk_group.settings.items[1].name).toBe("Green")
        expect(chk_group.settings.items[1].value).toBe("Green")

        expect(chk_group.settings.items[2].name).toBe("Blue")
        expect(chk_group.settings.items[2].value).toBe("Blue")

    })
    
    
    
});
