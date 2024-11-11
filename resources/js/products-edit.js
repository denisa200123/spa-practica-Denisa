window.renderEditForm = function (product) {
    let htmlEditForm = `
        <input type="text" id="title" name="title" value="${product.title}">
        <input type="number" name="price" id="price" step="0.01" min="0" value="${product.price}">
        <input type="text" id="description" name="description" value="${product.description}">
        <input type="file" name="image" id="image">

        <input type="submit" value="Edit" class="btn btn-warning">
    `;//translate
    return htmlEditForm;
}
