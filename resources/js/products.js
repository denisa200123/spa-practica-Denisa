window.renderProducts = function(products) {
    let html = [
        '<tr>',
            '<th>Title</th>',
            '<th>Description</th>',
            '<th>Price</th>',
            '<th>Image</th>',
            '<th>Edit</th>',
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
                '<td><a href=#edit/' + product.id + '>Edit</a></td>',
                '<td><a href=#delete/' + product.id + '>Remove</a></td>',
            '</tr>'
        ].join('');
    });

    return html;
}
