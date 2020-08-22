$('.filtrable .filter2').toggle('d-none')

$('.filtrable').click(function () {
    $('.filtrable .filter').toggle('d-none');
    $('.filtrable .filter2').toggle('d-inline-block');
})

// $('.botoncitoMas').click(function () {
//     $('.botoncitoX').toggle('d-none');
// });


$(".custom-file-input").on("change", function () {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});

$(function () {
    // Remove button click
    $(document).on(
        'click',
        '[data-role="appendRow"] > .form-inline [data-role="remove"]',
        function (e) {
            e.preventDefault();
            $(this).closest('.form-group').remove();
        }
    );
    // Add button click
    $(document).on(
        'click',
        '[data-role="appendRow"] > .form-group [data-role="add"]',
        function (e) {
            e.preventDefault();
            var container = $(this).closest('[data-role="appendRow"]');
            new_field_group = container.children().filter('.form-group:first-child').clone();
            new_field_group.find('label').html('Area de Conocimiento'); new_field_group.find('input').each(function () {
                $(this).val('');
            });
            container.append(new_field_group);
        }
    );

    $('.datepicker').pickadate({
        monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        weekdaysShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        today: 'Hoy',
        clear: 'Limpiar',
        close: '',

        // etiquetas de acceso, traduccion
        labelMonthNext: 'Siguiente mes',
        labelMonthPrev: 'Anterior mes',
        labelMonthSelect: 'Seleccione un mes',
        labelYearSelect: 'Seleccione un año',
        // botones de formato
        firstDay: 1,
        format: 'dddd, d !de mmmm !de yyyy', /* formato para el usuario  CARACTERES ESPECIALES LE METEMOS ! */
        formatSubmit: 'dd/mm/yyyy', //FORMATO PARA EL SERVIDOR
        // selector de añop y mes
        selectYears: false, //2 muestra un año antes y uno despues
        // elegimos fechas habilitadas en el date

        // funcion para el dia actual
        // onStart: function () {
        //     var date = new Date();
        //     this.set('select', [date.getFullYear(), date.getMonth(), date.getDate()])
        // }
    })


    $('#fechaFin').focus(function () {
        $('.fechita2').addClass('elevacion');

    });
    $('#fechaIni').focus(function () {
        $('.fechita').addClass('elevacion');

    });


});


// file upload

$(document).on('change', '.file-upload', function () {
    var i = $(this).prev('label').clone();
    var file = this.files[0].name;
    $(this).prev('label').text(file);
});






function bs_input_file() {
    $(".input-file").before(
        function () {
            if (!$(this).prev().hasClass('input-ghost')) {
                var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
                element.attr("name", $(this).attr("name"));
                element.change(function () {
                    element.next(element).find('input').val((element.val()).split('\\').pop());
                });
                $(this).find("button.btn-choose").click(function () {
                    element.click();
                });
                $(this).find("button.btn-reset").click(function () {
                    element.val(null);
                    $(this).parents(".input-file").find('input').val('');
                });
                $(this).find('input').css("cursor", "pointer");
                $(this).find('input').mousedown(function () {
                    $(this).parents('.input-file').prev().click();
                    return false;
                });
                return element;
            }
        }
    );
}
$(function () {
    bs_input_file();
});


const listaP = document.getElementById('listaPendiente')
const listaH = document.getElementById('listaHaciendo')
const listaT = document.getElementById('listaTerminada')

// console.log(lista)
Sortable.create(listaP, {
    group: 'shared',
    animation: 200,
    // quitar fantasma
    // clase para cuando agamos click
    chosenClass: "seleccion",
    // ghostClass: 'fantasma',
    dragClass: 'drago',
    // Metodos de Sortable
    onEnd: () => {
        // funcion que se ejecuta cuando el usuario suelte lo que este arrastrando
        console.log('se inserto algo 1')
    }
});
Sortable.create(listaH, {
    group: 'shared',
    animation: 200,
    // quitar fantasma
    // clase para cuando agamos click
    chosenClass: "seleccion",
    // ghostClass: 'fantasma',
    dragClass: 'drago',
    // Metodos de Sortable
    onEnd: () => {
        // funcion que se ejecuta cuando el usuario suelte lo que este arrastrando
        console.log('se inserto algo 2')
    }
});
Sortable.create(listaT, {
    group: 'shared',
    animation: 200,
    // quitar fantasma
    // clase para cuando agamos click
    chosenClass: "seleccion",
    // ghostClass: 'fantasma',
    dragClass: 'drago',
    // Metodos de Sortable
    onEnd: () => {
        // funcion que se ejecuta cuando el usuario suelte lo que este arrastrando
        console.log('se inserto algo 3')
    }
});