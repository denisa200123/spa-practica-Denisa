$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    //checkout form
    $('.checkoutForm').on('submit', function (e) {
        e.preventDefault();

        let checkoutData = $(this).serialize();

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

        let loginData = $(this).serialize();

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

    //edit form
    $('.editProductForm').on('submit', function (e) {
        e.preventDefault();

        let editData = $(this).serialize();

        $.ajax({
            method: 'PATCH',
            url: '/products/' + window.location.hash.split('#edit')[1],
            dataType: 'json',
            data: editData,
            success: function () {
                window.location.hash = "#products";
            }
        });
    });

    //create form
    $('.createProductForm').on('submit', function (e) {
        e.preventDefault();

        let createData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: '/products',
            dataType: 'json',
            data: createData,
            success: function () {
                window.location.hash = "#products";
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
                        document.title = 'Your cart';
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
                    },
                });
                break;

            //login page
            case '#login':
                $('.login').show();
                $.ajax({
                    success: function () {
                        document.title = 'Login';
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
                        document.title = 'Products page';
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
                    },
                });
                break;

            //edit product page
            case (window.location.hash.match(/#edit\d+/) || {}).input:
                $('.edit').show();
                let productToEdit = window.location.hash.split('#edit')[1];
                $.ajax({
                    url: '/products/' + productToEdit + '/edit',
                    dataType: 'json',
                    success: function (response) {
                        document.title = 'Edit product page';
                        $('.edit .editProductForm').html(renderEditForm(response));
                    },
                });
                break;

            //create product page
            case '#create':
                $('.create').show();
                $.ajax({
                    success: function () {
                        document.title = 'Create product page';
                        $('.create .createProductForm').html(renderCreateForm());
                    },
                });
                break;

            //orders page
            case '#orders':
                $('.orders').show();
                $.ajax({
                    url: '/orders',
                    dataType: 'json',
                    success: function (response) {
                        document.title = 'Orders page';
                        $('.orders .list').html(renderOrders(response));
                    },
                });
                break;

            //order page
            case (window.location.hash.match(/#order\d+/) || {}).input:
                $('.order').show();
                $.ajax({
                    url: '/orders/' + window.location.hash.split('#order')[1],
                    dataType: 'json',
                    success: function (response) {
                        document.title = 'Order page';
                        $('.order .list').html(renderOrder(response));
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
                        document.title = 'Index';
                        $('.index .list').html(renderIndex(response));
                    }
                });
                break;
        }
    }
    window.onhashchange();
});
