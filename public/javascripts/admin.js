let ready = function () {
    $.ajax({
        type: "GET",
        url: "/api/admin"
    })
        .then( function (data) {
            $('#list-users').html('')
           data.forEach(user => {
                $('#list-users').append(`<div id="content">
                <p id="user">${user.email}</p>
                <p class="${user._id}">${user.status}</p> 
                <div id="btn">
                <button class="actived" onClick="activedUser('${user._id}')">Actived</button>
                <button class="blocked" onClick="blockUser('${user._id}')">Block</button>
                <button class="delete" onClick="deleteUser('${user._id}')">Delete</button>
                </div>
                </div>`)
                console.log(user._id);
                if ($(`.${user._id}`).html() == 'blocked') {
                    $(`.${user._id}`).css({ 'color': 'red' })
                }
            });
           
        })


}
ready()
let activedUser = function (idUser) {
    let status = 'actived'
    console.log('data', status);
    $.ajax({
        type: "PUT",
        url: "/api/admin/" + idUser + "/" + status,
        dataType: "json",
    })
        .then(function (data) {
            ready()
        })
}

let blockUser = function (idUser) {
    let status = 'blocked'
    console.log('data', status);
    $.ajax({
        type: "PUT",
        url: "/api/admin/" + idUser + "/" + status,
        dataType: "json",
    })
        .then(function (data) {
            return ready()
        })
}

let deleteUser = function (idUser) {
    $.ajax({
        type: "DELETE",
        url: "/api/admin/" + idUser,
        dataType: "json",
    })
        .then(function (data) {

            ready()
        })

}

// $('#actived').click(function(){
//     $('#list-users').html()
// ready()
// })

// $('#block').click(function(){
//     $('#list-users').html()
// ready()
// })
// $('#delete').click(function(){
//     $('#list-users').html()
// ready()
// })