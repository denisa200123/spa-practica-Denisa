console.log('index');
window.renderList = function(products) {
    let html = [
        '<tr>',
            '<th>Title</th>',
            '<th>Description</th>',
            '<th>Price</th>',
        '</tr>'
    ].join('');

    $.each(products, function (key, product) {
        html += [
            '<tr>',
                '<td>' + product.title + '</td>',
                '<td>' + product.description + '</td>',
                '<td>' + product.price + '</td>',
            '</tr>'
        ].join('');
    });

    return html;
}
