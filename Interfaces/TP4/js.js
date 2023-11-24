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
let spiderRojo = document.getElementById('rojo')
let telaraña = document.getElementById('telaraña-izqueirda')

document.addEventListener('scroll', function() {
  
  let scrollPos = window.pageYOffset;
  
  if ( scrollPos > 185 ) {
    header.classList.add('activo')
    botonComprar.classList.add('activo-comprar')
    menuHamburguesa.classList.add('activo-menu')
    logoHeader.classList.add('activo-logo')
    spiderRojo.classList.add('spiderman-rojo-activo')
    telaraña.classList.add('telaraña-izqueirda-activo')
  } else {
    header.classList.remove('activo')
    botonComprar.classList.remove('activo-comprar')
    menuHamburguesa.classList.remove('activo-menu')
    logoHeader.classList.remove('activo-logo')
    spiderRojo.classList.remove('spiderman-rojo-activo')
    telaraña.classList.remove('telaraña-izqueirda-activo')
  }
  
  
});

const menu_btn = document.querySelector('.boton-menu');
	

	menu_btn.addEventListener('click', function () {
		menu_btn.classList.toggle('is-active');

	});


  document.addEventListener("DOMContentLoaded", function() {
    var sidebar = document.querySelector('.sidebar');
    var items = document.querySelectorAll('.item');
  
    function animateSidebar(index) {
      if (index < items.length) {
        setTimeout(function() {
          items[index].style.transform = 'translateX(0)';
          animateSidebar(index + 1);
        }, 500);
      }
    }
  
    function toggleSidebar() {
      var currentLeft = parseInt(sidebar.style.left, 10) || 0;
  
      if (currentLeft === 0) {
        sidebar.style.left = '-250px'; 
        items.forEach(function(item) {
          item.style.transform = 'translateX(-100%)';
        });
      } else {
        sidebar.style.left = '0';
        animateSidebar(0);
      }
    }
  
    document.querySelector('.boton-menu').addEventListener('click', toggleSidebar);
    

    toggleSidebar();
  });

  var miDiv = document.getElementById('sprite');
  var posicionFinal = 1100;
  
  function moverDiv() {
    miDiv.animate(
      [
        { transform: 'translateX(0px)' },
        { transform: `translateX(${posicionFinal}px)` }
      ],
      {
        duration: 10000,
        easing: 'ease-in-out'
      }
    ).onfinish = function () {
      miDiv.style.transform = `translateX(${posicionFinal}px)`;
      miDiv.addEventListener('mouseenter', rotarImagen);
      miDiv.addEventListener('mouseleave', resetearImagen);
    };
  }
  
  function rotarImagen() {
    moverDiv();
  }
  
  function resetearImagen() {
    miDiv.style.transform = 'translateX(0px)';
  }
  
  moverDiv();



  var miDiv2 = document.getElementById('sprite2');
  var posicionFinal2 = 300;

  function moverDiv2() {
    miDiv2.animate(
      [
        { transform: 'translateY(0px) rotate(-90deg)' },
        { transform: `translateY(-${posicionFinal2}px)` }
      ],
      {
        duration: 10000,
        easing: 'ease-in-out' 
      }
    ).onfinish = function () {
      miDiv2.style.transform = `translateY(-${posicionFinal2}px)`;
    };
  }

  moverDiv2();

  let rojo = document.getElementById('rojo');
  let telaraña_izqueirda = document.getElementById('telaraña-izqueirda');
  let negro = document.getElementById('negro');
  let telaraña_derecha = document.getElementById('telaraña-derecha');
  let ed_izquierda = document.getElementById('ed-izquierda');
  let ed_derecha = document.getElementById('ed-derecha');
  let blanco = document.getElementById('blanco');
  let ed_centro = document.getElementById('ed-centro')

  function actualizarEstilos() {
    let valor = window.scrollY;

    rojo.style.transform = `translateY(${valor * 3.5}px)`;
    telaraña_izqueirda.style.transform = `translateY(${valor * 3.5}px)`;
    negro.style.transform = `translateX(${valor * 2.4}px)`;
    telaraña_derecha.style.transform = `translateX(${valor * 2.4}px)`;
    ed_izquierda.style.transform = `translateX(${valor * -1.2}px)`;
    ed_derecha.style.transform = `translateX(${valor * 1.4}px)`;
    blanco.style.transform = `translateX(${valor * -2.9}px)`;
    ed_centro.style.transform = `translateY(${valor * -3.3}px)`;

    requestAnimationFrame(actualizarEstilos);
  }

  actualizarEstilos();

  window.addEventListener('scroll', function () {
    cancelAnimationFrame(requestAnimationFrame(actualizarEstilos));
  });


  var duende = document.querySelector('.duende-gigante');
  var posicionInicial = duende.getBoundingClientRect().top + window.scrollY;

  window.addEventListener('scroll', function() {
      var scrollPosition = window.scrollY;
      var slowScroll = (scrollPosition - posicionInicial) * 0.1;
      duende.style.transform = 'translate(0, ' + slowScroll + 'px)';
  });

  var tarjeta = document.querySelector('.tarjeta');
  var posicionInicial = tarjeta.getBoundingClientRect().top + window.scrollY;


  var limiteSuperior = 7700;

  window.addEventListener('scroll', function() {
      var scrollPosition = window.scrollY;
      if (scrollPosition > limiteSuperior) {
          window.scrollTo(0, limiteSuperior);
      }
  });


