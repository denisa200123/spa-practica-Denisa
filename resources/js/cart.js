console.log('cart');
window.renderCart = function(products) {
    let html = [
        '<tr>',
            '<th>Title</th>',
            '<th>Description</th>',
            '<th>Price</th>',
            '<th>Image</th>',
            '<th>Remove</th>',
        '</tr>'
    ].join('');

    $.each(products, function (key, product) {
        html += [
            '<tr>',
                '<td>' + product.title + '</td>',
                '<td>' + product.description + '</td>',
                '<td>' + product.price + '</td>',
                '<td><img src=' + 'images/' + product.image_path + '></td>',
                '<td><a href=#remove' + product.id + '>Remove</a></td>',
            '</tr>'
        ].join('');
    });

    return html;
}
