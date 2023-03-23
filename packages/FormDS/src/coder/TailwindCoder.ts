import {CSSFramework} from "./CSSFramework"

export class TailWindCoder implements CSSFramework{

    inputContainerClasses(width:number){
        let colx = ''
        if (width <= 25) {
            colx = 'w-1/4'
        }
        else if (width <= 50) {
            colx = 'w-1/2'
        }
        else if (width <= 75) {
            colx = 'w-3/4'
        }
        else {
            colx = 'w-full'
        }
        return [colx];
    }

    labelClasses():string[]{
        return ["block"]
    }
    inputClasses():string[]{
        return ["w-full"]
    }

}