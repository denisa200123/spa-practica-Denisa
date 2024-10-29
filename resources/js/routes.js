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
            case (window.location.hash.match(/#add\d+/)):
                $('.index').show();
                $.ajax('/cart/{product}/add', {
                    dataType: 'json',
                    data: {'id': window.location.hash.split('#add')[1]},
                    success: function (response) {
                        $('.index .list').html(renderList(response));
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
