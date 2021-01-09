import jump from 'jump.js';
const aboutMeBtn = document.querySelector(".about-me-button");
aboutMeBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    jump('.about-me-section',{
        duration:1000
    })
})