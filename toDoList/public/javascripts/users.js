$('#btn-addUsers').on('click',function(){
    console.log('1');
    let username=$('#username').val()
    let password=$('#password').val()
    $.ajax({
        type: "POST",
        url: "/api/users",
        data: {username,password},
        dataType: "json",
    })
    .then(function(data){
        alert(data)
    })
})