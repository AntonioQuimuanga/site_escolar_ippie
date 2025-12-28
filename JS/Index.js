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
// ALTERAÇÃO: IntersectionObserver falha quando um scroller custom (ex: Locomotive)
// aplica transform no container. Se houver Locomotive ou ScrollTrigger disponível,
// usamos ScrollTrigger para disparar as classes; caso contrário, usamos IntersectionObserver.
const hiddenElements = Array.from(document.querySelectorAll('.hidden'));
const scrollerEl = document.querySelector('[data-scroll-container]');

function createIntersectionFallback(elements) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });
    elements.forEach(el => observer.observe(el));
}

function createScrollTriggerFor(elements) {
    if (typeof ScrollTrigger === 'undefined') return createIntersectionFallback(elements);
    elements.forEach(el => {
        if (el._hiddenTriggerCreated) return;
        ScrollTrigger.create({
            trigger: el,
            scroller: scrollerEl || undefined,
            start: 'top 80%',
            end: 'bottom 20%',
            onEnter: () => el.classList.add('show'),
            onEnterBack: () => el.classList.add('show'),
            onLeave: () => el.classList.remove('show'),
            onLeaveBack: () => el.classList.remove('show'),
            once: false
        });
        el._hiddenTriggerCreated = true;
    });
}

// If ScrollTrigger exists, wait for a refresh (which is called after scrollerProxy is set)
if (typeof ScrollTrigger !== 'undefined') {
    // try to create now, but prefer to run after refresh to ensure scrollerProxy is ready
    createScrollTriggerFor(hiddenElements);
    ScrollTrigger.addEventListener && ScrollTrigger.addEventListener('refresh', () => createScrollTriggerFor(hiddenElements));
    // also run after DOMContentLoaded to be safe
    document.addEventListener('DOMContentLoaded', () => createScrollTriggerFor(hiddenElements));
} else {
    // no ScrollTrigger available — use IntersectionObserver fallback
    createIntersectionFallback(hiddenElements);
}