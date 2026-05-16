const fuerza = document.getElementById("fuerza");
const masa = document.getElementById("masa");

const fuerzaTexto = document.getElementById("fuerzaTexto");
const masaTexto = document.getElementById("masaTexto");
const aceleracionTexto = document.getElementById("aceleracionTexto");

const valorF = document.getElementById("valorF");
const valorM = document.getElementById("valorM");

const carro = document.getElementById("carro");
const llantas = document.querySelectorAll(".llanta");

let posicion = 50;
let velocidad = 0;
let animacion = null;
let pausado = false;

/* ACTUALIZAR DATOS */

fuerza.addEventListener("input", () => {

    valorF.innerText = fuerza.value + " N";
    fuerzaTexto.innerText = fuerza.value + " N";

    reiniciarSimulacion();
});

masa.addEventListener("input", () => {

    valorM.innerText = masa.value + " kg";
    masaTexto.innerText = masa.value + " kg";

    reiniciarSimulacion();
});

/* INICIAR */

function iniciarSimulacion() {

    // Evita múltiples simulaciones
    if (animacion !== null) return;

    let F = parseFloat(fuerza.value);
    let M = parseFloat(masa.value);

    let aceleracion = F / M;

    aceleracionTexto.innerText =
        aceleracion.toFixed(2) + " m/s²";

    velocidad = aceleracion * 3;

    llantas.forEach(llanta => {
        llanta.classList.add("girar");
    });

    pausado = false;

    animacion = setInterval(() => {

        if (!pausado) {

            posicion += velocidad;

            carro.style.left = posicion + "px";

            if (posicion > 1000) {

                detenerSimulacion();
            }
        }

    }, 30);
}

/* PAUSAR */

function pausarSimulacion() {

    pausado = !pausado;

    if (pausado) {

        llantas.forEach(llanta => {
            llanta.classList.remove("girar");
        });

    } else {

        llantas.forEach(llanta => {
            llanta.classList.add("girar");
        });
    }
}

/* DETENER */

function detenerSimulacion() {

    clearInterval(animacion);

    animacion = null;

    posicion = 50;

    carro.style.left = posicion + "px";

    llantas.forEach(llanta => {
        llanta.classList.remove("girar");
    });
}

/* REINICIAR SI CAMBIA FUERZA O MASA */

function reiniciarSimulacion() {

    detenerSimulacion();

    aceleracionTexto.innerText = "0 m/s²";
}