window.renderIndex = function(products) {
    let html = [
        '<tr>',
            '<th>Title</th>',
            '<th>Description</th>',
            '<th>Price</th>',
            '<th>Image</th>',
            '<th>Add</th>',
        '</tr>'
    ].join('');

    $.each(products, function (key, product) {
        html += [
            '<tr>',
                '<td>' + product.title + '</td>',
                '<td>' + product.description + '</td>',
                '<td>' + product.price + '</td>',
                '<td><img src=' + 'images/' + product.image_path + '></td>',
                '<td><a href=#add/' + product.id + '>Add</a></td>',
            '</tr>'
        ].join('');
    });

    return html;
}
