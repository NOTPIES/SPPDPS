import { green, gray, red, magenta, yellow } from "colorette";
import { IS_DEBUG, PROJECT_NAME } from "./Constants";

export function msg(Content: string, Prefix = PROJECT_NAME) {
    console.log(`${gray(new Date().toISOString())} [${green(Prefix)}] ${Content}`);
}

export function err(Content: string, Prefix = PROJECT_NAME) {
    console.log(`${gray(new Date().toISOString())} [${red("ERROR | " + Prefix)}] ${Content}`);
}

export function warn(Content: string, Prefix = PROJECT_NAME) {
    console.log(`${gray(new Date().toISOString())} [${yellow("WARNING | " + Prefix)}] ${Content}`);
}

export function dbg(Content: string, Prefix = PROJECT_NAME) {
    if (!IS_DEBUG) return;
    console.log(`${gray(new Date().toISOString())} [${magenta("DEBUG | " + Prefix)}] ${Content}`);
}