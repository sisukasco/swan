import DDropDown from "../src/modules/DDropDown";
import { serialize,deserialize } from "class-transformer";
import faker from "faker";
import DItem from '../src/modules/DItem';

describe("DDropdown",()=>
{
    test("Dropdown setup", ()=>
    {
        let dropdown = new DDropDown;
        expect(dropdown.type).toEqual('DropDown');
    });
    
    test("Dropdown gettng validations", ()=>
    {
        let dropdown = new DDropDown;
    
        expect(dropdown.validations_array.length).toEqual(1);
    });
    
    function make_dropdown():string
    {
        let dropdown = new DDropDown();
        dropdown.name = 'Dropdown1';
        dropdown.validations.required.enabled=true;
    
        return(serialize(dropdown)); 
    }
    
    test('DropDown serializes correct',()=>
    {
        let strDropdown= make_dropdown();
        let dropdown = deserialize(DDropDown, strDropdown);
    
        expect(dropdown.name).toEqual('Dropdown1');
        expect(dropdown.validations.required.is_enabled()).toEqual(true);
    
    });
    
    test("DropDown get items when empty", ()=>
    {
        let dropdown = new DDropDown();
        dropdown.settings.items_text=""
        
        console.log("dropdown items", dropdown.items);
        expect(dropdown.items).toStrictEqual([]);
    
    });

    test("DropDown get items trimming", ()=>
    {
        let dropdown = new DDropDown();
        dropdown.settings.items_text=" Select \n my item 1    \n my item 2"
        
        console.log("dropdown items", dropdown.items);
        expect(dropdown.items.length).toEqual(3);
        expect(dropdown.items[0].value).toEqual('Select');
        expect(dropdown.items[1].value).toEqual('my item 1');
        
        expect(dropdown.items[0].name).toEqual('Select');
        expect(dropdown.items[1].name).toEqual('my item 1');        
    });

    test("DropDown set items ", ()=>
    {
        let dropdown = new DDropDown();
        for(let i=0; i< 5; i++)
        {
            const v = faker.random.word()
            dropdown.settings.items.push(new DItem(v,v));
        }
        console.log("dropdown items\n", dropdown.settings.items_text);
        
    })

});
