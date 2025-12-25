/*Criação das variavéis responsavéis pelo menu, e por abrir o menu*/

let btnMobile = document.getElementById('abrir-menu');
let menuMobile = document.getElementById('menu-mobile');
let overLay = document.getElementById('menu-mobileOverlay')

/*funções que serão responsáveis por abrir/fechar o menu,
e adicionar/remover o overlay*/

btnMobile.addEventListener('click', ()=>{
    menuMobile.classList.add('aberto')
});
menuMobile.addEventListener('click', () =>{
    menuMobile.classList.remove('aberto')
});
overLay.addEventListener('click', () =>{
    menuMobile.classList.remove('aberto')
});
let list = document.querySelector('#list');
let items = document.querySelectorAll('#list .item');
let dots = document.querySelectorAll('#slider #dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let ativo = 0;
let lengthItems = items.length - 1;

prev.onclick = function(){
    if(ativo - 1 < 0){
        ativo = lengthItems;
    }
    else{
        ativo = ativo - 1;
    }
    reloadSlider();
}
next.onclick = function(){
    if(ativo + 1 > lengthItems){
        ativo = 0;
    }
    else{
        ativo = ativo + 1;
    }
    reloadSlider();
}
let refreshSlider = setInterval(()=>{next.click()},10000);
function reloadSlider(){
    let checkLeft = items[ativo].offsetLeft;
    list.style.left = -checkLeft + 'px';

    let lastAtiveDot = document.querySelector('#slider #dots li.ativo');
    lastAtiveDot.classList.remove('ativo');
    dots[ativo].classList.add('ativo');
    clearInterval(refreshSlider);
    let refreshSlider = setInterval(()=>{next.click()},10000);
}
dots.forEach((li, key) =>{
    li.addEventListener('click', function(){
        ativo = key;
        reloadSlider();
    })
});
const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) =>{
        console.log(entry) 
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
        else{
            entry.target.classList.remove('show')
        }
        
});
threshold: 1
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));