window.renderOrder = function(orderProducts) {
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
