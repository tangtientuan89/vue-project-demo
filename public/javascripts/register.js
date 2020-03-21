function doc_keyUp(e) {
  // this would test for whichever key is 40 and the ctrl key at the same time
  if (e.keyCode == 13) {
    // call your function to do the thing
    register();
  }
}
// register the handler
document.addEventListener("keyup", doc_keyUp, false);

//check validateEmail
function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  alert("You have entered an invalid email address!");
  return false;
}
//function register
function register() {
  let email = $("#email").val();
  let password = $("#password").val();
  let confirmPassword = $("#confirmPassword").val();
  if (password.length < 6) {
    return alert("Password must be at least 6 characters long");
  }
  if (password !== confirmPassword) {
    return alert("confirmPassword not match");
  }
  if (validateEmail(email) == true && password === confirmPassword) {
    $.ajax({
      type: "POST",
      url: "/register",
      data: { email, password },
      dataType: "json"
    }).then(function(data) {
      if (data.code == 404) {
        alert(data.message);
        return (window.location.href = "/register");
      }
      if (data.code == 200) {
        alert(data.message);
        return (window.location.href = "/login");
      }
    });
  }
}
//button register
$("#btn-register").on("click", function() {
  register();
});
