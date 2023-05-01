//! Letras normales
let letras = ['C', 'D', 'H', 'S'];
//! Letras especiales
let especiales = ['A', 'J', 'K', 'Q'];

//! Baraja de cartas
let deck = [];

//* Referencias a bts
let btnNuevo = document.querySelector('#btnNuevo');
let btnPedir = document.querySelector('#btnPedir');
let btnDetener = document.querySelector('#btnDetener');

//* Referenciaas a puntajes
let puntajes = document.querySelectorAll('small');

//* Referencia a cajas
let cartasJugador = document.querySelector('#cartas-jugador');
let cartasComputadora = document.querySelector('#cartas-computadora');
 
//* Puntajes 
let puntajeUsuario = 0, puntajeComputadora = 0;

//! Funcion que genera la baraja
const generarBaraja = () => {

    //! Generamos primera parte de a baraja (con numeros)
    for(let i=2; i<=10; i++){
        for(let letra of letras){
            deck.push(i + letra);
        }
    }
    
    //! Generamos la segunda parte de la baraja (con letras especiales)
    for(let especial of especiales){
        for(let letra of letras){
            deck.push(especial + letra);
        }
    }
    
    //! Desordenamos la baraja
    deck = _.shuffle(deck);

    return deck;
}

generarBaraja();

const pedirCarta = () => {

    let eleccion;

    if(0===deck.length){
        console.log('Ya no quedan cartas');
    }else{
        eleccion = deck.pop();
        // console.log(eleccion);
        // console.log({deck});
    }
    return eleccion;
}


const obtenerValor = (cadena) => {

    let valor = cadena.substring(0, (cadena.length-1));

    return (!isNaN(valor)) ? valor = Number(valor) : 
    (valor === 'A') ? valor = 11 : valor = 10;
}

//* Turno de la computadora
const turnoComputadora = ( puntosJugador ) => {

    do {
        
        const carta = pedirCarta();
        puntajeComputadora = puntajeComputadora + obtenerValor(carta);
        puntajes[1].innerText = puntajeComputadora;

        let cartaFisica = document.createElement('img');

        cartaFisica.src = `assets/cartas/${carta}.png`;
        cartaFisica.classList.add('cartasPosicion');
        cartasComputadora.append( cartaFisica );

    } while ( (puntajeComputadora < puntosJugador) && (puntosJugador<=21) );

}


btnPedir.addEventListener('click', () => {

    //* Almacenamos la carta (string)
    const carta = pedirCarta();

    //* Generamos el puntaje del usuario
    puntajeUsuario = puntajeUsuario + obtenerValor(carta);
    
    //* Insertamos el puntaje del usuario en su <small> correspondiente
    puntajes[0].innerText = puntajeUsuario;

    //* Creamos un elemento img
    let cartaFisica = document.createElement('img');

    //* Construimos la ruta de la imagen con la variable que contiene la carta y se la asignamos al elemento img creado
    cartaFisica.src = `assets/cartas/${carta}.png`;
    //* Agregamos la clase construida en css al elemento img creado
    cartaFisica.classList.add('cartasPosicion');

    //* Insertamos el elemento img en el area del jugador
    cartasJugador.append( cartaFisica );

    if(puntajeUsuario===21){
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntajeUsuario);
        if(puntajeComputadora===21){
            alert('TENEMOS UN EMPATEEEEEEE...');
        }else{
            alert('Ganaste!!!');
        }
    }else if(puntajeUsuario>21){
        turnoComputadora();
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        alert('La computadora ha ganado');
    }

});


btnDetener.addEventListener('click', () => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntajeUsuario);

    if(puntajeComputadora===21){
        alert('La computadora ha ganado');
    }else if(puntajeComputadora>21){
        alert('Ganaste!!!');
    }else if(puntajeComputadora == puntajeUsuario){
        alert('TENEMOS UN EMPATEEEEEEE...');
    }

});

btnNuevo.addEventListener('click', () => {

    console.log({deck});

    deck = [];

    puntajeUsuario = 0;
    puntajeComputadora = 0;

    puntajes[0].innerText = puntajeUsuario;
    puntajes[1].innerText = puntajeComputadora;

    deck = generarBaraja();

    btnDetener.disabled = false;
    btnPedir.disabled = false;

    cartasJugador.innerText = null;
    cartasComputadora.innerText = null;

    console.log({deck});

});