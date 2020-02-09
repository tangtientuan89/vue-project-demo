$('#btn-register').on('click', function () {
    var username = $('#username').val()
    var password=$('#password').val()

    $.ajax({
        type: "POST",
        url: "/register",
        data: {username,password},
        dataType: "json"
    }).then(function (value) {
        if(value.status==401){
            alert(value.message)
            window.location.href='/register';
        }
        else{
            window.location.href='/login'
        }
       
    })
})