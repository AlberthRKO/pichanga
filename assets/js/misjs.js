$('.filtrable .filter2').toggle('d-none')

$('.filtrable').click(function () {
    $('.filtrable .filter').toggle('d-none');
    $('.filtrable .filter2').toggle('d-inline-block');
})