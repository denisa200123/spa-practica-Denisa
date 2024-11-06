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
                '<td><a href=#remove/' + product.id + '>Remove</a></td>',
            '</tr>'
        ].join('');
    });

    let htmlCheckoutForm = `
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>

        <label for="details">Order details</label>
        <input type="text" id="details" name="details" required">

        <label for="comments">Comments</label>
        <textarea id="comments" name="comments"></textarea>

        <br>

        <button type="submit" class="btn btn-primary">Place Order</button>
    `;

    if(products.length > 0) {
        $('.cart .checkoutForm').html(htmlCheckoutForm);
    }

    return html;
}
