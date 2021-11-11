import DNumber from "../src/modules/DNumber";
import {serialize, deserialize} from "@sisukas/base-runtime";
import {Comparison} from "../src/validations";

describe("DNumber",()=>
{

    test('setup',()=>{
        let number_box = new DNumber();
        expect(number_box.type).toEqual('Number');
    });
    
    test('getting validations',()=>
    {
        let numberbox = new DNumber();
        
        expect(numberbox.validations_array.length).toEqual(4);
    });
    
    function make_number_element()
    {
        let number_box =  new DNumber();
        number_box.name = 'Num1';
        number_box.validations.required.enabled=true;
        number_box.validations.max.num = 1000;
        return serialize(number_box);
    }
    
    test('NUM002: serializes a number element and ExcludeDefault works',()=>
    {
        let number =  new DNumber();
        number.name = 'Num1'
        number.validations.required.enabled=true;
        
        let str_number = serialize(number);
        console.log("strnumber ", str_number)
        
        //Exclude Default should work 
        expect(str_number).not.toContain("placeholder")
        expect(str_number).not.toContain("default_value")
        expect(str_number).not.toContain("default_value")
        expect(str_number).not.toContain("comparisons")
        expect(str_number).not.toContain("max")
        expect(str_number).not.toContain("min")
        expect(str_number).toContain("required")
        
    })
    
    test('serializes a number element',()=>
    {
        let str_number = make_number_element();
        let num_elmnt = deserialize(DNumber, str_number);
    
        expect(num_elmnt.name).toEqual('Num1');
        expect(num_elmnt.validations.required.is_enabled()).toEqual(true);
        expect(num_elmnt.validations.max.is_enabled()).toEqual(true);
        expect(num_elmnt.validations.min.is_enabled()).toEqual(false);
        
    })
    
    function make_number_element_with_comparisons()
    {
        let number_box =  new DNumber();
        number_box.name = 'Num1';
        number_box.validations.comparisons.add(new Comparison('>', 'num2'));
        number_box.validations.comparisons.add(new Comparison('=', 'num3'));
        return serialize(number_box);
    }
    
    test("serializes comparison validations",()=>
    {
        let str_num = make_number_element_with_comparisons();
        let num_elmnt = deserialize(DNumber, str_num);
    
        expect(num_elmnt.name).toEqual('Num1');
        expect(num_elmnt.validations.comparisons.is_enabled()).toEqual(true);
        expect(num_elmnt.validations.comparisons.comparisons[0].is_enabled()).toEqual(true);
        expect(num_elmnt.validations.required.is_enabled()).toEqual(false);
        expect(num_elmnt.validations.max.is_enabled()).toEqual(false);
    
        expect(num_elmnt.enabled_validations.length).toEqual(2);
    
        expect(num_elmnt.enabled_validations[0].is_enabled()).toEqual(true);
    });

    
});

