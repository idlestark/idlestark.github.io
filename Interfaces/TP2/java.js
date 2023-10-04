const boton = document.querySelector('.contenedor_boton');
const nav = document.querySelector('.contenedor-generos');

boton.addEventListener('click',()=>{
    nav.classList.toggle('activo')
})