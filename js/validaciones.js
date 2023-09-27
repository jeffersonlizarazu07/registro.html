export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    console.log(input);
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }
    else {
        input.parentElement.classList.remove("input-contactainer--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMissmatch",
    "customError",
];

const mensajeDeError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio",
    },
    email: {
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "El campo correo no puede estar vacio",
        patternMismatch: "Debe contener entre 6 y 12 carácteres, debe contener al menos una letra mayuscula y una minúscula, al menos un número y no puede contener carácteres especiales."
    },
    nacimiento: {
        valueMissing: "El campo contraseña no puede estar vacio",
        customError: "Debe ser mayor de edad"
    }

    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es XXX XXXXXXX 10 números",
    },

    direccion: {
        valueMissing: "El campo correo no puede estar vacio",
        patternMismatch: "La dirección debe contener entre |0 a 40 carácteres",
    },
    ciudad: {
        valueMissing: "El campo contraseña no puede estar vacio",
        customError: "La dirección debe contener entre |4 a 30 carácteres",
    }

    estado: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La dirección debe contener entre |4 a 30 carácteres",
    },
},

const validadores = {
    nacimiento: (input) => validarNacimiento(input),
}

function mostrarMensajeDeError(tipoDeInput, input) {
    tipoDeErrores.forEach((error) => {
        if (input.validity(error)) {
            console.log(tipoDeInput, error);
            console.log(input.validity((error)));
            console.log(mensajeDeError[tipoDeInput][error]);
            mensaje = mensajeDeError[tipoDeInput][error];
        };
    });
    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (mayorDeEdad(fechaCliente)) {
        mensaje = "Debe ser mayor de edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date()
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}