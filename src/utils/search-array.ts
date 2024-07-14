

export function stringAround(arr:string[], i:number) {

    if (typeof arr[i] !== "string"||!arr[i]) {
        if (i === 0) return;
        return stringAround(arr, --i);
    }

    return arr[i];
}