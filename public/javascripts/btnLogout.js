//button logout
$("#btn-logout").on("click", function() {
  let token = document.cookie.split("=")[1];
  $.ajax({
    type: "POST",
    url: "/logout",
    data: token,
    dataType: "json"
  }).then(function(data) {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    window.location.href = "/home";
  });
});
