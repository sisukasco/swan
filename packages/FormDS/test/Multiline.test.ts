import DMultiline from "../src/modules/DMultiline";
import {serialize, deserialize} from "class-transformer";

describe("DMultiline",()=>
{
    test('setup',()=>{
        let txtbox = new DMultiline();
        expect(txtbox.type).toEqual('Multiline');
    });
    
    test('getting validations',()=>
    {
        let txtbox = new DMultiline();
        
        expect(txtbox.validations_array.length).toEqual(3);
    });
    
    function make_multiline():string
    {
        let multiline = new DMultiline();
        multiline.name ="MultilineTextBox1";
    
        multiline.validations.required.enabled = true;
    
        multiline.validations.minlength.size = 100;
        return serialize(multiline);
    }
    
    test('Multiline serializes',()=>
    {
        let str_txtbox = make_multiline();
    
        let txtbox = deserialize(DMultiline, str_txtbox);
        expect(txtbox.validations.required.is_enabled()).toEqual(true);
        expect(txtbox.validations.minlength.is_enabled()).toEqual(true);
        expect(txtbox.validations.maxlength.is_enabled()).toEqual(false);
    
    })

    
});
