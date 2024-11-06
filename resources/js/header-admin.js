window.renderAdminHeader = function() {
    let html = [
        '<div style="width: fit-content; height: fit-content;">',
            '<a href="#products" class="btn btn-dark">Products</a>',
            '<a href="#create" class="btn btn-dark" style="margin-left: 10px;">Create product</a>',
            '<a href="#orders" class="btn btn-dark" style="margin-left: 10px;">See orders</a>',
        '</div>',
    ];

    return html;
}
