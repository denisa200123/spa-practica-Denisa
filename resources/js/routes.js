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
                console.log('/cart/' + window.location.hash.split('#add')[1] + '/add');
                $.ajax('/cart/' + window.location.hash.split('#add')[1] + '/add', {
                    dataType: 'json',
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
