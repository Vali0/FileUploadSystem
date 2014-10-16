(function(){
    var counter = 0;
    $('#upload-more').on('click', function() {
        counter++;
        var inputFile = $('<input />').addClass('btn btn-sm').attr('type', 'file').attr('name', 'file_'+ counter);
        var isPrivate = $('<input />').attr('type','checkbox').attr('name', 'private_' + counter);
        var spanPrivate = $('<span />').text('Private');

        $('#form-upload').prepend(spanPrivate).prepend(isPrivate).prepend(inputFile);
    });
}())