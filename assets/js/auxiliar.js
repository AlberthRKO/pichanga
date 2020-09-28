var foto = "";
var contadorConocimientosEnVista = 1;
var contadorConocimientos = 1;

$('#btnRegistrar').click(function (e) {
    e.preventDefault();
    if (hayError())
        return;
    insertar();
});

function hayError() {
    let errorTelefono = validarTelefono();
    let errorCi1 = validarCi();
    let errorCi2 = validarCiExistente();
    let errorApellidos = validarApellidos();
    let errorNombres = validarNombres();
    if (errorNombres || errorApellidos || errorCi1 || errorCi2 || errorTelefono)
        return true;
    return false;
}

function validarNombres() {
    let nombres = $('#nombres').val();
    if (nombres.trim() != "") {
        $('#alertaNombres').removeClass("alert alert-danger");
        $('#alertaNombresMensaje').fadeOut();
        return false;
    }
    else {
        $('#alertaNombres').addClass("alert alert-danger");
        $('#alertaNombresMensaje').fadeIn();
        $('#nombres').focus();
        return true;
    }
}

function validarApellidos() {
    let apellidos = $('#apellidos').val();
    if (apellidos.trim() != "") {
        $('#alertaApellidos').removeClass("alert alert-danger");
        $('#alertaApellidosMensaje').fadeOut();
        return false;
    }
    else {
        $('#alertaApellidos').addClass("alert alert-danger");
        $('#alertaApellidosMensaje').fadeIn();
        $('#apellidos').focus();
        return true;
    }
}

function validarTelefono() {
    let telefono = $('#telefono').val();
    if (telefono.trim() != "") {
        $('#alertaTelefono').removeClass("alert alert-danger");
        $('#alertaTelefonoMensaje').fadeOut();
        return false;
    }
    else {
        $('#alertaTelefono').addClass("alert alert-danger");
        $('#alertaTelefonoMensaje').fadeIn();
        $('#telefono').focus();
        return true;
    }
}

function validarCi() {
    let ci = $('#ci').val();
    if (ci.trim() != "") {
        $('#alertaCi').removeClass("alert alert-danger");
        $('#alertaCiMensaje1').fadeOut();
        return false;
    }
    else {
        $('#alertaCi').addClass("alert alert-danger");
        $('#alertaCiMensaje1').fadeIn();
        $('#ci').focus();
        return true;
    }
}

function validarCiExistente() {
    if ($('#ci').val().trim() == "")
        return false;
    let ci = $('#ci').val().trim();
    let exists = checkAuxiliar(ci);
    if (!exists) {
        $('#alertaCi').removeClass("alert alert-danger");
        $('#alertaCiMensaje2').fadeOut();
        return false;
    }
    else {
        $('#alertaCi').addClass("alert alert-danger");
        $('#alertaCiMensaje2').fadeIn();
        $('#ci').focus();
        return true;
    }
}

function checkAuxiliar(ci) {
    let exists;
    let url = "php/controlador/ControladorAuxiliar.php";
    let data = {
        request: 'getByCi',
        ci: ci
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: result => {
            if (result != "empty")
                exists = true;
        }
    });
    return exists;
}

function insertar() {
    let nombres = darFormato($('#nombres').val());
    let apellidos = darFormato($('#apellidos').val());
    let ci = $('#ci').val();
    let expedido = $('#expedido').val();
    let ciudad = darFormato($('#ciudad').val());
    let telefono = $('#telefono').val().trim();
    let correo = $('#correo').val().trim().toLowerCase();
    let cuenta = $('#cuenta').val();
    let banco = $('#banco').val();
    let conocimientos = JSON.stringify(getConocimientos());
    let url = "php/controlador/ControladorAuxiliar.php";
    let data = {
        request: 'insertar',
        nombres: nombres,
        apellidos: apellidos,
        ci: ci,
        expedido: expedido,
        ciudad: ciudad,
        telefono: telefono,
        correo: correo,
        foto: foto,
        cuenta: cuenta,
        banco: banco,
        conocimientos: conocimientos
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: result => {
            console.log(result);
        }
    });
    Swal.fire({
        type: 'success',
        title: 'CORRECTO',
        text: '¡Auxiliar añadido exitosamente!',
        animation: true
    }).then(() => {
        window.location = "auxiliar.html";
    });
}

function getConocimientos() {
    let conocimientos = Array();
    for (let i = 1; i <= contadorConocimientos; i++)
        if ($('#conocimiento' + i).val() != "")
            conocimientos.push(darFormato($('#conocimiento' + i).val()));
    return conocimientos;
}

function darFormato(cadena) {
    let result = cadena.trim().toLowerCase();
    result = result.replace(/\b\w/g, l => l.toUpperCase());
    return result;
}

function addConocimiento(e) {
    e.preventDefault();
    contadorConocimientosEnVista++;
    contadorConocimientos++;
    let html = `<div data-role="appendRow" id="grupoConocimiento${contadorConocimientos}">
                    <div class="form-inline form-group">
                        <input input type="text"
                            class="form-control mb-2 mr-sm-2 col-12 col-sm-9 col-md-8 col-lg-9"
                            id="conocimiento${contadorConocimientos}" placeholder="Otra area de conocimiento">

                        <!-- file upload ends-->
                        <div class="mx-auto">
                            <button
                                class="btn btn-sm btn-outline-danger rounded-circle mr-2 mb-2 botoncitoX"
                                onclick="removeConocimiento(event,${contadorConocimientos})">
                                <i class="feather icon-x"></i>
                            </button>
                            <button
                                class="btn btn-sm btn-outline-primary rounded-circle mb-2 botoncitoMas"
                                onclick="addConocimiento(event);">
                                <i class="feather icon-plus"></i>
                            </button>
                        </div>
                    </div> <!-- /div.form-inline -->
                </div>`;
    $('#conocimientos').append(html);
}

function removeConocimiento(e, idConocimiento) {
    e.preventDefault();
    if (contadorConocimientosEnVista == 1)
        return;
    $('#grupoConocimiento' + idConocimiento).fadeOut();
    $('#conocimiento' + idConocimiento).val("");
    contadorConocimientosEnVista--
}