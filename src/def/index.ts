import ThemeWorker from "./worker";
import { contextParser } from "./parser";
import { setBase } from "../base";
import { setter } from "../config";
import { setStaticVariants } from "../variants";
import { isObject } from "../utils/objects";
import type {
    ThemeObjectType,
    darkModeType
} from "types";

function Theme(o: ThemeObjectType, m: darkModeType) {
    if (!isObject(o)) return;
    const { Colors, Variants, Base, Extends } = ThemeWorker.call(contextParser(o), [o, m]);
    setter('theme.extend.colors', Colors, 'w');
    setter('theme.extend', Extends);
    setBase('', Base);
    setStaticVariants("", Variants);
}
export default Theme;

