import fs from "fs";
import cssToObject from "css-to-object";

async function main() {

    let branch = "https://github.com/animate-css/animate.css/tree/main/";

    // get all the directory link
    const sourceDir = (await (await fetch(branch + "source")).json()).payload.tree.items.map(x => x.contentType === "directory" && branch + x.path).filter(Boolean);

    // get all the file link in each directory
    const sourceFile = (await Promise.all(sourceDir.map(async (x, i) => (await (await fetch(x)).json()).payload.tree.items.map(o => o.contentType === "file" && branch + o.path)))).flat(2);

    // get all the file content
    const rawContent = await Promise.all(sourceFile.map(async (x, i) => {
        const content = convertToJsObject((await (await fetch(x)).json()).payload.blob.rawLines.join(""));
        return content;
    }));

    // convert text css to js object
    async function convertToJsObject(css) {
        const key = css.match(/(?<=\s)\w+(?=\s{)/g)[0];
        const [f, e] = [css.indexOf("{") + 1, css.lastIndexOf("." + key)];
        return { [key]: cssToObject(css.slice(f, e), { camelCase: true }) };
    }

    // format the output
    function format(array) {
        return array.reduce((obj, x) => {
            const key = Object.keys(x)[0];
            obj[key] = x[key];
            return obj;
        }, {});
    }

    return format(rawContent);
}

main().then(x => {
    console.log("Success : keyframes added.");
    fs.writeFileSync("output.js", `export const keyframes = ${JSON.stringify(x, null, 2)};`, { flag: "w" });
}).catch(x => console.log("Error :\n", x));