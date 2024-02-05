export * from "./modules"
export * from "./lib"
export * from "./elements"
export * from "./coder"
import { instanceToInstance } from "class-transformer"

export function classToClass(inobj:any):any{
    return instanceToInstance(inobj)
}

export {Type, 
    Exclude, 
    classToPlain,
    plainToClass, 
    
    plainToClassFromExist, 
    serialize, 
    Transform, 
    TransformationType,
    deserialize} from "class-transformer";

