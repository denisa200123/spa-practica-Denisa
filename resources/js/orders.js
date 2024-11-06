window.renderOrders = function(orders) {
    let html = [
        '<tr>',
            '<th>Order id</th>',
            '<th>Date</th>',
            '<th>Customer name</th>',
            '<th>Contact details</th>',
            '<th>Comments</th>',
            '<th>Total price</th>',
            '<th>Products</th>',
        '</tr>'
    ].join('');

    $.each(orders, function (key, order) {
        html += [
            '<tr>',
                '<td>' + order.id + '</td>',
                '<td>' + order.created_at + '</td>',
                '<td>' + order.customer_name + '</td>',
                '<td>' + order.contact_details + '</td>',
                '<td>' + order.comments + '</td>',
                '<td>' + order.total_price + '</td>',
                '<td><a href=#order/' + order.id + '>See products</a></td>',
            '</tr>'
        ].join('');
    });

    return html;
}
