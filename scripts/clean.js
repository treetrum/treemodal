const rimraf = require("rimraf");
const fs = require("fs");
const path = require("path");

const OUTPUT_PATH = path.join(__dirname, "../dist");

// Delete old output folder
rimraf.sync(OUTPUT_PATH);

// Create the new one
fs.mkdir(OUTPUT_PATH, err => {
    if (err) {
        console.error(err);
    }
});
