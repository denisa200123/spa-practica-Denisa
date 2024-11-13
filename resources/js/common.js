window.displayProductDetails = function() {
    let html = [
        '<th class="translatable" data-key="Name"></th>',
        '<th class="translatable" data-key="Description">Description</th>',
        '<th class="translatable" data-key="Price">Price</th>',
        '<th class="translatable" data-key="Image">Image</th>',
    ]
    return html;
}

window.displayProduct = function(product) {
    let html = [
        '<td>' + product.title + '</td>',
        '<td>' + product.description + '</td>',
        '<td>' + product.price + '</td>',
        `<td><img src="images/${product.image_path}"></td>`,
    ]
    return html;
}

window.updateHeader = function(){
    $.ajax({
        url: '/header',
        success: function (html) {
            $('header').html(html);
        }
    });
}

window.success = function(message) {
    $('.success').html(message);
    $('.success').css('display', 'block');
    $('.success').fadeOut(2000);
}

window.showError = function(message) {
    $('.error').html(message);
    $('.error').css('display', 'block');
    $('.error').fadeOut(2000);
}

window.renderProduct = function(orderProducts) {
    let html = [
        '<tr>',
            displayProductDetails(),
        '</tr>'
        ].join('');

        $.each(orderProducts, function (key, product) {
            html += [
                '<tr>',
                    displayProduct(product),
                '</tr>'
            ].join('');
        });

    return html;
}

let translations = {};

window.loadTranslations = function(callback) {
    $.ajax({
        url: '/translations',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            translations = response;
            if (callback) callback();
        },
    });
}

window.__ = function(key) {
    console.log('key: ', translations[key] || key);
    return translations[key] || key;
}
