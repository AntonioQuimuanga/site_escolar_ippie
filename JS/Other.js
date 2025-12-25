let nums = document.querySelectorAll(".numero");
let container = document.querySelector(".container");

let test = false;

window.onscroll = () =>{
    if(window.screenY = container.offsetTop){
        if(!test){
            nums.forEach((e) =>{
                let start = 0;
                let end = e.dataset.num;
    
                let count = setInterval(() =>{
                    start ++;
                    e.textContent = start;
                    if(start == end){
                        clearInterval(count);
                    }
                }, 10000 / end)
            })  
        }
        test = true;
    }
}