import {CSSFramework} from "./CSSFramework"

export class BootstrapCoder implements CSSFramework{
    inputContainerClasses(width:number):string[]{
        let colx = ''
        if (width <= 25) {
            colx = 'col-md-3'
        }
        else if (width <= 50) {
            colx = 'col-md-6'
        }
        else if (width <= 75) {
            colx = 'col-md-9'
        }
        else {
            colx = 'col-12'
        }
        
        return [colx];
    }
    labelClasses():string[]{
        return ["form-label"]
    }
    inputClasses():string[]{
        return ["w-full"]
    }
}