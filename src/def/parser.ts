import { stringAround } from "../utils/search-array";
import { insertString } from "../utils/strings";
import { globalConstant } from "types";
import type {
    ThemeObjectType,
    ThemeCommonObjectType,
    ThemeParserOutputType,
    ThemeParserOutputsType,
    ThemeContextType,
    ThemeColorCoords,
    darkModeParserInputType,
    DarkModeAllOption,
    darkModeParserOutputType,
    variantTemplatesType
} from "types";

const variantTemplates: variantTemplatesType = {
    "media": globalConstant["media"],
    "class": globalConstant["class"],
    "selector": globalConstant["selector"],
    "variant": globalConstant["variant"],
};

function themeParser(this: ThemeContextType, theme: ThemeCommonObjectType) {
    const entries: ThemeParserOutputsType = [], seprators = new Set(["$", "_"]);
    const inf = (typeof theme.inf === "object" && !Array.isArray(theme.inf) && theme.inf !== null) ? theme.inf : {};
    delete theme.inf;

    for (const key in theme) {
        if (!Array.isArray(theme[key])) continue;
        const entity: Partial<ThemeParserOutputType> = {}, inf_key = inf[key];
        let isMultiArr: true | undefined;

        if (seprators.has(key[0]) || (typeof inf_key === "string" && inf_key !== "") || inf_key === true) {
            let breakPoint: undefined | number;
            for (const seprator of seprators) {
                const isMatch = key.lastIndexOf(seprator);
                if (isMatch > 1) {
                    breakPoint = isMatch;
                    break;
                };
            }
            entity['isColor'] = false;
            entity['name'] = seprators.has(key[0]) ? key.substring(1, breakPoint) : key;
            entity['property'] = typeof breakPoint === "number" ? key.substring(breakPoint + 1) : (typeof inf_key === "string" && inf_key);
        }
        else {
            entity['name'] = key;
            entity['isColor'] = true;
            entity['property'] = Array.isArray(inf_key) && Array.isArray(inf_key[0]) && (Array.isArray(inf_key[0][0]) ? !(isMultiArr = true) : typeof inf_key[0][0] === "number" && inf_key[0].length === 2 && (inf_key as ThemeColorCoords));
        };
        this.modes.forEach((mode, i) => {
            const value = stringAround(theme[key], i);
            if (!value || (this.isMedia && !this.dynamicSupportedModes.has(mode))) return;
            entity['index'] = i;
            entity['mode'] = mode;
            entity['value'] = value;
            isMultiArr === true && (entity['property'] = Array.isArray((inf_key as ThemeColorCoords[])[i]) && (inf_key as ThemeColorCoords[])[i]);
            entries.push({ ...entity } as ThemeParserOutputType);
        });
    }
    return entries;
}

function contextParser(theme: ThemeObjectType) {
    const defaultContext: ThemeContextType = {
        defaultMode: 0,
        modes: ["light", "dark"],
        dynamic: false,
        dynamicSupportedModes: new Set(["light", "dark"]),
        strategy: "class",
        isMedia: false
    };
    // applying the user defined modes and default mode
    theme.hasOwnProperty("modes") && (defaultContext.modes = theme.modes!
        .filter((x) => typeof x === "string" && (x[0] === "!" ? x.length > 1 : x.length > 0))
        .map((mode, index) => {
            if (mode[0] === "!") {
                defaultContext.defaultMode = index;
                return mode.slice(1);
            }
            return mode;
        })) && delete theme.modes;
    // changing the dynamic field class if it true default mode will be -1
    theme.hasOwnProperty("dynamic") && (typeof theme.dynamic === "string" || theme.dynamic === true && (defaultContext.defaultMode = -1)) && theme.dynamic !== '' && (defaultContext.dynamic = theme.dynamic!) && delete theme.dynamic;

    return defaultContext;
}

function darkModeParser(this: ThemeContextType, [darkMode, r]: darkModeParserInputType): darkModeParserOutputType {
    const track = new Map<string, string>();
    let isCustombk = false,
        isVArr = false,
        vtemp: (ch: string) => string,
        bktemp = insertString('[class="$"]', globalConstant["modeSpecifier"]);

    // changing the strategy based on the user input
    if (darkMode)
        if (typeof darkMode === "string" && variantTemplates.hasOwnProperty(darkMode) && darkMode !== "variant" as DarkModeAllOption) {
            darkMode === "media" && (this.isMedia = true) && (this.dynamic = true);
            this.strategy = darkMode;
        }
        else if (Array.isArray(darkMode) && darkMode.length > 1 && variantTemplates.hasOwnProperty(darkMode[0] as DarkModeAllOption) && darkMode[0] !== "media" as DarkModeAllOption && darkMode[1]) {
            this.strategy = darkMode[0];
            if (typeof darkMode[1] === "string")
                this.strategy !== "variant" ?
                    (bktemp = insertString(darkMode[1], globalConstant["modeSpecifier"])) :
                    (variantTemplates[this.strategy] = darkMode[1]);
            else if (this.strategy === "variant" && Array.isArray(darkMode[1]))
                variantTemplates[this.strategy] = (isVArr = true) && JSON.stringify(darkMode[1]);
            isCustombk = true;
        }
    // initializing variant template
    vtemp = insertString(((isCustombk && this.strategy !== "variant") ? variantTemplates[this.strategy].replaceAll(globalConstant["modeSpecifier"], bktemp.str) : variantTemplates[this.strategy]), globalConstant["modeSpecifier"]);

    function genVariant(this: ThemeContextType, m: string): undefined {
        if (track.has(m)) return;
        const val = vtemp((isCustombk || this.isMedia) ? m : ("." + m));
        r.Variants[m] = isVArr ? JSON.parse(val) : val;
    }

    function getBK(this: ThemeContextType, m: string, isdef?: boolean) {
        if (track.has(m)) return track.get(m) as string;
        let result: string = (this.strategy === "selector" ? "" : globalConstant['defSelector']) + bktemp(m);
        isdef && (result += "," + globalConstant['defSelector']);
        track.set(m, result);
        return result;
    }

    return {
        genVariant: genVariant.bind(this),
        getBK: getBK.bind(this)
    };
}

export {
    themeParser,
    contextParser,
    darkModeParser,
    variantTemplates
};
