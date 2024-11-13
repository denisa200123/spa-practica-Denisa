window.renderProducts = function(products) {
    let html = [
        '<tr>',
            displayProductDetails(),
            '<th class="translatable" data-key="Edit"></th>',
            '<th class="translatable" data-key="Remove"></th>',
        '</tr>'
    ].join('');

    $.each(products, function (key, product) {
        html += [
            '<tr>',
                displayProduct(product),
                `<td><a href="#edit/${product.id}" class="translatable" data-key="Edit"></a></td>`,
                `<td><a href="#delete/${product.id}" class="translatable" data-key="Remove"></a></td>`,
            '</tr>'
        ].join('');
    });

    return html;
}

window.searchProductForm = function() {
    let html = [
        '<input type="text" name="searchedProduct" id="searchedProduct" placeholder="Search">',
        '<input type="submit" value="Search" class="btn btn-info">'
    ].join('');

    return html;
}

window.orderForm = function(value) {
    let html = [
        '<select name="orderBy" id="orderBy">',
            '<option value="none" class="translatable" data-key="None"></option>',
            `<option value="title" ${value === 'title' ? "selected" : ""} class="translatable" data-key="Name"></option>`,
            `<option value="price" ${value === 'price' ? "selected" : ""} class="translatable" data-key="Price"></option>`,
            `<option value="description" ${value === 'description' ? "selected" : ""} class="translatable" data-key="Description"></option>`,
        '</select>',
    ].join('');

    return html;
}

window.renderPagination = function(response) {
    let paginationHtml = '';

    if (response.prev_page_url) {
        paginationHtml += `<button onclick="loadProducts('${response.prev_page_url}')" class="translatable" data-key="Previous"></button>`;
    }
    if (response.next_page_url) {
        paginationHtml += `<button onclick="loadProducts('${response.next_page_url}')" class="translatable" data-key="Next"></button>`;
    }

    return paginationHtml;
}

window.loadProducts = function(url) {
    $.ajax({
        url: url,
        dataType: 'json',
        success: function (response) {
            $('.products .list').html(renderProducts(response.data));
            $('.products .searchProductForm').html(searchProductForm());
            $('.products .orderForm').html(orderForm(orderBy.value));
            $('.products .pagination').html(renderPagination(response));
            $('.products .translatable').each(function() {
                let key = $(this).data('key');
                $(this).text(__(key));
            });
        }
    });
}
