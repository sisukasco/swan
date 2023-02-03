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

    
    
    
});
