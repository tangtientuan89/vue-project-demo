$('#btn-change').click(function () {
    let password=$("#password").val()
    let newPassword =$("#newPassword").val()
    let confirmNewPassword=$("#confirmNewPassword").val()
    if(newPassword!=confirmNewPassword){
        return  alert('confirmNewPassword not match')
      }
    let data = {
        password: password,
        newPassword: newPassword
    }
    $.ajax({
        type: "POST",
        url: "/change-password",
        data: data,
        dataType: "json"

    })
        .then(function (data) {
            if (data.code == 200) {
                return alert(data.message)
            }
            if(data.code==404){
                return alert(data.message)
            }
        })
})