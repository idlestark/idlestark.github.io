setTimeout(function() {
    document.querySelector(".body-falso").classList.toggle("loader2");
  }, 5000);
  
  document.addEventListener("DOMContentLoaded", function() {
    var barraFondo = document.querySelector('.barra-fondo');
    var porcentaje = 0;
    var porcentajeElement = document.querySelector('.porcentaje'); 
  
    var intervalo = setInterval(function() {
        if (porcentaje >= 100) {
            clearInterval(intervalo);
        } else {
            porcentaje += 1;
            barraFondo.style.width = porcentaje + '%';
            porcentajeElement.textContent = porcentaje + '%'; 
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
  
    pagination: {
      el: '.blog-slider__pagination',
      clickable: true,
    }
  });
