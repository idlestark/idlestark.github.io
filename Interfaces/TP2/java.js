const contenidoBoton = document.querySelector('.boton-pago');

codigoSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="28" viewBox="0 0 36 28" fill="none">';
codigoSVG += '<path d="M33 2.40582L12 25.5942L3 16.8986" stroke="black" stroke-width="3" stroke-miterlimit="10" stroke-linecap="square"/>';
codigoSVG += '</svg>';
codigoSVG2 = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="49" viewBox="0 0 50 49" fill="none">';
codigoSVG2 += '<path d="M15.8203 43.2578C16.6833 43.2578 17.3828 42.5722 17.3828 41.7266C17.3828 40.8809 16.6833 40.1953 15.8203 40.1953C14.9574 40.1953 14.2578 40.8809 14.2578 41.7266C14.2578 42.5722 14.9574 43.2578 15.8203 43.2578Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>';
codigoSVG2 += '<path d="M37.6953 43.2578C38.5583 43.2578 39.2578 42.5722 39.2578 41.7266C39.2578 40.8809 38.5583 40.1953 37.6953 40.1953C36.8324 40.1953 36.1328 40.8809 36.1328 41.7266C36.1328 42.5722 36.8324 43.2578 37.6953 43.2578Z" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>';
codigoSVG2 += '<path d="M3.32031 9.57031H9.57031L14.2578 35.6016H39.2578" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>';
codigoSVG2 += '<path d="M14.2578 29.4766H38.6172C38.7979 29.4767 38.973 29.4154 39.1128 29.3032C39.2526 29.191 39.3483 29.0348 39.3838 28.8612L42.1963 15.0799C42.219 14.9688 42.2162 14.8541 42.1882 14.7442C42.1602 14.6342 42.1076 14.5317 42.0343 14.4441C41.9609 14.3565 41.8686 14.2859 41.7641 14.2375C41.6595 14.1891 41.5453 14.164 41.4297 14.1641H11.1328" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>';
codigoSVG2 += '</svg>';

let estadoOriginal = true;

contenidoBoton.addEventListener('click', ()=>{
  if(estadoOriginal){
  contenidoBoton.innerHTML = codigoSVG2 + codigoSVG;
  }else{
    contenidoBoton.innerHTML = 'AÑADIR AL CARRO';
      }
      estadoOriginal = !estadoOriginal;
})


const boton = document.querySelector('.contenedor_boton');
const nav = document.querySelector('.contenedor-generos');

boton.addEventListener('click',()=>{
    nav.classList.toggle('activo')
})

const botonPerfil = document.querySelector('.perfil');
const desplegar = document.querySelector('.perfil-usuario');

botonPerfil.addEventListener('click',()=>{
  desplegar.classList.toggle('desplegar')
})

const carouselContainers = document.querySelectorAll(".carousel-container");

carouselContainers.forEach(container => {
  const wrapper = container.querySelector(".wrapper");
  const carousel = container.querySelector(".carousel");
  const firstCardWidth = carousel.querySelector(".card").offsetWidth;
  const arrowBtns = container.querySelectorAll("i");
  const carouselChildrens = [...carousel.children];
  let isDragging = false,
    isAutoPlay = true,
    startX,
    startScrollLeft,
    timeoutId;
  // Get the number of cards that can fit in the carousel at once
  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

  // Insert copies of the last few cards to beginning of carousel for infinite scrolling
  carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

  // Insert copies of the first few cards to end of carousel for infinite scrolling
  carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  // Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
  carousel.classList.add("no-transition");
  carousel.scrollLeft = carousel.offsetWidth;
  carousel.classList.remove("no-transition");

  // Add event listeners for the arrow buttons to scroll the carousel left and right
  arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
  });

  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
      carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }
    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if (!container.matches(":hover")) autoPlay();
  };

  const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
  };

  autoPlay();
  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", infiniteScroll);
  container.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  container.addEventListener("mouseleave", autoPlay);
});

setTimeout(function() {
  document.querySelector(".body-falso").classList.toggle("loader2");
}, 5000);

document.addEventListener("DOMContentLoaded", function() {
  var barraFondo = document.querySelector('.barra-fondo');
  var porcentaje = 0;

  var intervalo = setInterval(function() {
      if (porcentaje >= 100) {
          clearInterval(intervalo);
      } else {
          porcentaje += 1;
          barraFondo.style.width = porcentaje + '%';
      }
  }, 50);
});

var swiper = new Swiper('.blog-slider', {
  spaceBetween: 30,
  effect: 'fade',
  loop: true,
  mousewheel: {
    invert: false,
  },
  // autoHeight: true,
  pagination: {
    el: '.blog-slider__pagination',
    clickable: true,
  }
});

