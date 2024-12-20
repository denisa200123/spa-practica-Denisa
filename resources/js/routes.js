$(document).ready(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    loadTranslations(function() {
        $('.translatable').each(function() {
            let key = $(this).data('key');
            $(this).text(__(key));
        });
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
                window.location.hash = '#';
                success(response.success);
            },
            error: function (response) {
                $('.laravelErrors').remove();
                if (response.responseJSON.errors) {
                    $.each(response.responseJSON.errors, function (field, errors) {
                        let errorHtml = `<div class="laravelErrors alert-danger">${errors[0]}</div>`;
                        $(`#${field}`).after(errorHtml);
                    });
                }
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
                window.location.hash = '#';
                success(response.success);
            },
            error: function (response) {
                $('.laravelError').remove();

                if (response.responseJSON.errors) {
                    $.each(response.responseJSON.errors, function (field, errors) {
                        let errorHtml = `<div class="laravelError alert-danger">${errors[0]}</div>`;
                        $(`#${field}`).after(errorHtml);
                    });
                }

                if (response.responseJSON.error) {
                    showError(response.responseJSON.error);
                }
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

        let productToEdit = window.location.hash.split('#edit/')[1];
        $.ajax({
            type: 'POST',
            url: `/products/${productToEdit}`,
            dataType: 'json',
            data: editForm,
            enctype: 'multipart/form-data',
            contentType: false,
            processData: false,
            cache: false,
            success: function (response) {
                window.location.hash = '#products';
                success(response.success);
            },
            error: function (response) {
                $('.laravelError').remove();

                if (response.responseJSON.errors) {
                    $.each(response.responseJSON.errors, function (field, errors) {
                        let errorHtml = `<div class="laravelError alert-danger">${errors[0]}</div>`;
                        $(`#${field}`).after(errorHtml);
                    });
                }
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
                window.location.hash = '#products';
                success(response.success);
            },
            error: function (response) {
                $('.laravelError').remove();

                if (response.responseJSON.errors) {
                    $.each(response.responseJSON.errors, function (field, errors) {
                        let errorHtml = `<div class="laravelError alert-danger">${errors[0]}</div>`;
                        $(`#${field}`).after(errorHtml);
                    });
                }
            }
        });
    });

    //order products form
    $('.orderForm').on('change', function (e) {
        e.preventDefault();
        let orderData = $(this).serialize();

        $.ajax({
            url: '/products/order',
            dataType: 'json',
            data: orderData,
            success: function (response) {
                var orderBy = document.getElementById("orderBy");
                $('.products .list').html(renderProducts(response.data));
                $('.products .pagination').html(renderPagination(response));
                $('.products .orderForm').html(orderForm(orderBy.value));
                $('.products .translatable').each(function() {
                    let key = $(this).data('key');
                    $(this).text(__(key));
                });
            },
            error: function (response) {
                $('.laravelError').remove();

                if (response.responseJSON.errors) {
                    $.each(response.responseJSON.errors, function (field, errors) {
                        let errorHtml = `<div class="laravelError alert-danger">${errors[0]}</div>`;
                        $(`#${field}`).after(errorHtml);
                    });
                }

                if (response.responseJSON.error) {
                    showError(response.responseJSON.error);
                }
            }
        });
    });

    $('.searchProductForm').on('submit', function (e) {
        e.preventDefault();

        let orderData = $(this).serialize();

        $.ajax({
            url: '/products/order',
            dataType: 'json',
            data: orderData,
            success: function (response) {
                $('.products .list').html(renderProducts(response.data));
                $('.products .pagination').html(renderPagination(response));
                $('.products .translatable').each(function() {
                    let key = $(this).data('key');
                    $(this).text(__(key));
                });
            },
            error: function (response) {
                $('.laravelError').remove();

                if (response.responseJSON.errors) {
                    $.each(response.responseJSON.errors, function (field, errors) {
                        let errorHtml = `<div class="laravelError alert-danger">${errors[0]}</div>`;
                        $(`#${field}`).after(errorHtml);
                    });
                }

                if (response.responseJSON.error) {
                    showError(response.responseJSON.error);
                }
            }
        });
    });

    //change language form
    $('#languageForm').on('change', function (e) {
        e.preventDefault();

        let languageData = $(this).serialize();

        $.ajax({
            url: '/set-language',
            type: 'post',
            dataType: 'json',
            data: languageData,
            success: function () {
                loadTranslations(function() {
                    location.reload();
                });
            },
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
                        document.title = __('Your cart');
                        $('.cart .list').html(renderCart(response));
                        $('.cart .translatable').each(function() {
                            let key = $(this).data('key');
                            $(this).text(__(key));
                        });
                    }
                });
                break;

            //add product to cart
            case (window.location.hash.match(/#add\/\d+/) || {}).input:
                $('.index').show();
                let addedProduct = window.location.hash.split('#add/')[1];
                $.ajax({
                    type: 'post',
                    url: `/cart/${addedProduct}/add`,
                    dataType: 'json',
                    success: function (response) {
                        window.location.hash = '#';
                        success(response.success);
                    },
                    error: function (response) {
                        window.location.hash = '#';
                        showError(response.responseJSON.error);
                    }
                });
                break;

            //remove product from cart
            case (window.location.hash.match(/#remove\/\d+/) || {}).input:
                $('.cart').show();
                let removedProduct = window.location.hash.split('#remove/')[1];
                $.ajax({
                    type: 'post',
                    url: `/cart/${removedProduct}/remove`,
                    dataType: 'json',
                    success: function (response) {
                        window.location.hash = '#cart';
                        success(response.success);
                    },
                    error: function (response) {
                        window.location.hash = '#cart';
                        showError(response.responseJSON.error);
                    }
                });
                break;

            //login page
            case '#login':
                $.ajax({
                    url: '/login',
                    dataType: 'json',
                    success: function () {
                        $('.login').show();
                        $('.login .loginForm').html(renderLoginForm());
                        $('.login .translatable').each(function() {
                            let key = $(this).data('key');
                            $(this).text(__(key));
                        });
                        document.title = __('Login');
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
                        window.location.hash = '#';
                        success(response.success);
                    }
                });
                break;

            //products page
            case '#products':
                $.ajax({
                    url: '/products?page=1',
                    dataType: 'json',
                    success: function (response) {
                        $('.products').show();
                        $('.products .list').html(renderProducts(response.data));
                        $('.products .searchProductForm').html(searchProductForm());
                        $('.products .orderForm').html(orderForm());
                        $('.products .pagination').html(renderPagination(response));
                        $('.products .translatable').each(function() {
                            let key = $(this).data('key');
                            $(this).text(__(key));
                        });
                        document.title = __('Products');
                    },
                });
                break;

            //destroy product
            case (window.location.hash.match(/#delete\/\d+/) || {}).input:
                let productToDelete = window.location.hash.split('#delete/')[1];
                $.ajax({
                    method: 'DELETE',
                    url: `/products/${productToDelete}`,
                    dataType: 'json',
                    success: function (response) {
                        $('.products').show();
                        window.location.hash = '#products';
                        success(response.success);
                    },
                    error: function (response) {
                        window.location.hash = '#products';
                        showError(response.responseJSON.error);
                    }
                });
                break;

            //edit product page
            case (window.location.hash.match(/#edit\/\d+/) || {}).input:
                let productToEdit = window.location.hash.split('#edit/')[1];
                $.ajax({
                    url: `/products/${productToEdit}/edit`,
                    dataType: 'json',
                    success: function (response) {
                        $('.edit').show();
                        $('.edit .editProductForm').html(renderEditForm(response));
                        document.title = __('Edit product');
                    },
                    error: function (response) {
                        window.location.hash = '#products';
                        showError(response.responseJSON.error);
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
                        $('.create .translatable').each(function() {
                            let key = $(this).data('key');
                            $(this).text(__(key));
                        });
                        document.title = __('Create product');
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
                        $('.orders .translatable').each(function() {
                            let key = $(this).data('key');
                            $(this).text(__(key));
                        });
                        document.title = __('Orders');
                    },
                    error: function (response) {
                        showError(response.responseJSON.error);
                    }
                });
                break;

            //order page
            case (window.location.hash.match(/#order\/\d+/) || {}).input:
                let order = window.location.hash.split('#order/')[1];
                $.ajax({
                    url: `/orders/${order}`,
                    dataType: 'json',
                    success: function (response) {
                        $('.order').show();
                        $('.order h2').html(`Id: ${order}`);
                        $('.order .list').html(renderProduct(response));
                        $('.order .translatable').each(function() {
                            let key = $(this).data('key');
                            $(this).text(__(key));
                        });
                        document.title = __('Order');
                    },
                    error: function (response) {
                        window.location.hash = '#orders';
                        showError(response.responseJSON.error);
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
                        $('.index .translatable').each(function() {
                            let key = $(this).data('key');
                            $(this).text(__(key));
                        });
                        document.title = __('Home');
                    }
                });
                break;
        }
    }

    window.onhashchange();
});
