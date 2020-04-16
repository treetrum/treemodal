const sass = require("node-sass");
const path = require("path");
const fs = require("fs");

const INPUT_FILE = path.join(__dirname, "../src/scss/treemodal.scss");
const OUTPUT_FILE = path.join(__dirname, "../dist/treemodal.css");
const OUTPUT_FILE_MIN = path.join(__dirname, "../dist/treemodal.min.css");

const renderSassToDisk = ({ file, outFile, ...opts }) => {
    sass.render(
        {
            file,
            outFile,
            ...opts
        },
        (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
            fs.writeFile(outFile, result.css, err => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`Successfully wrote ${outFile} to disk`);
            });
        }
    );
};

renderSassToDisk({
    file: INPUT_FILE,
    outFile: OUTPUT_FILE,
    outputStyle: "expanded"
});

renderSassToDisk({
    file: INPUT_FILE,
    outFile: OUTPUT_FILE_MIN,
    outputStyle: "compressed"
});