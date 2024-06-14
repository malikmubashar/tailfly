import { ColorTranslator } from "colortranslator";
import { variantTemplates } from "./parser";
import { globalConstant } from "types";
import type {
    ThemeWorkerObjectType,
    ColorWorkerInputType,
    colorWorkerSetterType,
    colorFormatOutputType,
    colorFormatInputType,
    dynamicHandlerInputType,
    ThemeContextType
} from "types";
const subClr = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
function colorFormat([n, h, cd, m, isdef, s]: colorFormatInputType): colorFormatOutputType | undefined {
    if (!Array.isArray(cd) || cd.length < 2) return;
    const key = s ? `--${n}-${s}-hsl` : `--${n}-hsl`, global_key = key + `-${m}`;

    return {
        key,
        global_key,
        global_key_val: `${h} ${cd[0]}% ${cd[1]}%`,
        key_val: `var(${global_key})`,
        color_val: `hsl(var(${key}))`,
        f_color_key: (s || n) + globalConstant["modeSelSep"] + m,
        f_color_val: `hsl(var(${global_key}))`,
        def_color_key: isdef ? globalConstant['modeDefSel'] + (s ? `${n}-${s}` : n) : "",
        def_color_val: isdef ? `hsl(var(${global_key}))` : ""
    }
}

function colorWorkerSetter(this: ThemeContextType, { n, cf, r, b_k, subn }: colorWorkerSetterType) {
    if (!cf) return;
    r.Base[globalConstant["root"]][cf.global_key] = cf.global_key_val;
    !this.isMedia && (r.Base[b_k][cf.key] = cf.key_val);
    !(n in r.Colors) && (r.Colors[n] = {});
    (r.Colors[n] as ThemeWorkerObjectType)[subn] = cf.color_val;
    cf.def_color_key !== "" && (r.Colors[cf.def_color_key] = cf.def_color_val);
    subn === "DEFAULT" ? (r.Colors[cf.f_color_key] = cf.f_color_val) : ((r.Colors[n] as ThemeWorkerObjectType)[cf.f_color_key] = cf.f_color_val);
}

function dynamicHandler(this: ThemeContextType, { r, m, f: { key, key_val }, bkf, gvf }: dynamicHandlerInputType) {
    if (this.dynamic && this.dynamicSupportedModes.has(m)) {
        const dymMode = variantTemplates['media'].replace(globalConstant["modeSpecifier"], m),
            b_k = this.dynamic === true ? globalConstant['defSelector'] : (gvf?.(this.dynamic) || bkf(this.dynamic));
        !r.Base[dymMode] && (r.Base[dymMode] = {});
        !r.Base[dymMode][b_k] && (r.Base[dymMode][b_k] = {});
        (r.Base[dymMode][b_k] as ThemeWorkerObjectType)[key] = key_val;
    }
}

function ColorWorker(this: ThemeContextType, { n, m, arr, r, b_k, c, isdef, bkf, gvf }: ColorWorkerInputType) {
    const { H, S, L } = new ColorTranslator(c, { decimals: 1 }).HSLObject;
    const cf = colorFormat([n, H, [S, L], m, isdef]) as colorFormatOutputType;

    colorWorkerSetter.call(this, { n, cf, r, b_k, subn: "DEFAULT" });
    dynamicHandler.call(this, { r, m, f: cf, bkf, gvf });

    if (!Array.isArray(arr)) return;

    arr.forEach((coord, i) => {
        const cf = colorFormat([n, H, coord, m, isdef, subClr[i]]);
        if (!cf || i > subClr.length - 1) return;

        colorWorkerSetter.call(this, {
            n,
            cf,
            r,
            b_k,
            subn: subClr[i]
        });
        dynamicHandler.call(this, { r, m, f: cf, bkf });
    });
    return true;
}

export {
    ColorWorker,
    dynamicHandler
};