import { themeParser, darkModeParser } from "./parser";
import { ColorWorker, dynamicHandler } from "./color";
import { TokenError } from "../utils/alerts";
import { globalConstant } from "types";
import type {
    ThemeWorkerInputType,
    ThemeWorkerOutputType,
    ThemeContextType
} from "types";

function ThemeWorker(
    this: ThemeContextType,
    [
        theme,
        darkMode
    ]: ThemeWorkerInputType) {

    const result: ThemeWorkerOutputType = {
        Extends: {},
        Colors: {},
        Variants: {},
        Base: { [globalConstant['root']]: {} }
    };
    const { genVariant, getBK } = darkModeParser.call(this, [darkMode, result]);

    for (const {
        name,
        value,
        mode,
        index,
        isColor,
        property
    } of themeParser.call(this, theme)) {
        try {
            const isdefault = this.defaultMode === index,
                base_key = genVariant(mode) || getBK(mode, isdefault);
            !result.Base[base_key] && !this.isMedia && (result.Base[base_key] = {});

            if (isColor && ColorWorker.call(this, {
                n: name,
                m: mode,
                arr: property,
                r: result,
                b_k: base_key,
                c: value,
                isdef: isdefault,
                bkf: getBK,
                gvf: genVariant
            })) continue;
            else if (!isColor) {
                const key: string = `--${name}`,
                    global_key: string = key + `-${mode}`,
                    key_val = `var(${key})`,
                    global_key_val = `var(${global_key})`;

                result.Base[globalConstant['root']][global_key] = value;
                !this.isMedia && (result.Base[base_key][key] = global_key_val);
                if (typeof property === "string") {
                    !result.Extends[property] && (result.Extends[property] = {});
                    result.Extends[property][name] = key_val;
                }

                dynamicHandler.call(this, {
                    bkf: getBK,
                    gvf: genVariant,
                    r: result,
                    m: mode,
                    f: { key, key_val: global_key_val }
                });

            }
        } catch (err) {
            TokenError({ name, value, mode, err: (err as Error) })
        }
    }
    return result;
};

export default ThemeWorker;

