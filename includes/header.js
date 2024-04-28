document.querySelector('header').innerHTML = `
    <!-- Barra de navegación -->
    <div class="navbar">
        <!-- Logo -->
        <div class="logo">
            <a href="./" class="logo">
                <img id="logo_img" src="./css/img/favicon3.jpg">
                API Alchemy
            </a>
        </div>
        <!-- Enlaces de navegación -->
        <ul class="links">
            <li><a href="./">Home</a></li>
            <li><a class="logged-in" href="./editor.html">Editor de APIs</a></li>
        </ul>
        <!-- Enlaces y botones de acción -->
        <ul class="links">
            <li class="logged-out"><a href="sign.html" class="action_btn">Get Started</a></li>
            <li class="logged-in"><a href="sign.html" class="account">
                <div class="action_btn nAccount" id="nAccountNav"></div>
                <div id="iAccountNav"></div>
            </a></li>
        </ul>
        <!-- Botón de alternancia -->
        <div class="toggle_btn">
            <i class="fa-solid fa-bars"></i>
        </div>
    </div>
    <!-- Menú desplegable -->
    <div class="dropdown_menu">
        <li><a href="./">Home</a></li>
        <li class="logged-in"><a href="./editor.html">Editor de APIs</a></li>
        <li class="logged-out"><a href="sign.html" class="action_btn">Get Started</a></li>
        <li class="logged-in_block"><a href="sign.html" class="account">
            <div class="action_btn nAccount" id="nAccountMenu"></div>
            <div id="iAccountMenu"></div>
        </a></li>
    </div>
`;