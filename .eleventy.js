const htmlmin = require("html-minifier");
module.exports = eleventyConfig => {

    eleventyConfig.addPassthroughCopy("./src/favicon");
    eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
        if (outputPath.endsWith('.html')){
            const minified = htmlmin.minify(content, {
                collapseInlineTagWhitespace: false,
                collapseWhitespace: true,
                removeComments: true,
                sortClassName: true,
                useShortDoctype: true,
            });
            return minified;
        }
        return content;
    });
    
    return {
        addPassthroughCopy : true,
        dataTemplateEngine: "ejs",
        templateFormats: ["ejs"],
        dir:{
            input : "src",
            output : "dist"
        }
    }
}