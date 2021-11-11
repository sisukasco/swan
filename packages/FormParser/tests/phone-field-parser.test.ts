import faker from "faker"
import $ from "@sisukas/jquery";
import {PhoneFieldParser} from "../src/PhoneFieldParser";
import { serialize } from '@sisukas/form-ds';

test("PHONE1: parsing phone field",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Please enter phone</label>
    <input type="tel" required name="${direct_name}" id="direct_name"/>
    </form>
    `;
    const p = new PhoneFieldParser($("#direct_name")[0])
    const phonebox = p.parse();
    expect(phonebox.name).toBe(direct_name);
    expect(phonebox.type).toBe("Phone");
    expect(phonebox.label).toBe("Please enter phone");
    expect(phonebox.validations.required.enabled).toBe(true);
    expect(phonebox.validations.content_type.type).toBe("phone");
    expect(phonebox.validations.content_type.is_enabled()).toBe(true);
    console.log("phonebox ", serialize(phonebox));
});


test("PHONE2: parsing phone field - not required field",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Please enter phone</label>
    <input type="tel"  name="${direct_name}" id="direct_name"/>
    </form>
    `;
    const p = new PhoneFieldParser($("#direct_name")[0])
    const phonebox = p.parse();
    expect(phonebox.name).toBe(direct_name);
    expect(phonebox.type).toBe("Phone");
    expect(phonebox.label).toBe("Please enter phone");
    expect(phonebox.validations.required.enabled).toBe(false);
    expect(phonebox.validations.required.is_enabled()).toBe(false);
    expect(phonebox.validations.content_type.type).toBe("phone");
    expect(phonebox.validations.content_type.is_enabled()).toBe(true);
    console.log("phonebox ", serialize(phonebox));
});
