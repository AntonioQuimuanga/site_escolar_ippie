import gsap from "../Libs/gsap.min.js";
import { SplitText }  from "../Libs/SplitText.min.js";

gsap.registerPlugin(SplitText);
const slideData = [
    {title: "Técnico de Informática", image: "../Images/Informatica.jpeg"},
    {title: "Máquias & Motores", image: "../Images/Mecanica.webp"},
    {title: "Eletricidade & Instalações Elétricas", image: "../Images/Eletricistas.webp"},
    {title: "Gestão de Sistemas Informáticos", image: "../Images/nformáticos no Laboratório.webp"},
    {title: "Desenhador Projectista", image: "../Images/Estudantes.webp"},
];

const contentor = document.querySelector(".container");
const slider = document.querySelector(".silder");

let frontSlideIndex = 0;
let isSlideAnimated = false;

function stratTheAnimation(){
    slideData.forEach((data, index) => {
        const slide = document.createElement("div");
        slide.className = "slide";
        slide.innerHTML = `
                    <img src="${data.image}" alt="${data.title}"
                    class="slideImage"/>
                    <h1 class="slide-title">${data.title}</h1>
                `;

        slider.appendChild(slide);
    });

    let slides = document.querySelectorAll(".slideImage");

    slides.forEach((slide) => {
        const title = slide.querySelector(".slide-title");
        new SplitText(title, {
            type: "words",
            mask: "words",
        });
    });

    slides.forEach((slide, i) =>{
        gsap.set(slide, {
            y: -15 + 15 * i + "%",
            z: 15 * i,
            opacity: 1,
        });
    });
}
document.addEventListener("DOMContentLoaded", function(){
    stratTheAnimation();
})