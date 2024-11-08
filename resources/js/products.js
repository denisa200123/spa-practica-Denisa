window.renderProducts = function(products) {
    let html = [
        '<tr>',
            displayProductDetails(),
            '<th>Edit</th>',
            '<th>Remove</th>',
        '</tr>'
    ].join('');

    $.each(products, function (key, product) {
        html += [
            '<tr>',
                displayProduct(product),
                '<td><a href=#edit/' + product.id + '>Edit</a></td>',
                '<td><a href=#delete/' + product.id + '>Remove</a></td>',
            '</tr>'
        ].join('');
    });

    return html;
}

window.searchProduct = function() {
    let html = [
        '<input type="text" name="searchedProduct" id="searchedProduct" placeholder="Search product">',
        '<input type="submit" value="Search" class="btn btn-info">'
    ].join('');

    return html;
}
