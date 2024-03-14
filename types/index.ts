import type {
    ThemeReservedObjectType,
    ThemeColorCoords,
    ThemeCommonObjectType,
    ThemeObjectType,
    DarkMode,
    DarkModeAllOption,
    TailflyType,
    TailflyReturnType
} from "./dec";
export const enum globalConstant {
    root = "html",
    defSelector = ":root",
    modeSelSep = "|",
    modeDefSel = "#",
    modeSpecifier = "$",
    media = "@media (prefers-color-scheme: $)",
    class = ":is($ &)",
    selector = "&:where($, $ *)",
    variant = ".$ &"
};
type variantTemplatesType = Record<DarkModeAllOption, string>;
type darkModeType = DarkMode | undefined;
type ThemeContextType = Required<ThemeReservedObjectType> & {
    defaultMode: number;
    dynamicSupportedModes: Set<string>;
    strategy: DarkModeAllOption;
    isMedia: boolean;
};
type ThemeWorkerInputType = [ThemeCommonObjectType, darkModeType];
type ThemeWorkerObjectType = { [key: string]: string };
type ThemeWorkerOutputType = {
    Extends: { [key: string]: any };
    Colors: { [key: string]: string | ThemeWorkerObjectType };
    Variants: { [key: string]: string };
    Base: { [key: string]: { [key: string]: string | ThemeWorkerObjectType } };
};
type ThemeParserOutputType = {
    index: number;
    mode: string;
    name: string;
    isColor: boolean;
    property: string | false | ThemeColorCoords;
    value: string;
};
type ThemeParserOutputsType = ThemeParserOutputType[];
type darkModeParserInputType = [darkModeType, ThemeWorkerOutputType];
type darkModeParserOutputType = {
    getBK: (mode: string, isdefault?: boolean) => string;
    genVariant: (mode: string) => undefined;
};
type ColorWorkerInputType = {
    c: ThemeParserOutputType['value'];
    arr: ThemeParserOutputType['property'];
    n: ThemeParserOutputType['name'];
    m: ThemeParserOutputType['mode'];
    r: ThemeWorkerOutputType;
    b_k: string;
    isdef: boolean;
    bkf: darkModeParserOutputType["getBK"];
    gvf: darkModeParserOutputType["genVariant"];
};
type colorFormatInputType = [string, number, [number, number], string, boolean, number?];
type colorFormatOutputType = Record<"global_key" | "global_key_val" | "key" | "key_val" | "color_val" | "f_color_key" | "f_color_val" | "def_color_key" | "def_color_val", string>;
type colorWorkerSetterType = {
    subn: "DEFAULT" | number;
    cf: colorFormatOutputType | undefined;
    n: ColorWorkerInputType['n'],
    r: ColorWorkerInputType["r"],
    b_k: ColorWorkerInputType['b_k'],
};
type dynamicHandlerInputType = {
    r: ColorWorkerInputType["r"];
    m: ColorWorkerInputType['m'];
    f: Pick<colorFormatOutputType, "key" | "key_val">;
    bkf: darkModeParserOutputType["getBK"];
    gvf?: darkModeParserOutputType["genVariant"];
};
type TokenErrorType = Record<"name" | "value" | "mode", string> & { err: Error };


export type {
    variantTemplatesType,
    TailflyType,
    TailflyReturnType,
    //darkMode
    DarkModeAllOption,
    DarkMode,
    darkModeType,
    //theme
    ThemeReservedObjectType,
    ThemeColorCoords,
    ThemeCommonObjectType,
    ThemeObjectType,
    //alerts
    TokenErrorType,
    //others
    dynamicHandlerInputType,
    colorWorkerSetterType,
    colorFormatOutputType,
    colorFormatInputType,
    ColorWorkerInputType,
    darkModeParserOutputType,
    darkModeParserInputType,
    ThemeParserOutputType,
    ThemeParserOutputsType,
    ThemeWorkerOutputType,
    ThemeWorkerObjectType,
    ThemeWorkerInputType,
    ThemeContextType
};

