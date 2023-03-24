import {CSSFramework} from "./CSSFramework"
import {BootstrapCoder} from "./BootstrapCoder"
import {CoderOptions} from "./types";
import {TailWindCoder} from "./TailwindCoder"

export class Sidekick{
    public css:CSSFramework;
    constructor(options: CoderOptions){
        if(options.cssFramework == "tailwind"){
            this.css = new TailWindCoder();
        } else /*if(options.cssFramework == "bootstrap")*/{
            this.css = new BootstrapCoder();
        }
    }
}