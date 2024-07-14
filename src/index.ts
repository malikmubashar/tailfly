import plugin from 'tailwindcss/plugin';
import { CONFIG } from './config';
import { StaticVariants } from './variants';
import { BASE } from './base';
import Theme from './def';
import init from "./init";
import type {
    TailflyType,
    TailflyReturnType
} from "types";

export default function Tailfly(inp: TailflyType): TailflyReturnType {
    const { def, darkMode } = init<TailflyType>(inp?.def ? inp : {});
    def && Theme(def, darkMode);
    darkMode && (CONFIG.darkMode = darkMode);
    return plugin(function ({ addBase, addVariant }) {
        addBase(BASE);
        for (const key in StaticVariants) addVariant(key, StaticVariants[key]);
    }, CONFIG);
}








