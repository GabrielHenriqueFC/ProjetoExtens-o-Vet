const slideContainer = document.querySelector('.slide-container');
const btn = document.querySelectorAll('button');
let txtSlide = document.querySelector('#txt-slideInfo');
const section = document.querySelector('.clinica');
const items = document.querySelectorAll('.info');
const divHome = document.querySelector('.menu-m3');
const infoSection = document.querySelector('.clinica');

let slideIndex = 0;

function moveSlide(direction){
    slideIndex += direction;
    slideContainer.scrollBy({
        left: slideContainer.offsetWidth * direction,
        behavior: 'smooth'
    });
    if(slideIndex > 5) {
        slideIndex = 0
    } else if(slideIndex < 0) {
        slideIndex = 0
    }
}

setTimeout(moveSlide(0), 3000)

function changeText() {
    if (slideIndex == 0 || slideIndex == 3)  {
        txtSlide.innerHTML = "Centro Veterinario Uniesp"
    } else if (slideIndex == 1 || slideIndex == 4) {
        txtSlide.innerHTML = "Estacionamento"
    } else if (slideIndex == 2 || slideIndex == 5) {
        txtSlide.innerHTML = "Bloco Central"
    }
}

function animateElements(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
}

const observer = new IntersectionObserver(animateElements, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 
});

items.forEach(item => {
    observer.observe(item);
});



document.addEventListener('DOMContentLoaded', (event) => {
    const loginDiv = document.querySelector('.header-acount');

    loginDiv.addEventListener('click', () => {
        window.location.href = 'login.html'; 
    });
});


divHome.addEventListener('click', ()=> {
    window.scrollTo({top:infoSection.offsetTop, behavior:'smooth'})
})

