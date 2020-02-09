
$('#btn-login').on('click', function () {
    let username = $('#username').val()
    let password = $('#password').val()
    $.ajax({
        type: "POST",
        url: "/login",
        data: {
            username: username,
            password: password
        },
        dataType: "json"
    })
    .then(function(res){
        console.log(res.status);
        if(res.status==400||res.status==401){
            alert(res.message)
            window.location.href='/login';
        }
        else{
            setCookie('token',res,1);
            window.location.href='/task';
        }
        
    })
})


function setCookie(token,value,timeExpries){
    var newDay = new Date()
    newDay.setTime(timeExpries*1000*60*60*24+newDay.getTime());
    return document.cookie=(`${token}=${value};expries=${newDay.toUTCString()}`);
}






// $('button').on('click',function(){
//     var getCookie=document.cookie.split('=')
//     $.ajax({
//         type: "GET",
//         url: "/cookie",
//         data: getCookie[1],
//         dataType: "dataType",
//         success: function (response) {
            
//         }
//     });
// })
