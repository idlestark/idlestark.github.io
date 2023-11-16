/*setTimeout(function() {
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
  });*/

  document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');

    function fadeIn() {
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (cardTop < windowHeight - 100) {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }
        });
    }

   window.addEventListener('scroll', function () {
        fadeIn(cards[0], 0);  
        fadeIn(cards[1], 2000);  
        fadeIn(cards[2], 3000); 
    });
});



