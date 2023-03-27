import { generateHTMLCode } from './../src/coder/CodeGen';
import DSubmitButton from "../src/modules/DSubmitButton";

test('BUTTON001: code generation bootstrap',()=>
{
    let button = new DSubmitButton();

    button.settings.label = "Submit"
    button.settings.alignment = "right"
    
    const code = generateHTMLCode(button, {cssFramework:"bootstrap", breakpoint:"md"})

    expect(code).toContain(`type="submit"`)

    console.log("generated code ", code)    
});

test('BUTTON002: code generation tailwind',()=>
{
    let button = new DSubmitButton();

    button.settings.label = "Submit"
    button.settings.alignment = "right"
    
    const code = generateHTMLCode(button, {cssFramework:"tailwind", breakpoint:"md"})

   // expect(code).toContain(`type="submit"`)

    console.log("generated code ", code)    
});