function doc_keyUp(e) {

    // this would test for whichever key is 40 and the ctrl key at the same time
    if (e.keyCode == 13) {
        // call your function to do the thing
        login();
    }
}
// register the handler 
document.addEventListener('keyup', doc_keyUp, false);
//
$.ajax({
    type: "GET",
    url: "/do-list"
})
    .then(function (data) {
        console.log(document.cookie);
        if (document.cookie) {
            return window.location.href = '/do-list';
        }
    })
//function login
function login() {
    let email = $('#email').val()
    let password = $('#password').val()
    $.ajax({
        type: "POST",
        url: "/login",
        data: {
            email: email,
            password: password
        },
        dataType: "json"
    })
        .then(function (data) {
            if (data.code == 400) {
                alert(data.message.message)
                return window.location.href = '/login';
            }
            if (data.code == 200) {
                console.log('data client: ', data);
                setCookie(data, 1);
                if (data.type == 1) {
                    return window.location.href = '/admin';
                }
                window.location.href = '/do-list';
            }

        })
}
//btn login
$('#btn-login').click(function () {
    login()
})



function setCookie(data, timeExpries) {
    var newDay = new Date()
    newDay.setTime(timeExpries * 1000 * 60 * 60 * 24 + newDay.getTime());
     document.cookie = (`token=${data.token};expries=${newDay.toUTCString()}`);
     document.cookie = (`type=${data.type};expries=${newDay.toUTCString()}`);
}





