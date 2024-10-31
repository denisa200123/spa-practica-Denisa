console.log('rute');
$(document).ready(function () {
    window.onhashchange = function () {
        $('.page').hide();

        switch(window.location.hash) {
            //cart page
            case '#cart':
                $('.page').hide();
                $('.cart').show();
                $.ajax({
                    url: '/cart',
                    dataType: 'json',
                    success: function (response) {
                        // Render the products in the cart list
                        $('.cart .list').html(renderCart(response));
                    }
                });
                break;

            //add product to cart
            case (window.location.hash.match(/#add\d+/) || {}).input:
                $('.page').hide();
                $('.index').show();
                let addedProduct = window.location.hash.split('#add')[1];
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    type: 'post',
                    url: '/cart/' + addedProduct + '/add',
                    dataType: 'json',
                    success: function () {
                        window.location.hash = "#";
                        window.onhashchange();
                    },
                });
                break;

            //remove product from cart
            case (window.location.hash.match(/#remove\d+/) || {}).input:
                $('.page').hide();
                $('.cart').show();
                let removedProduct = window.location.hash.split('#remove')[1];
                $.ajax({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    type: 'post',
                    url: '/cart/' + removedProduct + '/clear',
                    dataType: 'json',
                    success: function () {
                        window.location.hash = "#cart";
                        window.onhashchange();
                    },
                });
                break;

            //index page
            default:
                $('.page').hide();
                $('.index').show();
                $.ajax({
                    url: '/',
                    dataType: 'json',
                    success: function (response) {
                        $('.index .list').html(renderIndex(response));
                    }
                });
                break;
        }
    }
    window.onhashchange();
});
