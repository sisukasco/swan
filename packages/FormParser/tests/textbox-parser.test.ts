import faker from "faker"
import $ from "@sisukas/jquery";
import {TextboxParser} from "../src/TextboxParser";
import { serialize } from '@sisukas/form-ds';

test("TXTBOX100: parsing textbox field",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Please enter your name</label>
    <input type="text" required name="${direct_name}" id="direct_name"/>
    </form>
    `;
    const p = new TextboxParser($("#direct_name")[0])
    const textbox = p.parse();
    expect(textbox.name).toBe(direct_name);
    expect(textbox.type).toBe("Textbox");
    expect(textbox.label).toBe("Please enter your name");
    expect(textbox.validations.required.enabled).toBe(true);
    
    let objtextbox = JSON.parse(serialize(textbox))
    console.log("textbox ", objtextbox);
    
    //Default values shouldn't go to the json
    expect(objtextbox.validations.required).toBeDefined()
    expect(objtextbox.validations.content_type).toBeUndefined()
    expect(objtextbox.validations.maxlength).toBeUndefined()
    expect(objtextbox.settings.placeholder).toBeUndefined()
    expect(objtextbox.settings.default_value).toBeUndefined()
    
    
});

function testRequiredValidation(name:string,isOn:boolean)
{
    const p = new TextboxParser($("#direct_name")[0]);
    const textbox = p.parse();
    console.log("textbox ", serialize(textbox));
    expect(textbox.name).toBe(name);
    expect(textbox.type).toBe("Textbox");
    expect(textbox.validations.required.enabled).toBe(isOn) 
}

test("VDN100: parsing required validation",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <input type="text" required name="${direct_name}" id="direct_name"/>
    </form>
    `;
    testRequiredValidation(direct_name, true)
});

test("VDN101: parsing required validation not present",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <input type="text" name="${direct_name}" id="direct_name"/>
    </form>
    `;
    
    testRequiredValidation(direct_name, false)
})

test("VDN102: parsing required validation required=required",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <input type="text" required="required" name="${direct_name}" id="direct_name"/>
    </form>
    `;
    
    testRequiredValidation(direct_name, true)
})


test("VDN103: parsing maxlength validation",()=>
{
    const direct_name = faker.random.word();
    const maxlen = 1+ faker.datatype.number(500);
    document.body.innerHTML =`
    <form id="myform">
    <input type="text" maxlength="${maxlen}" 
        name="${direct_name}" id="direct_name"/>
    </form>
    `;
    const p = new TextboxParser($("#direct_name")[0]);
    const textbox = p.parse();
    console.log("textbox ", serialize(textbox));
    expect(textbox.name).toBe(direct_name);
    expect(textbox.type).toBe("Textbox");
    expect(textbox.validations.required.enabled).toBe(false);
    expect(textbox.validations.maxlength.size).toBe(maxlen);
    expect(textbox.validations.maxlength.is_enabled()).toBe(true);
    expect(textbox.validations.minlength.is_enabled()).toBe(false);
})

test("VDN104: parsing minlength validation",()=>
{
    const direct_name = faker.random.word()
    const minlen = 1+ faker.datatype.number(500);
    document.body.innerHTML =`
    <form id="myform">
    <input type="text" minlength="${minlen}" name="${direct_name}" id="direct_name"/>
    </form>
    `;
    
    const p = new TextboxParser($("#direct_name")[0]);
    const textbox = p.parse();
    console.log("textbox ", serialize(textbox));
    expect(textbox.name).toBe(direct_name);
    expect(textbox.type).toBe("Textbox");
    expect(textbox.validations.required.enabled).toBe(false);
    expect(textbox.validations.maxlength.is_enabled()).toBe(false);
    expect(textbox.validations.minlength.size).toBe(minlen);
    expect(textbox.validations.minlength.is_enabled()).toBe(true);
    
})

test("VDN105: parsing pattern validation",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <input type="text" pattern="[0-9]{8}" name="${direct_name}" id="direct_name"/>
    </form>
    `;
    
    const p = new TextboxParser($("#direct_name")[0]);
    const textbox = p.parse();
    console.log("textbox ", serialize(textbox));
    expect(textbox.name).toBe(direct_name);
    expect(textbox.type).toBe("Textbox");
    expect(textbox.validations.pattern.regexp).toBe('[0-9]{8}');
})

test("VDN106: parsing multiple validations",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Enter your name:</label>
    <input type="text" required maxlength="20" minlength="5" pattern="[0-9]{8}" name="${direct_name}" id="direct_name"/>
    </form>
    `;
    
    const p = new TextboxParser($("#direct_name")[0]);
    const textbox = p.parse();
    console.log("textbox ", serialize(textbox));
    expect(textbox.name).toBe(direct_name);
    expect(textbox.type).toBe("Textbox");
    expect(textbox.validations.pattern.is_enabled()).toBe(true);
    expect(textbox.validations.required.is_enabled()).toBe(true);
    expect(textbox.validations.maxlength.is_enabled()).toBe(true);
    expect(textbox.validations.minlength.is_enabled()).toBe(true);
})