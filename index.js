const fs                   = require("fs"),
      path                 = require("path"),
      DOMParser            = require("xmldom").DOMParser,
      XMLSerializer        = require("xmldom").XMLSerializer,
      SVGConverter         = require('./SVGConverter').SVGConverter,
      SvgToJson            = require('./SvgToJson').SvgToJson,
      _                    = require('lodash'),
      slash                = require('./functions.js').slash


try {
    let svg,
        converter,
        parser,
        writer,
        data = [];

    const indir  = "./input",
          outdir = "./output";

    parser = new DOMParser();
    writer = new XMLSerializer();

    const icons = fs.readdirSync(indir).filter(f => f.endsWith('.svg'));

    _.each(icons, async (source, iter) => {

        source = slash(indir) + source;

        converter = new SVGConverter(source);
        converter.convertAll();
        svg = converter.getDoc();

        fs.writeFileSync(
            slash(outdir) + path.basename(source),
            writer.serializeToString(svg),
            "utf8"
        );

        data.push(new SvgToJson(svg).getData());
    });

    fs.writeFileSync(
        slash(outdir) + '000-emojis-' + (new Date()).getTime() + '.json',
        JSON.stringify({icons : data}),
        "utf8"
    );

    console.log('SVG Conversions complete.');
}
catch(e) {
    console.error(e);
}
