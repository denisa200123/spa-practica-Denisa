window.renderOrder = function(orderProducts) {
    let html = [
        '<tr>',
            '<th>Title</th>',
            '<th>Description</th>',
            '<th>Price</th>',
            '<th>Image</th>',
        '</tr>'
        ].join('');

        $.each(orderProducts, function (key, product) {
            html += [
                '<tr>',
                    '<td>' + product.title + '</td>',
                    '<td>' + product.description + '</td>',
                    '<td>' + product.price + '</td>',
                    '<td><img src=' + 'images/' + product.image_path + '></td>',
                '</tr>'
            ].join('');
        });

    return html;
}
