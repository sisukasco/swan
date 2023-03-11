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
        
        expect(dropdown.items).toStrictEqual([]);
    
    });

    test("dd0012: DropDown get items trimming", ()=>
    {
        let dropdown = new DDropDown();
        dropdown.settings.items_text=" Select \n my item 1    \n my item 2"
        
        expect(dropdown.items.length).toEqual(3);
        expect(dropdown.items[0].value).toEqual('Select');
        expect(dropdown.items[1].value).toEqual('my item 1');
        
        expect(dropdown.items[0].name).toEqual('Select');
        expect(dropdown.items[1].name).toEqual('my item 1');        
    });

    test("dd001: DropDown set items ", ()=>
    {
        let dropdown = new DDropDown();
        let words:string[] = []
        for(let i=0; i< 5; i++)
        {
            const v = faker.random.word()
            words.push(v)
            dropdown.settings.items.push(new DItem(v,v));
        }
        const text = dropdown.settings.items_text

        const items = text.split(/\r?\n/)
        expect(items[0]).toBe(words[0])
        expect(items[1]).toBe(words[1])
    })

});
