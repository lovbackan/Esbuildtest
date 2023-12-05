import * as fs from "fs";
import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";

// this should be a function that builds the scss when called upon in the package.json
function buildCss() {
    const startTime = Date.now();

    esbuild
        .build({
            bundle: true,
            minify: true,
            entryPoints: ["src/scss/main.scss"],
            outdir: "local/assets/scss",
            outExtension: {
                ".css": ".min.css",
            },
            plugins: [sassPlugin()],
        })
        .then(() => {
            const endTime = Date.now();
            const buildTime = (endTime - startTime) / 1000;
            console.log(`⚡ Scss Build complete in ${buildTime} seconds! ⚡`);
        })
        .catch(() => process.exit(1));
}

// this should be a function that builds the html when called upon in the package.json

const buildHtml = () => {
    const startTime = Date.now();
    const data = fs.readFileSync("src/index.html", "utf8");
    fs.writeFileSync("local/index.html", data, "utf8");
    const endTime = Date.now();
    const buildTime = (endTime - startTime) / 1000;
    console.log(`⚡ Html Build complete in ${buildTime} seconds! ⚡`);
};

const command = process.argv[2];

if (command === "css") {
    buildCss();
} else if (command === "html") {
    buildHtml();
} else {
    console.log("Unknown command. Please use 'css' or 'html'.");
}
