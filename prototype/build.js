import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import * as fs from "fs";
import postcss from "postcss";
import postcssPresetEnv from "postcss-preset-env";

const startTime = Date.now();

const version = Date.now();
const buildOptions = {
    bundle: true,
    minify: true,
    entryPoints: ["src/scss/main.scss", "src/js/main.js"],
    outdir: "public/assets",
    outExtension: {
        ".css": ".min." + version + ".css",
        ".js": ".min." + version + ".js",
    },
    plugins: [
        sassPlugin({
            async transform(source, resolveDir) {
                const { css } = await postcss([
                    postcssPresetEnv({ stage: 0 }),
                ]).process(source, { from: undefined });
                return css;
            },
        }),
    ],
};

async function build() {
    await esbuild
        .build({
            ...buildOptions,
        })
        .then(() => {
            const data = fs.readFileSync("src/index.html", "utf8");

            // Replace the placeholder with the script filename, we are doing this so that we can cachebust the file
            let result = data.replace("main.min.js", `main.min.${version}.js`);

            result = result.replace("main.min.css", `main.min.${version}.css`);

            fs.writeFileSync("public/index.html", result, "utf8");
            const endTime = Date.now();
            const buildTime = (endTime - startTime) / 1000;
            console.log(
                `⚡ Complete Build complete in ${buildTime} seconds! ⚡`
            );
        })

        .catch(() => process.exit(1));
}

build();
