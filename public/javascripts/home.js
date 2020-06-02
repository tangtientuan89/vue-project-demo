
var text = 'WELLCOME';
var arrText=[];

for(var i=0;i<text.length;i++){
    arrText.push(text[i])
}
arrText.forEach(function(element,index){
   return setTimeout(function () {
        $('.text1').append(element)
    }, 200*index)
});

/////
setTimeout(function () {
    $('.text2').html('Please login or register to use Web application')
}, 1700)
//////
setTimeout(function () {
    $('.btn').html('<a href="/login"><button class="btn-login">Login</button></a><a href="/register"><button class="btn-register">Register</button></a>')
}, 2700)


