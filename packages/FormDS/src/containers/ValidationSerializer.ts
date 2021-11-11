import "reflect-metadata";
import FormValidation from "../validations/FormValidation";
import {ExcludeEmpty} from "../utils/TxUtils";
  
export function OnlyIfEnabled(){
    return ExcludeEmpty((v:FormValidation)=>(v.is_enabled()))
}
  