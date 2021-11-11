import DEmail from "../src/modules/DEmail";
import {serialize, deserialize} from "@sisukas/base-runtime";

describe('DEmail',()=>
{
    test('setup',()=>{
        let email = new DEmail();
        expect(email.type).toEqual('Email');
    });
    
    test('getting validations',()=>
    {
        let email = new DEmail();
        
        expect(email.validations_array.length).toEqual(6);
    });
    
    function make_email():string
    {
        let email = new DEmail();
        email.name = 'Email1';
        email.validations.required.enabled=true;
        email.validations.minlength.size = 5;
        return serialize(email);
    }
    
    test("DEmail serializes correctly", ()=>
    {
        let str_email = make_email();
        let email = deserialize(DEmail, str_email);
        expect(email.name).toEqual('Email1');
        expect(email.validations.required.is_enabled()).toEqual(true);
        expect(email.validations.minlength.is_enabled()).toEqual(true);
        expect(email.validations.maxlength.is_enabled()).toEqual(false);
    
    });

    
});
