var auxiliares = Array();
var foto = "";
var contadorConocimientosEnVista = 0;
var contadorConocimientos = 0;

$(document).ready(function(){
    getTodosAuxiliares();
    listarAuxiliares();
});

function getTodosAuxiliares() {
    url = "php/controlador/ControladorAuxiliar.php";
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

            html = `<tr>
                        <td>
                            <div class="d-inline-block align-middle">
                                <img src="assets/images/user/${foto}" alt="user image"
                                    class="img-radius wid-40 align-top m-r-15">
                                <div class="d-inline-block">
                                    <h6>${nombre}</h6>
                                    <p class="text-muted m-b-0">${ciudad}</p>
                                </div>
                            </div>
                        </td>
                        <td><a href="https://wa.me/591${telefono}" target="_blank">${telefono}</a></td>
                        <td>${etiquetaConcimientos}</td>
                        <td><i class="feather icon-star-on text-warning"></i>
                            4.8
                        </td>
                        <td><label class="badge badge-light-primary">150 Bs</label></td>
                        <td>
                            <a class="success p-0" type="button" 
                                onclick="mostrarEditarAuxiliarModal(${idAuxiliar})">
                                <i class="feather icon-edit"></i>
                            </a>
                            <a class="success p-0" type="button" data-toggle="modal"
                                data-target="#eliminarAuxiliar">
                                <i class="feather icon-x"></i>
                            </a>
                            <a class="success p-0" type="button" data-toggle="modal"
                                data-target="#saldoAuxiliar">
                                <i class="feather icon-credit-card"></i>
                            </a>
                            <a class="success p-0" type="button" data-toggle="modal"
                                data-target="#perfilAuxiliar">
                                <i class="feather icon-eye"></i>
                            </a>
                        </td>
                    </tr>`;
        $('#tabla').append(html);
    });
    auxiliares = aux2;
}

function mostrarEditarAuxiliarModal(idAuxiliar){
    contadorConocimientosEnVista = 0;
    contadorConocimientos = 0;
    $('#nombres').val(auxiliares[idAuxiliar].nombres);
    $('#apellidos').val(auxiliares[idAuxiliar].apellidos);
    $('#ci').val(auxiliares[idAuxiliar].ci);
    $('#expedido').val(auxiliares[idAuxiliar].expedido);
    $('#telefono').val(auxiliares[idAuxiliar].telefono);
    $('#correo').val(auxiliares[idAuxiliar].correo);
    $('#cuenta').val(auxiliares[idAuxiliar].cuenta);
    $('#banco').val(auxiliares[idAuxiliar].banco);
    let conocimientos = JSON.parse(auxiliares[idAuxiliar].conocimientos);
    $('#conocimientos').html("");
    for(let i=0; i<conocimientos.length; i++){
        addConocimiento(event,conocimientos[i]);
    }
    $('#editarAuxiliarModal').modal("show");
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

function addConocimiento(e,conocimiento) {
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

function removeConocimiento(e, idConocimiento) {
    e.preventDefault();
    if (contadorConocimientosEnVista == 1)
        return;
    $('#grupoConocimiento' + idConocimiento).fadeOut();
    $('#conocimiento' + idConocimiento).val("");
    contadorConocimientosEnVista--
}