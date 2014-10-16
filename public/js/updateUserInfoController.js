(function(){
    $('#update-profile').on('click', function () {
        var userProfile = {};
        userProfile.username = $('#username').text();
        userProfile.points = $('#points').val();
        httpRequester.put(window.location.href, 'PUT', JSON.stringify(userProfile));
    });
}())