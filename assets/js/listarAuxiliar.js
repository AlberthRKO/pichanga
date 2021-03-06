var auxiliares = Array();
var actualIdAuxiliar;
var ciAnterior;

$(document).ready(function(){
    getTodosAuxiliares();
    listarAuxiliares();
});

$('#btnEditar').click(function (e) {
    e.preventDefault();
    let ci = $('#ci').val();
    if(ci == ciAnterior)
        $('#ci').val(ci+"$");
    if (hayError())
        return;
    editar();
});

$('#btnEliminar').click(function (e) {
    let idAuxiliar = actualIdAuxiliar;
    let url = "php/controlador/ControladorAuxiliar.php";
    let data = {
        request: 'eliminar',
        idAuxiliar: idAuxiliar
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: result => {
            $('#cerrarModalEliminar').click();
        }
    });
    Swal.fire({
        type: 'success',
        title: 'CORRECTO',
        text: '¡Auxiliar eliminado exitosamente!',
        animation: true
    }).then(() => {
        $('#row'+idAuxiliar).fadeOut();
    });
});

function editar() {
    let idAuxiliar = actualIdAuxiliar;
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
        request: 'editar',
        idAuxiliar: idAuxiliar,
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
            $('#cerrarModalEditar').click();
        }
    });
    Swal.fire({
        type: 'success',
        title: 'CORRECTO',
        text: '¡Auxiliar editado exitosamente!',
        animation: true
    }).then(() => {
        window.location = "listarAuxiliar.html";
    });
}

function getTodosAuxiliares() {
    let url = "php/controlador/ControladorAuxiliar.php";
    data = {
        'request': 'getTodosAuxiliares'
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: function (result) {
            if (result.trim() != "empty")
                auxiliares = JSON.parse(result.trim());
        }
    });
}

function listarAuxiliares(){
    //let departamentos = {'CH.':'Chuquisaca','TJ.':"Tarija",'PD.':'Pando','SC.':'Santa Cruz','LP.':'La Paz','OR.':'Oruro','CB.':'Cochabamba','PO.':'Potosí','BE.':'Beni'};
    let aux2 = [];
    auxiliares.forEach(auxiliar => {
        aux2[auxiliar.idAuxiliar] = auxiliar;
        let nombre = auxiliar.nombres + " " + auxiliar.apellidos;
        let ci = auxiliar.ci + auxiliar.expedido;
        let idAuxiliar = auxiliar.idAuxiliar;
        //let departamento = departamentos[auxiliar.complemento];
        let ciudad = auxiliar.ciudad;
        let conocimientos = auxiliar.conocimientos;
        let etiquetaConcimientos = getConocimientosHtml(conocimientos);
        let foto = auxiliar.foto;
        let telefono = auxiliar.telefono;
        let calificacion = 0;
        if(auxiliar.tareaRealizada != 0)
            calificacion = auxiliar.tareaSuma/auxiliar.tareaRealizada;
        let saldo = getEtiquetaSaldo(auxiliar.saldo);

            html = `<tr id="row${idAuxiliar}">
                        <td>
                            <div class="d-inline-block align-middle">
                                <img src="assets/images/user/${foto}" alt="user image"
                                    class="img-radius wid-40 align-top m-r-15">
                                <div class="d-inline-block">
                                    <h6>${nombre} <span style="color:#FF4F5A;">(${idAuxiliar})</span></h6>
                                    <p class="text-muted m-b-0">${ciudad}</p>
                                </div>
                            </div>
                        </td>
                        <td><a href="https://wa.me/591${telefono}" target="_blank">${telefono}</a></td>
                        <td>${etiquetaConcimientos}</td>
                        <td><i class="feather icon-star-on text-warning"></i>
                            ${calificacion}
                        </td>
                        <td>${saldo}</td>
                        <td>
                            <a class="success p-0" type="button" 
                                onclick="mostrarEditarAuxiliarModal(${idAuxiliar});">
                                <i class="feather icon-edit"></i>
                            </a>
                            <a class="success p-0" type="button" data-toggle="modal"
                                onclick="mostrarEliminarModal(${idAuxiliar});">
                                <i class="feather icon-x"></i>
                            </a>
                            <a class="success p-0" type="button" onclick="mostrarSaldoAuxiliarModal(${idAuxiliar});">
                                <i class="feather icon-credit-card"></i>
                            </a>
                            <a class="success p-0" type="button" data-toggle="modal"
                                onclick="mostrarPerfilAuxiliarModal(${idAuxiliar});">
                                <i class="feather icon-eye"></i>
                            </a>
                        </td>
                    </tr>`;
        $('#tabla').append(html);
    });
    auxiliares = aux2;
}

