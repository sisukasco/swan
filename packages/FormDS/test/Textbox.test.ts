import { CodeGen } from './../src/coder/CodeGen';
import {generateCode} from '@sisukas/coder'
import DTextbox from "../src/modules/DTextbox";
import {serialize, deserialize} from "class-transformer";

describe("DTextbox",()=>
{
    test('setup',()=>{
        let txtbox = new DTextbox();
        expect(txtbox.type).toEqual('Textbox');
    });
    
    test('getting validations',()=>
    {
        let txtbox = new DTextbox();
        
        expect(txtbox.validations_array.length).toEqual(7);
        expect(txtbox.enabled_validations.length).toEqual(0);
    });
    
    test('updates validations',()=>
    {
        let txtbox = new DTextbox();
        txtbox.validations.required.enabled = true;
        txtbox.validations.maxlength.size =1024;
    
        //expect(txtbox.validations.maxlength.message).toEqual('The value exceeds max length 1024');
        expect(txtbox.validations.maxlength.is_enabled()).toEqual(true);
        expect(txtbox.validations.minlength.is_enabled()).toEqual(false);
        expect(txtbox.validations.required.is_enabled()).toEqual(true);
    
        expect(txtbox.enabled_validations.length).toEqual(2);
        
    });
    
    function make_textbox():string
    {
        let txtbox = new DTextbox();
        txtbox.name = 'Name';
        txtbox.validations.required.enabled = true;
        txtbox.validations.maxlength.size =1024;
        txtbox.validations.minlength.size =10;
        return serialize(txtbox);
    }
    
    test('serializes elements and validations',()=>
    {
        let str_tb = make_textbox();
    
        let txtbox = deserialize(DTextbox, str_tb);
        //let strTxtBox = JSON.stringify(txtbox);
    
        //console.log("Textbox\n",str_tb, "\n txtbox ", txtbox);
    
        //expect(txtbox.validations.maxlength.message).toEqual('The value exceeds max length 1024');
        expect(txtbox.validations.maxlength.is_enabled()).toEqual(true);
        expect(txtbox.validations.minlength.is_enabled()).toEqual(true);
        expect(txtbox.validations.required.is_enabled()).toEqual(true);
    });

    

   /*
   TODO: fix the compilation errors
    test("Textbox XSS checks",()=>
    {
        let txtbox = new DTextbox();
        txtbox.name = 'address';
        txtbox.settings.placeholder=`<script> alert("xss")</script>`;

        const context = makeCoder();

        txtbox.code(context.rootNode);

        const html_code = generateCode(context).getCombinedCode(['html']);
        
        //console.log("Textbox html", html_code);

        expect(html_code).toContain(`placeholder="&lt;script&gt; alert(&quot;xss&quot;)&lt;/script&gt;"`);
        
    });
    */

    /*
    test("Textbox Code generation",()=>
    {
        let txtbox = new DTextbox();
        txtbox.name = 'name';

        const context = makeCoder();
        
        txtbox.code(context.rootNode);

        const html_code = generateCode(context).getCombinedCode(['html']);

        //console.log("Textbox html", html_code);

       // expect(html_code).toContain(`v-model="form_data.name"`);
        expect(html_code).toContain(`id="name"`);
        expect(html_code).toContain(`name="name"`);
    });


    test("Textbox valdation code generation",()=>
    {
        let txtbox = new DTextbox();
        txtbox.name = 'first_name';

        txtbox.validations.required.enabled = true;
        txtbox.validations.maxlength.size =1024;
        txtbox.validations.minlength.size =10;

        let validation_code = txtbox.validation_code;
        //console.log("textbox validation code", validation_code);

        expect(validation_code).toContain(`.isRequired()`);
        expect(validation_code).toContain(`.checkMaxLength(1024)`);
        expect(validation_code).toContain(`.checkMinLength(10)`);
    })

    */

    test("TXTCODE001: Textbox codegen ",()=>{
        let txtbox = new DTextbox();
        txtbox.name = 'first_name';

        const codegen = new CodeGen(txtbox)

        const genCode = generateCode(codegen)

        const code = genCode.getHTMLCode(true)
        console.log("generated code ", code)
    })
    
});
