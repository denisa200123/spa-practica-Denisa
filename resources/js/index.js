window.renderIndex = function(products) {
    let html = [
        '<tr>',
            displayProductDetails(),
            '<th>Add</th>',//translate
        '</tr>'
    ].join('');

    $.each(products, function (key, product) {
        html += [
            '<tr>',
                displayProduct(product),
                `<td><a href="#add/${product.id}">Add</a></td>`,
            '</tr>'
        ].join('');
    });

    return html;
}
