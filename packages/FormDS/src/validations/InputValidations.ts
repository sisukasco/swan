import FormValidation from "./FormValidation";

interface InputValidationsMap
{
    [name:string]:FormValidation
};

export default class InputValidations
{
    public asArray():FormValidation[]
    {
        let ret:FormValidation[]=[];
        let validations_map =  <InputValidationsMap><unknown>this;
        for(let type in validations_map)
        {
            if(validations_map[type] instanceof FormValidation)
            {
                ret.push(validations_map[type]);
            }
        }
        return ret;
    }
    
    public fromArray(arr:FormValidation[])
    {
        let validations_map =  <InputValidationsMap><unknown>this;
        for(let member in validations_map)
        {
            if(validations_map[member] instanceof FormValidation)
            {
                let memname = validations_map[member].get_class_name();
                let idx = arr.findIndex(v=>(v.get_class_name() === memname) );
                if(idx >= 0){
                    validations_map[member]= arr[idx]
                }                
            }
        }
    }
    
    public enabled_validations():FormValidation[]
    {
        let arr_ret = [];
        let validations = this.asArray();
        for(let val of validations)
        {
            if(val.contained_validations.length > 0)
            {
                for(let v2 of val.contained_validations)
                {
                    if(v2.is_enabled())
                    {
                        arr_ret.push(v2);
                    }
                }
            }
            else if(val.is_enabled())
            {
                arr_ret.push(val);
            }
        }

        return arr_ret;
    }
}