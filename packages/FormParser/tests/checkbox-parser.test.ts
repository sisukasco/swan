import faker from "faker"
import $ from "@sisukas/jquery";
import {CheckboxParser} from "../src/CheckboxParser";
import { serialize } from '@sisukas/form-ds';


test("CHK100: parsing checkbox field",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Do you agree?</label>
    <input type="checkbox" required name="${direct_name}" id="direct_name"/>
    </form>
    `;
    const p = new CheckboxParser($("#direct_name")[0])
    const checkbox = p.parse();
    expect(checkbox.name).toBe(direct_name);
    expect(checkbox.label).toBe('Do you agree?');
    expect(checkbox.validations.must_check.enabled).toBe(true)
    expect(checkbox.settings.value).toBe('on');
    let strCheckbox = serialize(checkbox)
    console.log("Checkbox parsed ", strCheckbox)
    let objCheckbox = JSON.parse(strCheckbox)
    console.log("checkbox obj ", objCheckbox)
    
    //default values shouldn't be serialized
    expect(objCheckbox.settings.value).toBeUndefined()
    
})

test("CHK101: parsing checkbox field - not required",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Agree?</label>
    <input type="checkbox" value="yes" name="${direct_name}" id="direct_name"/>
    </form>
    `;
    const p = new CheckboxParser($("#direct_name")[0])
    const checkbox = p.parse();
    expect(checkbox.name).toBe(direct_name);
    expect(checkbox.label).toBe('Agree?');
    expect(checkbox.validations.must_check.enabled).toBe(false)
    expect(checkbox.settings.value).toBe('yes');
    console.log("Checkbox parsed ", serialize(checkbox))
})