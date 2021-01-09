/* DO NOT MESS WITH THIS FILE IF YOU DO NOT KNOW WHAT YOU ARE DOING */
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const dotenv = require('dotenv');
const prismic = require('prismic-dom');
dotenv.config();
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const baseURL = "https://dhrubajyoti98-portfolio.prismic.io/api/v2/documents/search";
let js = [];
let css = [];

fs.readdir(path.resolve(__dirname,'../static'), (err, files) => {
    if(!err){
        files.forEach(file => {
            if(file.split(".")[2]==='js')
                js.push(file);
            else
                css.push(file);
          });
    }
    else{
        console.log(err);
    }
});

/*The link resolver function is specific to Prismic */
const linkResolver = function(doc) {
    return "/doc/" + doc.id;
}

/* This function gets the reference token from Prismic that is passed to subsequent API calls */
const getRef = async ()=> {
    const config = {
        params:{
            access_token : ACCESS_TOKEN
        }
    }
    const response =  await axios.get('https://dhrubajyoti98-portfolio.prismic.io/api/v2',config);
    console.log("Reference Key : ",response.data.refs[0].ref);
    return response.data.refs[0].ref;
}

const getAboutMe = async ()=>{
    try{
        let response = await axios.get(baseURL,{
            params:{
                ref : await getRef(),
                q : '[[at(document.type, "aboutme")]]',
                access_token : ACCESS_TOKEN
            }
        });
        response = response.data.results[0].data;
        let aboutme = [];

        // Convert the text to HTML
        aboutme[0] = prismic.RichText.asHtml(response.text, linkResolver);
        
        // Convert each individual image to HTML
        for(let i=1;i<=Object.keys(response).length-1;i++){
            aboutme.push(`<img src="${response['image'+i].url}" alt="${response['image'+i].alt}" loading="lazy" class="random-image" id="image-${i}">`)
        }
        console.log(aboutme);
        return aboutme;
    }
    catch(e){
        console.log(e);
    }
}

const getEducations = async ()=>{
    try{
        const response = await axios.get(baseURL,{
            params:{
                ref : await getRef(),
                q : '[[at(document.type, "education")]]',
                access_token : ACCESS_TOKEN
            }
        });
        const education = response.data.results;
        // Sort the education array in descending order on the basis of order property in data
        education.sort((a,b) => ((a.data.order<b.data.order)? 1 : -1));
        console.log(education);
        return education;
    }
    catch(e){
        console.log(e);
    }
}

const getSkills = async ()=>{
    try{
        let response = await axios.get(baseURL,{
            params:{
                ref : await getRef(),
                q : '[[at(document.type, "skill")]]',
                access_token : ACCESS_TOKEN
            }
        });
        response = response.data.results;
        // Sort the response array in descending order on the basis of order property in data
        response.sort((a,b) => ((a.data.order>b.data.order)? 1 : -1));
        let skills = [];
        // Convert the images to HTML
        for(let i=0;i<response.length;i++){
            skills.push(`<img src="${response[i].data.image.url}" alt="${response[i].data.image.alt}" loading="lazy">`)
        }
        console.log(skills);
        return skills;
    }
    catch(e){
        console.log(e);
    }
}

const getResearches = async ()=>{
    try{
        const response = await axios.get(baseURL,{
            params:{
                ref : await getRef(),
                q : '[[at(document.type, "research")]]',
                access_token : ACCESS_TOKEN
            }
        });
        const researches = response.data.results;
        console.log(researches);
        return researches;
    }
    catch(e){
        console.log(e);
    }
}

const getEmails = async ()=>{
    try{
        const response = await axios.get(baseURL,{
            params:{
                ref : await getRef(),
                q : '[[at(document.type, "email")]]',
                access_token : ACCESS_TOKEN
            }
        });
        const email = response.data.results;
        console.log(email);
        return email;
    }
    catch(e){
        console.log(e);
    }
}

// DO NOT MESS WITH THIS OBJECT
const developer = {
    name : "This website was developed by Sabyasachi",
    links: {
        github: {
          link: 'https://github.com/saby22',
          icon: 'fa-github',
          aria: "Visit Sabyasachi's Github"
        },
        linkedin: {
          link: 'https://www.linkedin.com/in/sabyasachik/',
          icon: 'fa-linkedin-in',
          aria: "Visit Sabyasachi's Linkedin"
        }
    }
}

module.exports = async ()=>{
    let educations  = await getEducations();
    let emails = await getEmails();
    let aboutme = await getAboutMe();
    let skills = await getSkills();
    let researches = await getResearches();
    return {
        educations,
        emails,
        aboutme,
        skills,
        researches,
        developer,
        js,
        css
    }
}
