const board = document.getElementById("board");
const condicionesGanar = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];
let eleccionesPlayerCirculo = [];
let eleccionesPlayerEquis = [];
let contadorTurno = 0;
let contadorGeneral = 0;
let turnoJugador = document.getElementById("turnoJugador");

function mostrarBoard() {
  board.classList.remove("ocultar");
  crearCuadrados();
}

function crearCuadrados() {
  for (let index = 0; index < 9; index++) {
    const divCelda = document.createElement("div");
    divCelda.classList.add("celda");
    const imagenCelda = document.createElement("img");
    imagenCelda.src = "img/question.png";
    imagenCelda.id = index;
    imagenCelda.addEventListener("click", mostrarImagenJugador);
    divCelda.appendChild(imagenCelda);
    board.appendChild(divCelda);
  }
}

function incrementarContadores() {
  contadorTurno++;
  contadorGeneral++;
}

function comprobarArraysIguales(array1, array2) {
  if (array1.length === array2.length) {
    return array1.every((e, i) => e === array2[i]);
  } else if (array1.length < array2.length) {
    let num;
    for (let indice = 0; indice < array2.length; indice++) {
      if (array1.includes(array2[indice]) === false) {
        num = array2[indice];
        break;
      } else {
        continue;
      }
    }
    let nuevoArray = array2.filter((indice) => indice !== num);
    return comprobarArraysIguales(array1, nuevoArray);
  }
}

function mostrarImagenJugador(e) {
  incrementarContadores();
  if (contadorTurno % 2 !== 0) {
    //Mi turno
    turnoJugador.textContent = "Turno del jugador O";
    e.target.src = "img/equis.png";
    e.target.removeEventListener("click", mostrarImagenJugador);
    eleccionesPlayerEquis.push(parseInt(e.target.id));
    comprobarGanador(eleccionesPlayerEquis.sort(), "Jugador X");
  } else {
    //Oponente turno
    turnoJugador.textContent = "Turno del jugador X";
    e.target.src = "img/circulo.png";
    e.target.removeEventListener("click", mostrarImagenJugador);
    eleccionesPlayerCirculo.push(parseInt(e.target.id));
    comprobarGanador(eleccionesPlayerCirculo.sort(), "Jugador O");
  }

  if (contadorGeneral === 9) {
    mostrarGanador(contadorGeneral);
  }
}

function comprobarGanador(array, nombre) {
  for (let index = 0; index < condicionesGanar.length; index++) {
    if (comprobarArraysIguales(condicionesGanar[index], array)) {
      reiniciarJuego(nombre, condicionesGanar[index]);
    }
  }
}

function reiniciarJuego(nombre, array) {
  let imagenes = document.querySelectorAll(".celda img");
  imagenes.forEach((element) => {
    element.removeEventListener("click", mostrarImagenJugador);
    if (array.includes(parseInt(element.id))) {
      element.parentNode.style.border = "3px solid green";
    }
  });
  mostrarGanador(undefined, nombre);
}

function mostrarGanador(contador, nombre) {
  if (contador !== undefined) {
    setTimeout(() => {
      alert("Empate");
      window.location.href = "index.html";
    }, 500);
  } else {
    setTimeout(() => {
      alert("Ganador: " + nombre);
      window.location.href = "index.html";
    }, 500);
  }
}

mostrarBoard();
