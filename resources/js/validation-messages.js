window.success = function(message) {
    $('.success').html(message);
    $('.success').css('display', 'block');
    $('.success').fadeOut(2000);
}

window.showError = function(message) {
    $('.error').html(message);
    $('.error').css('display', 'block');
    $('.error').fadeOut(2000);
}
