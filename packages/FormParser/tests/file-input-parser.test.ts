import faker from "faker"
import $ from "@sisukas/jquery";
import {FileInputParser} from "../src/FileInputParser";
import { serialize } from '@sisukas/form-ds';

test("FILE1: parsing file input field",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Upload Photo:</label>
    <input type="file" required name="${direct_name}" id="direct_name"/>
    </form>
    `;
    const p = new FileInputParser($("#direct_name")[0])
    const fi = p.parse();
    expect(fi.name).toBe(direct_name);
    expect(fi.type).toBe("SimpleFileUpload");
    expect(fi.label).toBe("Upload Photo:");
    expect(fi.validations.required.enabled).toBe(true);
    console.log("file upload box ", serialize(fi));
});

test("FILE2: parsing file input with validations",()=>
{
    const direct_name = faker.random.word()
    document.body.innerHTML =`
    <form id="myform">
    <label for="direct_name">Upload Photo:</label>
    <input type="file" accept="*.jpg, *.png" name="${direct_name}" id="direct_name"/>
    </form>
    `;
    const p = new FileInputParser($("#direct_name")[0])
    const fi = p.parse();
    expect(fi.name).toBe(direct_name);
    expect(fi.type).toBe("SimpleFileUpload");
    expect(fi.label).toBe("Upload Photo:");
    expect(fi.validations.required.enabled).toBe(false);
    expect(fi.validations.file_extension.valid_extensions).toBe("*.jpg, *.png");
    console.log("file upload box ", serialize(fi));
});