function getEtiquetaSaldo(saldo){
    let html = "";
    if(saldo >= 0)
        html = `<label class="badge badge-light-success">${saldo} Bs</label>`;
    else
        html = `<label class="badge badge-light-danger">${saldo} Bs</label>`;
    return html;
}

function getTodosSaldosPorAuxiliar(idAuxiliar){
    let saldos = [];
    let url = "php/controlador/ControladorSaldo.php";
    data = {
        request: 'getTodosSaldosPorAuxiliar',
        idAuxiliar: idAuxiliar
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: function (result) {
            if (result.trim() != "empty")
                saldos = JSON.parse(result.trim());
        }
    });
    return saldos;
}

function mostrarSaldoAuxiliarModal(idAuxiliar){
    actualIdAuxiliar = idAuxiliar;
    let fullName = `${auxiliares[idAuxiliar].nombres} ${auxiliares[idAuxiliar].apellidos} (${idAuxiliar})`;
    $('.modalMovimientos').html(fullName);
    let saldos = getTodosSaldosPorAuxiliar(idAuxiliar);
    let montoTotal = 0;
    let html = "";
    saldos.forEach(saldo => {
        if(saldo.monto > 0)
            html += '<tr class="p-3 mb-2 bg-success text-white">';
        else
            html += '<tr class="p-3 mb-2 bg-danger text-white">';
        html +=     `
                        <td>${saldo.descripcion}</td>
                        <td>${saldo.monto} Bs.</td>
                    </tr>`;
        montoTotal += saldo.monto;
    });
    $('#saldos').html(html);
    let textColor = "";
    let ultimoMovimiento = saldos[saldos.length-1] == undefined ? 0 : saldos[saldos.length-1].monto;
    if(ultimoMovimiento > 0)
        textColor = "text-success";
    else
        textColor = "text-danger";
    $('#ultimoMovimiento').html(`<label class="elevacion font-weight-bold text-dark">Último Movimiento</label>
                                 <p class="text-muted font-weight-bold ${textColor}">${ultimoMovimiento} Bs.</p>`);
    if(montoTotal > 0)
        textColor = "text-success";
    else
        textColor = "text-danger";
    $('#saldoActual').html(`<label class="elevacion font-weight-bold text-dark">Saldo Actual</label>
                            <p class="text-muted font-weight-bold ${textColor}">${montoTotal} Bs.</p>`);
    $('#saldoAuxiliarModal').modal("show");
}

function mostrarPerfilAuxiliarModal(idAuxiliar){
    $('#perfilFoto').attr("src","assets/images/user/" + auxiliares[idAuxiliar].foto )
    $('#perfilId').html("ID: " + idAuxiliar);
    $('#perfilNombres').html(auxiliares[idAuxiliar].nombres);
    $('#perfilApellidos').html(auxiliares[idAuxiliar].apellidos);
    $('#perfilCi').html(auxiliares[idAuxiliar].ci + " " + auxiliares[idAuxiliar].expedido);
    $('#perfilCiudad').html(auxiliares[idAuxiliar].ciudad);
    $('#perfilTelefono').html(`<a href="https://wa.me/591${auxiliares[idAuxiliar].telefono}" target="_blank">${auxiliares[idAuxiliar].telefono}</a>`);
    $('#perfilCorreo').html(auxiliares[idAuxiliar].correo);
    $('#perfilCuenta').html(auxiliares[idAuxiliar].cuenta);
    $('#perfilBanco').html(auxiliares[idAuxiliar].banco);
    $('#perfilSaldo').html(auxiliares[idAuxiliar].saldo);
    let calificacion = 0;
    if(auxiliares[idAuxiliar].tareaRealizada != 0)
        calificacion = auxiliares[idAuxiliar].tareaSuma/auxiliares[idAuxiliar].tareaRealizada;
    $('#perfilCalificacion').html(calificacion);
    let conocimientosHtml = getPerfilConocimientos(idAuxiliar);
    $('#perfilConocimientos').html(conocimientosHtml);
    $('#perfilAuxiliarModal').modal("show");
}

