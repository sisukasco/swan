import DCheckbox from "../src/modules/DCheckbox";
import {serialize, deserialize} from "class-transformer";


describe("DCheckbox", ()=>
{
    test('setup',()=>
    {
        let chkbox = new DCheckbox();
        expect(chkbox.type).toEqual('Checkbox');
    });
    
    test('getting validations',()=>
    {
        let checkbox = new DCheckbox();
    
        checkbox.validations.must_check.enabled =true;
        
        expect(checkbox.validations.must_check.is_enabled()).toEqual(true);
    });
    
    function make_checkbox():string
    {
        let checkbox = new DCheckbox();
        checkbox.name = 'MyCheckbox';
        checkbox.validations.must_check.enabled = true;
        return( serialize(checkbox));
    }
    test("checkbox serializes element and validations",()=>
    {
        let strCheckbox = make_checkbox();
    
        let checkbox = deserialize(DCheckbox, strCheckbox);
    
        expect(checkbox.name).toEqual('MyCheckbox');
        expect(checkbox.validations.must_check.is_enabled()).toEqual(true);
    });

    
});
