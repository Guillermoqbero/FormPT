const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	dni: /^[0-9]{8}[A-Za-z]{1}$/, // 4 a 12 digitos.
	correo: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
	telefono: /^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}$/, // 7 a 14 numeros.
};

const campos = {
	nombre: false,
	apellido: false,
	correo: false,
	telefono: false,
	dni: false,
};

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "apellido":
			validarCampo(expresiones.apellido, e.target, "apellido");
			break;
		case "nombre":
			validarCampo(expresiones.nombre, e.target, "nombre");
			break;
		case "dni":
			validarCampo(expresiones.dni, e.target, "dni");
			break;
		case "correo":
			validarCampo(expresiones.correo, e.target, "correo");
			validarPassword2();
			break;
		case "correo2":
			validarPassword2();
			break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, "telefono");
			break;
	}
};

const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document
			.getElementById(`grupo__${campo}`)
			.classList.remove("formulario__grupo-incorrecto");
		document
			.getElementById(`grupo__${campo}`)
			.classList.add("formulario__grupo-correcto");
		document
			.querySelector(`#grupo__${campo} i`)
			.classList.add("fa-check-circle");
		document
			.querySelector(`#grupo__${campo} i`)
			.classList.remove("fa-times-circle");
		document
			.querySelector(`#grupo__${campo} .formulario__input-error`)
			.classList.remove("formulario__input-error-activo");
		campos[campo] = true;
	} else {
		document
			.getElementById(`grupo__${campo}`)
			.classList.add("formulario__grupo-incorrecto");
		document
			.getElementById(`grupo__${campo}`)
			.classList.remove("formulario__grupo-correcto");
		document
			.querySelector(`#grupo__${campo} i`)
			.classList.add("fa-times-circle");
		document
			.querySelector(`#grupo__${campo} i`)
			.classList.remove("fa-check-circle");
		document
			.querySelector(`#grupo__${campo} .formulario__input-error`)
			.classList.add("formulario__input-error-activo");
		campos[campo] = false;
	}
};

const validarPassword2 = () => {
	const inputEmail1 = document.getElementById("correo");
	const inputEmail2 = document.getElementById("correo2");

	if (
		inputEmail1.value !== inputEmail2.value ||
		inputEmail2.value.length == 0
	) {
		document
			.getElementById(`grupo__correo2`)
			.classList.add("formulario__grupo-incorrecto");
		document
			.getElementById(`grupo__correo2`)
			.classList.remove("formulario__grupo-correcto");
		document
			.querySelector(`#grupo__correo2 i`)
			.classList.add("fa-times-circle");
		document
			.querySelector(`#grupo__correo2 i`)
			.classList.remove("fa-check-circle");
		document
			.querySelector(`#grupo__correo2 .formulario__input-error`)
			.classList.add("formulario__input-error-activo");
		campos["correo"] = false;
	} else {
		document
			.getElementById(`grupo__correo2`)
			.classList.remove("formulario__grupo-incorrecto");
		document
			.getElementById(`grupo__correo2`)
			.classList.add("formulario__grupo-correcto");
		document
			.querySelector(`#grupo__correo2 i`)
			.classList.remove("fa-times-circle");
		document
			.querySelector(`#grupo__correo2 i`)
			.classList.add("fa-check-circle");
		document
			.querySelector(`#grupo__correo2 .formulario__input-error`)
			.classList.remove("formulario__input-error-activo");
		campos["correo"] = true;
	}
};

inputs.forEach((input) => {
	input.addEventListener("keyup", validarFormulario);
	input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
	e.preventDefault();
	if (
		campos.apellido &&
		campos.nombre &&
		campos.dni &&
		campos.correo &&
		campos.telefono
	) {
		document
			.querySelectorAll(".formulario__grupo-correcto")
			.forEach((icono) => {
				icono.classList.remove("formulario__grupo-correcto");
			});
	} else {
		document
			.getElementById("formulario__mensaje")
			.classList.add("formulario__mensaje-activo");
	}

	// CONNECT SEND DATA
	var http = new XMLHttpRequest();
	var url = "controller.php";
	const nombre = document.getElementById("nombre").value;
	const apellido = document.getElementById("apellido").value;
	const dni = document.getElementById("dni").value;
	const correo = document.getElementById("correo").value;
	const correo2 = document.getElementById("correo2").value;
	const telefono = document.getElementById("telefono").value;
	var params = `action=insert&nombre=${nombre}&apellido=${apellido}&dni=${dni}&correo=${correo}&correo2=${correo2}&telefono=${telefono}`;
	http.open("POST", url, true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.onreadystatechange = function () {
		if (http.readyState == 4 && http.status == 200) {
			if (http.responseText == "OK") {
				const formularioOK = document.getElementById(
					"formulario__mensaje-exito"
				);
				formularioOK.classList.add("formulario__mensaje-exito-activo");
			} else {
				console.log("error");
			}
		}
	};
	http.send(params);
});
