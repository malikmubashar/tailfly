import resolve from "./resolve";

export default function (obj: { [key: string]: any }) {

    function setter(key: string, value: any, option: 'w' | 'm' = "m") {

        function nested(current: number, obj: any) {
            try {
                if (current < levels.length - 1) {
                    !obj[levels[current]] && (obj[levels[current]] = {});
                    return nested(current + 1, obj[levels[current]]);
                } else {
                    if (option === "m" && obj[levels[current]] && typeof obj[levels[current]] === "object") {
                        if (Array.isArray(obj[levels[current]])) obj[levels[current]] = [...obj[levels[current]], ...value];
                        else
                            obj[levels[current]] = resolve(obj[levels[current]], value);
                    }
                    else if (levels[0] === "" && typeof value === "object")
                        for (const key in value)
                            obj[key] = value[key];
                    else
                        obj[levels[current]] = value;
                }
                return true;
            } catch (err) {
                console.error(err);
                return false;
            }
        }

        const levels = key.split('.');
        return nested(0, obj);
    }

    return setter;
}