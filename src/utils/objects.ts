
function isObject(obj: unknown): boolean {
    self
    return typeof obj === "object" && !Array.isArray(obj) && obj !== null
}

isObject.test = function (this: any, obj: unknown) {
    this.ok = isObject(obj);
    return this;
}

isObject.true = function (this: any, t: unknown) {
    this.t = t;
    return this;
}

isObject.false = function (this: any, f: unknown) {
    this.f = f;
    return this;
}
isObject.get = function (this: any) {
    return (this.ok ? this.t : this.f) || this.ok;
}
export { isObject };