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

document.addEventListener("mousemove", parallax);
function parallax(e){
    document.querySelectorAll(".objeto").forEach(function(move){
        var moving_value = move.getAttribute("data-value");
        var x = e.clientX * moving_value / 250;
        var y = e.clientY * moving_value / 250;

        move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
    });
}


let header = document.getElementById('header');
let botonComprar = document.getElementById('boton-comprar');
let menuHamburguesa = document.getElementById('menu-hamburguesa');
let logoHeader = document.getElementById('logo-header');

document.addEventListener('scroll', function() {
  
  // Get the scroll position
  let scrollPos = window.pageYOffset;
  
  if ( scrollPos > 135 ) {
    header.classList.add('activo')
    botonComprar.classList.add('activo-comprar')
    menuHamburguesa.classList.add('activo-menu')
    logoHeader.classList.add('activo-logo')
  } else {
    header.classList.remove('activo')
    botonComprar.classList.remove('activo-comprar')
    menuHamburguesa.classList.remove('activo-menu')
    logoHeader.classList.remove('activo-logo')
  }
  
  
});




