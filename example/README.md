# Example: converting SVG shapes to paths

This folder demonstrates the correct way to use `SVGConverter` directly from
Node, without going through `index.js` or `run.js` (which read every file in
the top-level `input/` folder and write to `output/`).

## Files

- `input/all-shapes.svg` — a sample icon containing `<rect>`, `<circle>`,
  `<ellipse>`, `<polygon>`, and `<line>` elements alongside existing
  `<path>` elements.
- `convert.js` — a minimal script that runs the conversion.
- `output/all-shapes.svg` — the result of running `convert.js` against the
  input file: every shape element has been replaced with an equivalent
  `<path>` element.

## Usage

```sh
npm install
node example/convert.js
```

## API

```js
const SVGConverter = require("./SVGConverter").SVGConverter;

const converter = new SVGConverter("path/to/input.svg");

// Converts circles, ellipses, lines, polygons, and rects in one call.
converter.convertAll();

const doc = converter.getDoc(); // the converted XML Document

// Or call individual converters if you only need specific shape types:
converter.convertCircles();
converter.convertEllipses();
converter.convertLines();
converter.convertPolygons();
converter.convertRects();
```

Serialize the result with `xmldom`'s `XMLSerializer` (see `convert.js`) before
writing it out.

Note: this fork's `convertAll()` also converts `<line>` elements — the
upstream `sstp` package (see the top-level README) does not support
`<line>`/`<polyline>`.
