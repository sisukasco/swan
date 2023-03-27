import { generateHTMLCode } from './../src/coder/CodeGen';
import DLabel from "../src/elements/DLabel"

test('LABEL001: code generation bootstrap',()=>
{
    let label = new DLabel();

    label.settings.content = "My Label";
    label.settings.alignment = "left"
    
    const code = generateHTMLCode(label, {cssFramework:"bootstrap", breakpoint:"md"})

    expect(code).toContain("<label>My Label</label>")

    console.log("generated code ", code)    
});

test('LABEL002: code generation tailwind',()=>
{
    let label = new DLabel();

    label.settings.content = "My Label";
    label.settings.alignment = "left"
    
    const code = generateHTMLCode(label, {cssFramework:"tailwind", breakpoint:"md"})

    expect(code).toContain("<label>My Label</label>")

    console.log("generated code ", code)    
});
