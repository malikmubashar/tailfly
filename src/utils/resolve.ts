

export default function resolve(oldOBJ: any, newOBJ: any) {
    // old object will be overWritten
        for (let key in newOBJ) {
            const [oldVal, newVal] = [oldOBJ[key], newOBJ[key]];
            if (typeof newVal === "object" && oldVal && newVal !== null) {
                if (Array.isArray(newVal))
                    oldOBJ[key] = [...oldVal, ...newVal];
                else
                    resolve(oldVal, newVal);
            }
            else
                oldOBJ[key] = newVal;
        }

    return oldOBJ;
}