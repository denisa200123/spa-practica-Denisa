window.updateHeader = function(){
    $.ajax({
        url: '/header',
        success: function (html) {
            $('header').html(html);
        }
    });
}
