const htmlmin = require("html-minifier");
const rimraf = require('rimraf');

const env = process.env.ELEVENTY_ENV.trim();
rimraf.sync("dist");
module.exports = eleventyConfig => {
    
    eleventyConfig.addPassthroughCopy("./src/favicon");
    eleventyConfig.addPassthroughCopy("./src/tsparticles");
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