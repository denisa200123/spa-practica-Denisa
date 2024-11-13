window.renderOrders = function(orders) {
    let html = [
        '<tr>',
            '<th class="translatable" data-key="Order id"></th>',
            '<th class="translatable" data-key="Customer name""></th>',
            '<th class="translatable" data-key="Contact details"></th>',
            '<th class="translatable" data-key="Comments"></th>',
            '<th class="translatable" data-key="Total price"></th>',
            '<th class="translatable" data-key="Creation date"></th>',
            '<th class="translatable" data-key="Products"></th>',
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
                `<td><a href="#order/${order.id}" class="translatable" data-key="See products"></a></td>`,
            '</tr>'
        ].join('');
    });

    return html;
}
