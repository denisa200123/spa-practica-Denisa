$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    //checkout form
    $('.checkoutForm').on('submit', function (e) {
        e.preventDefault();

        let name = $('#name').val();
        let details = $('#details').val();
        let comments = $('#comments').val();

        $.ajax({
            type: 'post',
            url: '/checkout',
            dataType: 'json',
            data: {
                'name': name,
                'details': details,
                'comments': comments,
            },
            success: function () {
                window.location.hash = "#";
            }
        });
    });

    //login form
    $('.loginForm').on('submit', function (e) {
        e.preventDefault();

        let username = $('#username').val();
        let password = $('#password').val();

        $.ajax({
            type: 'post',
            url: '/login',
            dataType: 'json',
            data: {
                'username': username,
                'password': password,
            },
            success: function () {
                window.location.hash = "#";
                window.onhashchange();
            }
        });
    });

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
                $('.page').hide();
                $('.login').show();
                $.ajax({
                    success: function () {
                        $('.login .loginForm').html(renderLoginForm()); 
                    }
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
