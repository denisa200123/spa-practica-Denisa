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

window.searchProductForm = function() {
    let html = [
        '<input type="text" name="searchedProduct" id="searchedProduct" placeholder="Search product">',
        '<input type="submit" value="Search" class="btn btn-info">'
    ].join('');

    return html;
}

window.orderForm = function() {
    let html = [
        '<select name="orderBy" id="orderBy">',
            '<option value="none">None</option>',
            '<option value="title">Title</option>',
            '<option value="price">Price</option>',
            '<option value="description">Description</option>',
        '</select>',
        '<input type="submit" value="Order" class="btn btn-info">'
    ].join('');

    return html;
}
