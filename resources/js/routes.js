$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    //checkout form
    $('.checkoutForm').on('submit', function (e) {
        e.preventDefault();

        const checkoutData = $(this).serialize();

        $.ajax({
            type: 'post',
            url: '/checkout',
            dataType: 'json',
            data: checkoutData,
            success: function () {
                window.location.hash = "#";
            }
        });
    });

    //login form
    $('.loginForm').on('submit', function (e) {
        e.preventDefault();

        const loginData = $(this).serialize();

        $.ajax({
            type: 'post',
            url: '/login',
            dataType: 'json',
            data: loginData,
            success: function () {
                window.location.hash = "#";
            }
        });
    });

    window.onhashchange = function () {
        $('.page').hide();

        switch(window.location.hash) {
            //cart page
            case '#cart':
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
                $('.index').show();
                let addedProduct = window.location.hash.split('#add')[1];
                $.ajax({
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
                $('.cart').show();
                let removedProduct = window.location.hash.split('#remove')[1];
                $.ajax({
                    type: 'post',
                    url: '/cart/' + removedProduct + '/clear',
                    dataType: 'json',
                    success: function () {
                        window.location.hash = "#cart";
                        window.onhashchange();
                    },
                });
                break;

            //login page
            case '#login':
                $('.login').show();
                $.ajax({
                    success: function () {
                        $('.login .loginForm').html(renderLoginForm()); 
                    }
                });
                break;

            //logout
            case '#logout':
                $.ajax({
                    url: '/logout',
                    dataType: 'json',
                    success: function () {
                        window.location.hash = "#";
                    }
                });
                break;

            //products page
            case '#products':
                $('.products').show();
                $.ajax({
                    url: '/products',
                    dataType: 'json',
                    success: function (response) {
                        $('.products .list').html(renderProducts(response));
                    }
                });
                break;

            //destroy product
            case (window.location.hash.match(/#delete\d+/) || {}).input:
                $('.products').show();
                let productToDelete = window.location.hash.split('#delete')[1];
                $.ajax({
                    method: 'DELETE',
                    url: '/products/' + productToDelete,
                    dataType: 'json',
                    success: function () {
                        window.location.hash = "#products";
                        window.onhashchange();
                    },
                });
                break;

            //index page
            default:
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
