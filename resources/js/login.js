window.renderLoginForm = function() {
    let htmlLoginForm = `
        <label for="username" class="translatable" data-key="Username"></label>
        <input type="text" id="username" name="username" required">

        <label for="password" class="translatable" data-key="Password"></label>
        <input type="password" id="password" name="password" required">

        <br>

        <button type="submit" class="btn btn-primary">Login</button>
    `;
    return htmlLoginForm;
}
