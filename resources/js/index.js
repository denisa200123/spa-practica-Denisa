window.renderIndex = function(products) {
    let html = [
        '<tr>',
            displayProductDetails(),
            '<th class="translatable" data-key="Add"></th>',
        '</tr>'
    ].join('');

    $.each(products, function (key, product) {
        html += [
            '<tr>',
                displayProduct(product),
                `<td><a href="#add/${product.id}" class="translatable" data-key="Add to cart"></a></td>`,
            '</tr>'
        ].join('');
    });

    return html;
}
