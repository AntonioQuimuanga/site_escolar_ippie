// ALTERAÇÃO: corrigido event de scroll e comparação (substitui assignment incorreto)
let nums = document.querySelectorAll(".numero");
let container = document.querySelector(".container");

let test = false;

window.addEventListener("scroll", () => {
    if (!container) return;
    if (window.scrollY >= container.offsetTop) {
        if (!test) {
            nums.forEach((e) => {
                let start = 0;
                let end = parseInt(e.dataset.num, 10) || 0;
                let intervalTime = end > 0 ? (10000 / end) : 50;

                let count = setInterval(() => {
                    start++;
                    e.textContent = start;
                    if (start >= end) {
                        clearInterval(count);
                    }
                }, intervalTime);
            });
            test = true;
        }
    }
});