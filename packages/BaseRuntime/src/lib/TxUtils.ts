import "reflect-metadata";
import { TransformationType, TransformOptions, Transform } from "class-transformer";


export function ExcludeDefault(
    default_value:string|number|boolean,
    options: TransformOptions = {}
  ) {
    
    return Transform(({value,type})=>
          {
            if(type == TransformationType.CLASS_TO_PLAIN){
              if(value === default_value){
                return undefined;
              }
            }
            return value;
          }, options)
  }
  
  export function ExcludeEmpty(
    emptyFn:(v: any)=>boolean,
    options: TransformOptions = {}
  ) {
    return Transform(({value,type})=>
          {
            if(type == TransformationType.CLASS_TO_PLAIN)
            {
              if(!emptyFn(value)){
                return undefined;
              }
            }
            return value;
          }, options)
  }