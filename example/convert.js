/**
 * Minimal example of the correct way to use SVGConverter directly from Node.
 *
 * Usage:
 *   npm install
 *   node example/convert.js
 */

const fs = require("fs");
const path = require("path");
const XMLSerializer = require("xmldom").XMLSerializer;
const SVGConverter = require("../SVGConverter").SVGConverter;

const inputFile = path.join(__dirname, "input", "all-shapes.svg");
const outputFile = path.join(__dirname, "output", "all-shapes.svg");

const converter = new SVGConverter(inputFile);

// Converts circles, ellipses, lines, polygons, and rects in one call.
// Individual converters (convertCircles, convertEllipses, convertLines,
// convertPolygons, convertRects) can be called instead if you only need
// to convert specific shape types.
converter.convertAll();

fs.writeFileSync(
    outputFile,
    new XMLSerializer().serializeToString(converter.getDoc()),
    "utf8"
);

console.log(`Converted ${inputFile} -> ${outputFile}`);
