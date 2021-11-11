import DRadioButton from "../src/modules/DRadioButton";
import {serialize, deserialize} from "@sisukas/base-runtime";

describe("DRadioButton", ()=>
{

    test('setup',()=>{
        let radiobutton = new DRadioButton();
        expect(radiobutton.type).toEqual('RadioButton');
    });
    
    test('getting validations',()=>
    {
        let radiobutton = new DRadioButton();
        
        expect(radiobutton.validations_array.length).toEqual(3);
        expect(radiobutton.enabled_validations.length).toEqual(0);
    });
    
    test('update validations', ()=>
    {
        let radiobutton = new DRadioButton();
        radiobutton.validations.required.enabled=true;
        radiobutton.validations.should_select.item = 'I agree';
        expect(radiobutton.validations.required.is_enabled()).toEqual(true);
        expect(radiobutton.validations.should_select.is_enabled()).toEqual(true);
        expect(radiobutton.validations.should_not_select.is_enabled()).toEqual(false);
    
        expect(radiobutton.enabled_validations.length).toEqual(2);
    })
    
    function make_radio_group():string
    {
        let radio_group=new DRadioButton();
        radio_group.name = 'Do_you_agree';
        radio_group.validations.required.enabled=true;
        radio_group.validations.should_not_select.item='I do not agree';
        radio_group.settings.items=[{name:'I Agree', value:'I Agree'}, {name:'I do not agree', value:'I Agree'}];
    
        return serialize(radio_group);
    }
    
    test('radio group serializes', ()=>
    {
       let str_radio_group = make_radio_group();
       let radio_obj = deserialize(DRadioButton, str_radio_group);
       
       expect(radio_obj.name).toEqual('Do_you_agree');
       expect(radio_obj.validations.required.is_enabled()).toEqual(true);
       expect(radio_obj.validations.should_not_select.is_enabled()).toEqual(true);
       expect(radio_obj.settings.items[0].name).toEqual('I Agree');
    })

    
});

