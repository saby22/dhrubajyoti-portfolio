const htmlmin = require("html-minifier");
const env = process.env.ELEVENTY_ENV.trim();

module.exports = eleventyConfig => {
    
    eleventyConfig.addPassthroughCopy("./src/favicon");
    if(env === 'production'){
        eleventyConfig.addPassthroughCopy("./src/static");
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
    }
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