import faker from "faker"
import $ from "@sisukas/jquery";
import {EmailFieldParser} from "../src/EmailFieldParser";
import { serialize } from '@sisukas/form-ds';

test("EMAIL100: parsing email field",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Please enter email</label>
    <input type="email" required name="${direct_name}" id="direct_name"/>
    </form>
    `;
    const p = new EmailFieldParser($("#direct_name")[0])
    const emailbox = p.parse();
    expect(emailbox.name).toBe(direct_name);
    expect(emailbox.type).toBe("Email");
    expect(emailbox.label).toBe("Please enter email");
    expect(emailbox.validations.required.enabled).toBe(true);
    expect(emailbox.validations.content_type.type).toBe("email");
    expect(emailbox.validations.content_type.is_enabled()).toBe(true);
    console.log("emailbox ", serialize(emailbox));
});


test("EMAIL101: parsing email field - not required field",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Please enter email</label>
    <input type="email"  name="${direct_name}" id="direct_name"/>
    </form>
    `;
    const p = new EmailFieldParser($("#direct_name")[0])
    const emailbox = p.parse();
    expect(emailbox.name).toBe(direct_name);
    expect(emailbox.type).toBe("Email");
    expect(emailbox.label).toBe("Please enter email");
    expect(emailbox.validations.required.enabled).toBe(false);
    expect(emailbox.validations.required.is_enabled()).toBe(false);
    expect(emailbox.validations.content_type.type).toBe("email");
    expect(emailbox.validations.content_type.is_enabled()).toBe(true);
    console.log("emailbox ", serialize(emailbox));
});

test("EMAIL102: parsing maxlength validation",()=>
{
    const direct_name = faker.random.word();
    const maxlen = 1+ faker.random.number(500);
    document.body.innerHTML =`
    <form id="myform">
    <input type="email" maxlength="${maxlen}" 
        name="${direct_name}" id="direct_name"/>
    </form>
    `;
    const p = new EmailFieldParser($("#direct_name")[0]);
    const emailbox = p.parse();
    console.log("emailbox ", serialize(emailbox));
    expect(emailbox.name).toBe(direct_name);
    expect(emailbox.type).toBe("Email");
    expect(emailbox.validations.required.enabled).toBe(false);
    expect(emailbox.validations.maxlength.size).toBe(maxlen);
    expect(emailbox.validations.maxlength.is_enabled()).toBe(true);
    expect(emailbox.validations.minlength.is_enabled()).toBe(false);
})

test("VDN104: parsing minlength validation",()=>
{
    const direct_name = faker.random.word()
    const minlen = 1+ faker.random.number(500);
    document.body.innerHTML =`
    <form id="myform">
    <input type="email" minlength="${minlen}" name="${direct_name}" id="direct_name"/>
    </form>
    `;
    
    const p = new EmailFieldParser($("#direct_name")[0]);
    const emailbox = p.parse();
    console.log("emailbox ", serialize(emailbox));
    expect(emailbox.name).toBe(direct_name);
    expect(emailbox.type).toBe("Email");
    expect(emailbox.validations.required.enabled).toBe(false);
    expect(emailbox.validations.maxlength.is_enabled()).toBe(false);
    expect(emailbox.validations.minlength.size).toBe(minlen);
    expect(emailbox.validations.minlength.is_enabled()).toBe(true);
    
})