function getPerfilConocimientos(idAuxiliar){
    let conocimientos = JSON.parse(auxiliares[idAuxiliar].conocimientos);
    let htmlConocimientos = "";
    conocimientos.forEach(conocimiento => {
        if(htmlConocimientos != "")
            htmlConocimientos += ", "
        htmlConocimientos+=conocimiento;
    });
    return htmlConocimientos;
}

function mostrarEditarAuxiliarModal(idAuxiliar){
    limpiarModal();
    actualIdAuxiliar = idAuxiliar;
    contadorConocimientosEnVista = 0;
    contadorConocimientos = 0;
    
    /*$('div.dz-success').remove(); 
    $('div.dz-message').html("ASDF");*/
    $('#nombres').val(auxiliares[idAuxiliar].nombres);
    $('#apellidos').val(auxiliares[idAuxiliar].apellidos);
    $('#ci').val(auxiliares[idAuxiliar].ci);
    ciAnterior = auxiliares[idAuxiliar].ci;
    $('#expedido').val(auxiliares[idAuxiliar].expedido);
    $('#ciudad').val(auxiliares[idAuxiliar].ciudad);
    $('#telefono').val(auxiliares[idAuxiliar].telefono);
    $('#correo').val(auxiliares[idAuxiliar].correo);
    $('#cuenta').val(auxiliares[idAuxiliar].cuenta);
    $('#banco').val(auxiliares[idAuxiliar].banco);
    let conocimientos = JSON.parse(auxiliares[idAuxiliar].conocimientos);
    $('#conocimientos').html("");
    for(let i=0; i<conocimientos.length; i++)
        agregarConocimiento(event,conocimientos[i]);
    $('#editarAuxiliarModal').modal("show");
}

function mostrarEliminarModal(idAuxiliar){
    actualIdAuxiliar = idAuxiliar;
    let html = `<p>ID.: <span class="font-weight-bold">${idAuxiliar}
                        </span>
                <br>Estas seguro que quieres eliminar al auxiliar
                <span class="font-weight-bold">
                    ${auxiliares[idAuxiliar].nombres} ${auxiliares[idAuxiliar].apellidos}
                </span>?</p>`;
    $('#eliminarModalBody').html(html);
    $('#eliminarAuxiliarModal').modal("show");
}

function limpiarModal(){
    let alertas = ['Nombres',"Apellidos","Ci","Ci1","Ci2","Telefono","Ciudad"];
    alertas.forEach(alerta => {
        $('#alerta'+alerta).removeClass("alert alert-danger");
        $('#alerta' + alerta +'Mensaje').fadeOut();  
    })
}

function getConocimientosHtml(conocimientos){
    let html = "";
    conocimientos = JSON.parse(conocimientos);
    conocimientos.forEach(conocimiento => {
        if(html != "")
            html += "<br>";
        html += conocimiento;
    });
    return html;
}

function agregarConocimiento(e,conocimiento) {
    e.preventDefault();
    contadorConocimientosEnVista++;
    contadorConocimientos++;
    let html = `<div data-role="appendRow" id="grupoConocimiento${contadorConocimientos}">
                    <div class="form-inline form-group">
                        <input input type="text"
                            class="form-control mb-2 mr-sm-2 col-12 col-sm-9 col-md-8 col-lg-9"
                            id="conocimiento${contadorConocimientos}" placeholder="Area de conocimiento"
                            value="${conocimiento==undefined?'':conocimiento}"
                            >
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

$('#btnGuardarMovimiento').click(function(event){
    event.preventDefault();
    addMovimiento();
});

function addMovimiento(){
    let idAuxiliar = actualIdAuxiliar;
    let descripcion = $('#descripcionMovimiento').val();
    let monto = $('#montoMovimiento').val();
    let url = "php/controlador/ControladorSaldo.php";
    data = {
        request: 'insertar',
        monto: monto,
        descripcion: descripcion,
        idAuxiliar: idAuxiliar
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: function (result) {
            console.log(result);
            if(result == "OK"){
                $('#saldoAuxiliarModal').modal("hide");
                $('#nuevaRegistro').modal("hide");
                Swal.fire({
                    type: 'success',
                    title: 'CORRECTO',
                    text: '¡Saldo insertado exitosamente!',
                    animation: true
                }).then(() => {
                    location.reload();
                });
            }
        }
    });
}

function removeConocimiento(e, idConocimiento) {
    e.preventDefault();
    if (contadorConocimientosEnVista == 1)
        return;
    $('#grupoConocimiento' + idConocimiento).fadeOut();
    $('#conocimiento' + idConocimiento).val("");
    contadorConocimientosEnVista--
}