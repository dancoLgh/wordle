//Cantidad de intentos
let intentos = 6;
//se define la api
const API = "https://random-word-api.herokuapp.com/word?lang=es&length=5";
fetch(API)
  .then((response) => response.json())
  //Se asigna la parabra y se convierte en MAYUSCULA
  .then((response) => {
    palabra = response[0].toUpperCase();
  })
  .catch((err) => {
    console.log("La API no responde, se usa lista local");
    let diccionario = ["APPLE", "HURLS", "WINGS", "YOUTH"];
    let palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
  });

const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);

const input = document.getElementById("guess-input");
const valor = input.value;

function intentar() {
  const GRID = document.getElementById("grid");
  const ROW = document.createElement("div");
  ROW.className = "row";

  const INTENTO = leerIntento();
  if (INTENTO === palabra) {
    terminar("<h1>GANASTE!😀</h1>");
    return;
  }

  for (let i in palabra) {
    const SPAN = document.createElement("span");
    SPAN.className = "letter";
    if (INTENTO[i] === palabra[i]) {
      //VERDE
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "green";
    } else if (palabra.includes(INTENTO[i])) {
      //AMARILLO
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "yellow";
    } else {
      //GRIS
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "grey";
    }
    ROW.appendChild(SPAN);
  }
  GRID.appendChild(ROW);
  intentos--;
  if (intentos == 0) {
    terminar(`<h1>PERDISTE!😖</h1>
              <p>La palabra era ${palabra}</p>`);
  }
}
function terminar(mensaje) {
  const INPUT = document.getElementById("guess-input");
  const BOTON = document.getElementById("guess-button");
  INPUT.disabled = true;
  BOTON.disabled = true;
  let contenedor = document.getElementById("guesses");
  contenedor.innerHTML = mensaje;
}
function leerIntento() {
  let intento = document.getElementById("guess-input");
  intento = intento.value;
  intento = intento.toUpperCase();
  return intento;
}
