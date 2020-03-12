$('#btn-forgotPassword').click(function () {
    let email = $('#email').val()
    console.log(email);
    $.ajax({
        type: "POST",
        url: "/forgot-password",
        data: {
            email:email
        },
        dataType: "json"
    })
        .then(function (data) {
            if (data.code == 200) {
                return $('#text').html('A new password will sent to your email').css({'color':'white'})
            }
            if (data.code == 404) {
                $('#text').html(data.message).css({'color':'red'})
            }
        })
})