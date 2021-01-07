module.exports = eleventyConfig => {

    eleventyConfig.addPassthroughCopy("./src/favicon");
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