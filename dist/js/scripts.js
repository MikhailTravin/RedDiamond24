const menuLinks = document.querySelectorAll('.menu-click');

if (menuLinks) {
    menuLinks.forEach(menuLink => {
        const menuItem = menuLink.closest('li');
        if (!menuItem) return;

        const dropdown = menuItem.querySelector('.menu__dropdown');

        function openMenu() {
            menuItem.classList.add('active');
        }

        function closeMenu() {
            menuItem.classList.remove('active');
        }

        function isOpen() {
            return menuItem.classList.contains('active');
        }

        menuLink.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            document.querySelectorAll('li.active').forEach(activeItem => {
                if (activeItem !== menuItem) {
                    activeItem.classList.remove('active');
                }
            });

            if (isOpen()) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        document.addEventListener('click', function (e) {
            if (!menuItem.contains(e.target) && isOpen()) {
                closeMenu();
            }
        });

        document.addEventListener('click', function (e) {
            const closeBtn = e.target.closest('.menu-close');
            if (closeBtn && menuItem.contains(closeBtn) && isOpen()) {
                closeMenu();
            }
        });
    });
}

//========================================================================================================================================================

const langButton = document.querySelector('.header-lang__button');
if (langButton) {
    const langContainer = langButton.closest('.header-lang');

    langButton.addEventListener('click', function (event) {
        event.stopPropagation();
        langContainer.classList.toggle('active');
    });

    document.addEventListener('click', function (event) {
        if (!langContainer.contains(event.target)) {
            langContainer.classList.remove('active');
        }
    });
}