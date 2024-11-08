window.displayProductDetails = function() {
    let html = [
        '<th>Title</th>',
        '<th>Description</th>',
        '<th>Price</th>',
        '<th>Image</th>',
    ]
    return html;
}

window.displayProduct = function(product) {
    let html = [
        '<td>' + product.title + '</td>',
        '<td>' + product.description + '</td>',
        '<td>' + product.price + '</td>',
        '<td><img src=' + 'images/' + product.image_path + '></td>',
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
