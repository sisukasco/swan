import DCalculationField from "../src/modules/DCalculationField";
import {serialize, deserialize} from "@sisukas/base-runtime";

test('setup',()=>{
    let calcfield = new DCalculationField();
    expect(calcfield.type).toEqual('CalculationField');
});

test('getting validations',()=>
{
    let calcfield = new DCalculationField();
    
    expect(calcfield.validations_array.length).toEqual(2);
});

test('update validations',()=>
{
    let calcfield = new DCalculationField();

    expect(calcfield.validations.min.is_enabled()).toEqual(false);
    expect(calcfield.validations.max.is_enabled()).toEqual(false);

    calcfield.validations.min.num = 100;
    calcfield.validations.max.num = 100;
    
    expect(calcfield.validations.min.is_enabled()).toEqual(true);
    expect(calcfield.validations.max.is_enabled()).toEqual(true);
});

function make_calc_field():string
{
    let calcfield = new DCalculationField();
    calcfield.name = "TheCalcField";
    calcfield.validations.min.num = 200;
    calcfield.validations.max.num = 200;
    return serialize(calcfield);
}

test("calcfield serializes element and validations",()=>
{
    let str_field = make_calc_field();
    let calc_field = deserialize(DCalculationField, str_field); 

    expect(calc_field.validations.min.is_enabled()).toEqual(true);
    expect(calc_field.validations.max.is_enabled()).toEqual(true);
});