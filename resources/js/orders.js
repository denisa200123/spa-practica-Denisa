window.renderOrders = function(orders) {
    let html = [
        '<tr>',
            '<th>Order id</th>',
            '<th>Customer name</th>',
            '<th>Contact details</th>',
            '<th>Comments</th>',
            '<th>Total price</th>',
            '<th>Date</th>',
            '<th>Products</th>',
        '</tr>'
    ].join('');

    $.each(orders, function (key, order) {
        let date = new Date(order.created_at).toISOString().split('T')[0];
        html += [
            '<tr>',
                '<td>' + order.id + '</td>',
                '<td>' + order.customer_name + '</td>',
                '<td>' + order.contact_details + '</td>',
                '<td>' + order.comments + '</td>',
                '<td>' + order.total_price + '</td>',
                '<td>' + date + '</td>',
                '<td><a href=#order/' + order.id + '>See products</a></td>',
            '</tr>'
        ].join('');
    });

    return html;
}
