console.log('rute');
$(document).ready(function () {
    window.onhashchange = function () {
        $('.page').hide();

        switch(window.location.hash) {
            case '#cart':
                $('.cart').show();
                $.ajax('/cart', {
                    dataType: 'json',
                    success: function (response) {
                        $('.cart .list').html(renderList(response));
                    }
                });
                break;
            default:
                $('.index').show();
                $.ajax('/', {
                    dataType: 'json',
                    success: function (response) {
                        $('.index .list').html(renderList(response));
                    }
                }); 
                break;
        }
    }
    window.onhashchange();
});
