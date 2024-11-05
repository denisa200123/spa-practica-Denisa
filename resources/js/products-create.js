window.renderCreateForm = function () {
    let htmlCreateForm = `
        <label for="title">Title</label>
        <input type="text" id="title" name="title" required>
        <label for="price">Price</label>
        <input type="number" name="price" id="price" step="0.01" min="0" required>
        <label for="description">Description</label>
        <input type="text" id="description" name="description" required>
        <!--<label for="image">Image</label>
        <input type="file" name="image" id="image" required>-->

        <input type="submit" value="Create" class="btn btn-success">
    `;
    return htmlCreateForm;
}
