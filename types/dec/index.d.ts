import type { PluginCreator, Config } from "tailwindcss/types/config";
type ThemeReservedObjectType = {
    modes?: string[];
    dynamic?: boolean | string;
};
type ThemeColorCoords = [number, number][];
type ThemeInfType = {
    inf?: {
        [key: string]: string | string[] | true | ThemeColorCoords | ThemeColorCoords[] | null;
    };
};
type ThemeCommonObjectType = {
    [key: string]: any | string[];
} & ThemeInfType;
type ThemeObjectType = ThemeCommonObjectType & ThemeReservedObjectType;
type DarkModeAllOption = "media" | "class" | "selector" | "variant";
type DarkMode = Exclude<DarkModeAllOption, "variant"> | [Exclude<DarkModeAllOption, "media" | "variant">, string] | ["variant", string | string[]];
interface TailflyReturnType {
    handler: PluginCreator;
    config?: Partial<Config>;
}
interface TailflyType {
    def?: ThemeObjectType;
    darkMode?: DarkMode;
}
export default function Tailfly({ def, darkMode }: TailflyType): TailflyReturnType;

export type {
    ThemeReservedObjectType,
    ThemeColorCoords,
    ThemeCommonObjectType,
    ThemeObjectType,
    DarkModeAllOption,
    DarkMode,
    TailflyType,
    TailflyReturnType
};