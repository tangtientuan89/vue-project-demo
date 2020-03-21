let ready = function() {
  //call api get all users and render data
  $.ajax({
    type: "GET",
    url: "/api/admin"
  }).then(function(data) {
    if (data.code == 200) {
      return render(data.data);
    }
    if (data.code == 404) {
      return $("#list-users").html(data.message);
    }
  });
};
ready();
let render = function(data) {
  //data is a array users, render data to html
  $("#list-users").html("");
  data.forEach(user => {
    $("#list-users").append(`<div id="content">
         <p id="user">${user.email}</p>
         <p class="${user._id}">${user.status}</p> 
         <div id="btn">
         <button class="actived" onClick="activedUser('${user._id}')">Actived</button>
         <button class="blocked" onClick="blockUser('${user._id}')">Block</button>
         <button class="delete" onClick="deleteUser('${user._id}')">Delete</button>
         </div>
         </div>`);
    if ($(`.${user._id}`).html() == "blocked") {
      $(`.${user._id}`).css({ color: "red" });
    }
  });
};
//function click button active
let activedUser = function(idUser) {
  let status = "actived";
  $.ajax({
    type: "PUT",
    url: "/api/admin/" + idUser + "/" + status,
    dataType: "json"
  }).then(function(data) {
    ready();
  });
};
//function click button block
let blockUser = function(idUser) {
  let status = "blocked";
  $.ajax({
    type: "PUT",
    url: "/api/admin/" + idUser + "/" + status,
    dataType: "json"
  }).then(function(data) {
    return ready();
  });
};
//function click button delete
let deleteUser = function(idUser) {
  $.ajax({
    type: "DELETE",
    url: "/api/admin/" + idUser,
    dataType: "json"
  }).then(function(data) {
    ready();
  });
};
//button search
$("#btn-search").click(function() {
  let search = $("#search").val();
  $.ajax({
    type: "GET",
    url: "/api/admin/" + search,
    dataType: "json"
  }).then(function(data) {
    if (data.code == 200) {
      return render(data.data);
    }
    if (data.code == 404) {
      return $("#list-users").html(data.message);
    }
  });
});
