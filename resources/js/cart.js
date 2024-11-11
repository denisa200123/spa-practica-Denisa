window.renderCart = function(products) {
    let html = [
        '<tr>',
            displayProductDetails(),
            '<th>Remove</th>',//translate
        '</tr>'
    ].join('');

    $.each(products, function (key, product) {
        html += [
            '<tr>',
                displayProduct(product),
                `<td><a href="#remove/${product.id}">Remove</a></td>`,
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
    `;//translate

    if(products.length > 0) {
        $('.cart .checkoutForm').html(htmlCheckoutForm);
    }

    return html;
}
