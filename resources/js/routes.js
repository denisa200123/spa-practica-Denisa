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
                updateHeader();
                window.location.hash = "#";
                success(response.success);
            },
            error: function (response) {
                showError(response.responseJSON.error);
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

        let createForm = new FormData();

        createForm.append('title', $('#title').val());
        createForm.append('description', $('#description').val());
        createForm.append('price', $('#price').val());
        createForm.append('image', $('#image')[0].files[0]);

        $.ajax({
            type: 'POST',
            url: '/products',
            dataType: 'json',
            data: createForm,
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

    //search product form
    $('.searchProductForm').on('submit', function (e) {
        e.preventDefault();
        let searchedProduct = $('#searchedProduct').val();
        window.location.hash = "#products-found/" + searchedProduct;
    });

    //order products form
    $('.orderForm').on('submit', function (e) {
        e.preventDefault();

        let orderData = $(this).serialize();

        $.ajax({
            url: '/products/order',
            dataType: 'json',
            data: orderData,
            success: function (response) {
                $('.products .list').html(renderProducts(response));
            },
            error: function (response) {
                showError(response.responseJSON.error);
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
                        updateHeader();
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
                        $('.products .searchProductForm').html(searchProductForm());
                        $('.products .orderForm').html(orderForm());
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
                        $('.order .list').html(renderProduct(response));
                        document.title = 'Order page';
                    },
                    error: function (xhr) {
                        window.location.hash = "#orders";
                        showError(xhr.responseJSON.error);
                    }
                });
                break;

            //products found
            case (window.location.hash.match(/#products-found\/[^\/]+/) || {}).input:
                let productToSearch = window.location.hash.split('#products-found/')[1];
                $.ajax({
                    url: '/products/search/' + productToSearch,
                    dataType: 'json',
                    success: function (response) {
                        $('.products-found').show();
                        $('.products-found .list').html(renderProduct(response));
                        document.title = 'Products found';
                    },
                    error: function (xhr) {
                        window.location.hash = "#products";
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
