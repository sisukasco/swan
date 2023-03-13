import DRadioButton from "../src/modules/DRadioButton";
import {serialize, deserialize } from "class-transformer";

import { DElementContainer} from "../src/lib";

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
  
        radio_group.settings.items_text= `
        I Agree
        I do not agree
        `
        
    
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

    test('radio001: radio group get values as  json',()=>{
        let radio_group=new DRadioButton();
        radio_group.name = 'Colors';

        radio_group.settings.items_text = `
        Red
        Green
        Blue
        White
        Yellow
        `

        const strItems = radio_group.settings.items_json

        const itms = JSON.parse(strItems)

        expect(itms[0].name).toBe("Red")
        expect(itms[0].value).toBe("Red")

        expect(itms[1].name).toBe("Green")
        expect(itms[1].value).toBe("Green")

    })

    test('radio002: parse from json',()=>{
        let radio_group=new DRadioButton();
        radio_group.name = 'Colors';

        radio_group.settings.items_text = `
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


        expect(radio_group.settings.items[0].name).toBe("Red")
        expect(radio_group.settings.items[0].value).toBe("red")

        expect(radio_group.settings.items[1].name).toBe("Green")
        expect(radio_group.settings.items[1].value).toBe("green")
    })


    test("radser001: serialize DRadioButton element", ()=>{
      let elements_container = new DElementContainer();
      let vRadioButton = elements_container.add("RadioButton")
      let radioButtonElmnt = <DRadioButton><unknown>vRadioButton.elmnt
      
      radioButtonElmnt.name = 'Colors';

      radioButtonElmnt.settings.items_text = `
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
  
      const vRadioElmntClone = elements_container.clone(vRadioButton)

      const serRadioElement = serialize(vRadioElmntClone.elmnt)
  
      const objRadioElmnt = JSON.parse(serRadioElement)

      expect(objRadioElmnt.settings.items[0]).not.toBe(undefined)
      
      /** 
       ** The correct serialization will skip the default 
       ** value and will produce items list without rvalue 
      */
      expect(objRadioElmnt.settings.items[0].rvalue).toBe(undefined)

      expect(objRadioElmnt.settings.items[1].rvalue).toBe(undefined)

      expect(objRadioElmnt.settings.items[2].rvalue).toBe(undefined)

  })    


    
});

