module.exports = eleventyConfig => {

    eleventyConfig.addPassthroughCopy("./src/icons");
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