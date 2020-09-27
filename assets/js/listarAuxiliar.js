var auxiliares = Array();
var conocimientos = Array();

$(document).ready(function(){
    getTodosAuxiliares();
    getTodosConocimientos();
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

function getTodosConocimientos(){
    url = "php/controlador/ControladorConocimiento.php";
    data = {
        'request': 'getTodosConocimientos'
    };
    $.ajax({
        url: url,
        type: "POST",
        async: false,
        data: data,
        success: function (result) {
            if (result.trim() != "empty")
                conocimientos = JSON.parse(result.trim());
        }
    });
}

function listarAuxiliares(){
    //let departamentos = {'CH.':'Chuquisaca','TJ.':"Tarija",'PD.':'Pando','SC.':'Santa Cruz','LP.':'La Paz','OR.':'Oruro','CB.':'Cochabamba','PO.':'Potosí','BE.':'Beni'};
    auxiliares.forEach(auxiliar => {
        let nombre = auxiliar.nombres + " " + auxiliar.apellidos;
        let ci = auxiliar.ci + auxiliar.expedido;
        //let departamento = departamentos[auxiliar.complemento];
        let ciudad = auxiliar.ciudad;
        let etiquetaConcimientos = setConocimientosByAuxiliar(auxiliar);
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
                            <a class="success p-0" type="button" data-toggle="modal"
                                data-target="#editarAuxiliar">
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
}

function setConocimientosByAuxiliar(auxiliar){
    let html = "";
    conocimientos.forEach(conocimiento => {
        if(conocimiento.idAuxiliar == auxiliar.idAuxiliar){            
            if(html != "")
                html += "<br>";
            html += conocimiento.conocimiento;
        }
    });
    return html;
}