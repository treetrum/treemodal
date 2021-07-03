const sass = require("sass");
const path = require("path");
const fs = require("fs");
const watch = require("node-watch");

const INPUT_FILE = path.join(__dirname, "../src/scss/treemodal.scss");
const OUTPUT_FILE = path.join(__dirname, "../dist/treemodal.css");
const OUTPUT_FILE_MIN = path.join(__dirname, "../dist/treemodal.min.css");

const renderSassToDisk = ({ file, outFile, ...opts }) => {
    try {
        const result = sass.renderSync({ file, outFile, ...opts });
        fs.writeFile(outFile, result.css, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`Successfully wrote ${outFile} to disk`);
        });
    } catch (error) {
        console.error(err);
    }
};

const go = () => {
    renderSassToDisk({
        file: INPUT_FILE,
        outFile: OUTPUT_FILE,
        outputStyle: "expanded",
    });
    renderSassToDisk({
        file: INPUT_FILE,
        outFile: OUTPUT_FILE_MIN,
        outputStyle: "compressed",
    });
};

go();

if (process.argv[2] && process.argv[2].indexOf("-w") !== -1) {
    console.log("WATCHING");
    watch(INPUT_FILE, {}, () => {
        go();
    });
}
