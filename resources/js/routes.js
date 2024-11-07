$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    //not working
    /*$(document).ajaxError(function (jqXHR) {
        //console.log(jqXHR.status);
        if (jqXHR.status === 403) {
            $('#error-message').text('Unauthorized').show();
            console.log("alert");
        } else if (jqXHR.status === 404) {
            $('#error-message').text('Page not found').show();
        }
        $('#error-message').fadeOut(2000);
    });*/

    //checkout form
    $('.checkoutForm').on('submit', function (e) {
        e.preventDefault();

        let checkoutData = $(this).serialize();

        $.ajax({
            type: 'post',
            url: '/checkout',
            dataType: 'json',
            data: checkoutData,
            success: function (response) {
                window.location.hash = "#";
                success(response.success);
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
            success: function (response) {
                $('.admin-header').html(renderAdminHeader());
                $('.auth-button').html('<a href="#logout" style="margin-right: 10px;" class="btn btn-dark">Logout</a>');
                window.location.hash = "#";
                success(response.success);
            },
            error: function (xhr) {
                showError(xhr.responseJSON.error);
            }
        });
    });

    //edit form
    $('.editProductForm').on('submit', function (e) {
        e.preventDefault();

        let editForm = new FormData();
        editForm.append('_method', 'PATCH');

        editForm.append('title', $('#title').val());
        editForm.append('description', $('#description').val());
        editForm.append('price', $('#price').val());

        if ($('#image')[0].files[0]) {
            editForm.append('image', $('#image')[0].files[0]);
        }

        $.ajax({
            type: 'POST',
            url: '/products/' + window.location.hash.split('#edit/')[1],
            dataType: 'json',
            data: editForm,
            enctype: 'multipart/form-data',
            contentType: false,
            processData: false,
            cache: false,
            success: function (response) {
                window.location.hash = "#products";
                success(response.success);
            },
            error: function (xhr) {
                showError(xhr.responseJSON.error);
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
            success: function (response) {
                window.location.hash = "#products";
                success(response.success);
            },
            error: function (xhr) {
                showError(xhr.responseJSON.error);
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
            case (window.location.hash.match(/#add\/\d+/) || {}).input:
                $('.index').show();
                let addedProduct = window.location.hash.split('#add/')[1];
                $.ajax({
                    type: 'post',
                    url: '/cart/' + addedProduct + '/add',
                    dataType: 'json',
                    success: function (response) {
                        window.location.hash = "#";
                        success(response.success);
                    },
                    error: function (xhr) {
                        window.location.hash = "#";
                        showError(xhr.responseJSON.error);
                    }
                });
                break;

            //remove product from cart
            case (window.location.hash.match(/#remove\/\d+/) || {}).input:
                $('.cart').show();
                let removedProduct = window.location.hash.split('#remove/')[1];
                $.ajax({
                    type: 'post',
                    url: '/cart/' + removedProduct + '/clear',
                    dataType: 'json',
                    success: function (response) {
                        window.location.hash = "#cart";
                        success(response.success);
                    },
                    error: function (xhr) {
                        window.location.hash = "#cart";
                        showError(xhr.responseJSON.error);
                    }
                });
                break;

            //login page
            case '#login':
                $.ajax({
                    url: '/login/form',
                    dataType: 'json',
                    success: function () {
                        $('.login').show();
                        $('.login .loginForm').html(renderLoginForm());
                        document.title = 'Login';
                    }
                });
                break;

            //logout
            case '#logout':
                $.ajax({
                    url: '/logout',
                    dataType: 'json',
                    success: function (response) {
                        $('.admin-header').empty();
                        $('.auth-button').html('<a href="#login" class="btn btn-dark">Admin login</a>');
                        window.location.hash = "#";
                        success(response.success);
                    }
                });
                break;

            //products page
            case '#products':
                $.ajax({
                    url: '/products',
                    dataType: 'json',
                    success: function (response) {
                        $('.products').show();
                        $('.products .list').html(renderProducts(response));
                        document.title = 'Products page';
                    },
                });
                break;

            //destroy product
            case (window.location.hash.match(/#delete\/\d+/) || {}).input:
                let productToDelete = window.location.hash.split('#delete/')[1];
                $.ajax({
                    method: 'DELETE',
                    url: '/products/' + productToDelete,
                    dataType: 'json',
                    success: function (response) {
                        $('.products').show();
                        window.location.hash = "#products";
                        success(response.success);
                    },
                    error: function (xhr) {
                        window.location.hash = "#products";
                        showError(xhr.responseJSON.error);
                    }
                });
                break;

            //edit product page
            case (window.location.hash.match(/#edit\/\d+/) || {}).input:
                let productToEdit = window.location.hash.split('#edit/')[1];
                $.ajax({
                    url: '/products/' + productToEdit + '/edit',
                    dataType: 'json',
                    success: function (response) {
                        $('.edit').show();
                        $('.edit .editProductForm').html(renderEditForm(response));
                        document.title = 'Edit product page';
                    },
                    error: function (xhr) {
                        window.location.hash = "#products";
                        showError(xhr.responseJSON.error);
                    }
                });
                break;

            //create product page
            case '#create':
                $.ajax({
                    url: '/products/create',
                    dataType: 'json',
                    success: function () {
                        $('.create').show();
                        $('.create .createProductForm').html(renderCreateForm());
                        document.title = 'Create product page';
                    },
                });
                break;

            //orders page
            case '#orders':
                $.ajax({
                    url: '/orders',
                    dataType: 'json',
                    success: function (response) {
                        $('.orders').show();
                        $('.orders .list').html(renderOrders(response));
                        document.title = 'Orders page';
                    },
                    error: function (xhr) {
                        showError(xhr.responseJSON.error);
                    }
                });
                break;

            //order page
            case (window.location.hash.match(/#order\/\d+/) || {}).input:
                $.ajax({
                    url: '/orders/' + window.location.hash.split('#order/')[1],
                    dataType: 'json',
                    success: function (response) {
                        $('.order').show();
                        $('.order .list').html(renderOrder(response));
                        document.title = 'Order page';
                    },
                    error: function (xhr) {
                        window.location.hash = "#orders";
                        showError(xhr.responseJSON.error);
                    }
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
                        document.title = 'Index';
                    }
                });
                break;
        }
    }

    window.onhashchange();
});
