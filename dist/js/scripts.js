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

//========================================================================================================================================================

const iconMenu = document.querySelector('.menu__icon');
const headerBody = document.querySelector('.burger-menu');
const menuBurger = document.querySelector('.menu-burger');

if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        e.stopPropagation();
        document.documentElement.classList.toggle("menu-open");
    });

    if (menuBurger) {
        menuBurger.addEventListener("click", function (e) {
            e.stopPropagation();
            document.documentElement.classList.remove("menu-open");
        });
    }

    document.addEventListener('click', function (e) {
        const isClickInsideHeaderBody = headerBody && headerBody.contains(e.target);
        const isClickOnMenuIcon = e.target === iconMenu || iconMenu.contains(e.target);
        const isClickOnMenuBurger = menuBurger && menuBurger.contains(e.target);

        if (!isClickInsideHeaderBody && !isClickOnMenuIcon && !isClickOnMenuBurger) {
            document.documentElement.classList.remove("menu-open");
        }
    });
}

//========================================================================================================================================================
const daButtons = document.querySelectorAll('.burger-menu-link[data-da]:not([data-menu-popup])');

if (daButtons) {
    const blocks = document.querySelectorAll('.burger-menu-top__block');
    const popupButtons = document.querySelectorAll('.burger-menu-link[data-menu-popup]');
    const popups = document.querySelectorAll('.burger-menu-popup[data-menu-popup]');
    const closeButtons = document.querySelectorAll('.burger-menu-popup-close');
    const burgerMenu = document.querySelector('.burger-menu');

    let defaultBlock = null;
    let activeDaButton = null;

    function clearAllActiveStates() {
        blocks.forEach(block => block.classList.remove('active'));
        daButtons.forEach(btn => btn.classList.remove('active'));
        popupButtons.forEach(btn => btn.classList.remove('active'));
        popups.forEach(popup => popup.classList.remove('active'));

        if (burgerMenu) {
            burgerMenu.classList.remove('popup-open');
        }

        document.body.style.overflow = '';
        activeDaButton = null;
    }

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function showDefaultBlock() {
        if (defaultBlock) {
            blocks.forEach(block => block.classList.remove('active'));
            defaultBlock.classList.add('active');
            daButtons.forEach(btn => btn.classList.remove('active'));
            activeDaButton = null;
        }
    }

    function setActiveBlock(targetBlock, activeButton = null) {
        if (isMobile()) {
            popups.forEach(popup => popup.classList.remove('active'));
            popupButtons.forEach(btn => btn.classList.remove('active'));
            if (burgerMenu) {
                burgerMenu.classList.remove('popup-open');
            }
        }

        blocks.forEach(block => block.classList.remove('active'));

        if (targetBlock) {
            targetBlock.classList.add('active');
        }

        daButtons.forEach(btn => btn.classList.remove('active'));

        if (activeButton) {
            activeButton.classList.add('active');
            activeDaButton = activeButton;
        }
    }

    function openPopup(popupSelector) {
        const popup = document.querySelector(`.burger-menu-popup[data-menu-popup="${popupSelector}"]`);

        if (!popup) {
            return;
        }

        if (isMobile()) {
            clearAllActiveStates();
        }

        popup.classList.add('active');

        const button = document.querySelector(`.burger-menu-link[data-menu-popup="${popupSelector}"]`);
        if (button) {
            button.classList.add('active');
        }

        if (burgerMenu) {
            burgerMenu.classList.add('popup-open');
        }

        document.body.style.overflow = 'hidden';
    }

    function closeAllPopups(removeOverflow = true) {
        popups.forEach(popup => {
            if (popup.classList.contains('active')) {
                popup.classList.remove('active');
            }
        });

        popupButtons.forEach(link => {
            if (link.classList.contains('active')) {
                link.classList.remove('active');
            }
        });

        if (burgerMenu) {
            burgerMenu.classList.remove('popup-open');
        }

        if (removeOverflow) {
            document.body.style.overflow = '';
        }

        if (isMobile()) {
            const hasActiveDaBlock = Array.from(blocks).some(block =>
                block.classList.contains('active') && block.hasAttribute('data-da')
            );
            const hasActiveDaButton = Array.from(daButtons).some(btn =>
                btn.classList.contains('active')
            );

            if (!hasActiveDaBlock && !hasActiveDaButton) {
                showDefaultBlock();
            }
        }
    }

    if (blocks.length) {
        defaultBlock = Array.from(blocks).find(block => !block.hasAttribute('data-da'));

        if (!defaultBlock && blocks.length) {
            defaultBlock = blocks[0];
        }
    }

    daButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (isMobile()) {
                const activePopup = Array.from(popups).find(p => p.classList.contains('active'));
                if (activePopup) {
                    closeAllPopups();
                    showDefaultBlock();
                    return;
                }
            }

            const daValue = this.getAttribute('data-da');
            const targetBlock = Array.from(blocks).find(block =>
                block.getAttribute('data-da') === daValue
            );

            if (targetBlock && targetBlock.classList.contains('active')) {
                showDefaultBlock();
                activeDaButton = null;
            } else {
                setActiveBlock(targetBlock, this);
            }
        });
    });

    popupButtons.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            if (isMobile()) {
                const hasActiveDaBlock = Array.from(blocks).some(block =>
                    block.classList.contains('active') && block.hasAttribute('data-da')
                );
                if (hasActiveDaBlock) {
                    showDefaultBlock();
                }
            }

            const popupSelector = this.getAttribute('data-menu-popup');
            const popup = document.querySelector(`.burger-menu-popup[data-menu-popup="${popupSelector}"]`);

            if (popup && popup.classList.contains('active')) {
                closeAllPopups();
            } else {
                openPopup(popupSelector);
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            closeAllPopups();
        });
    });

    popups.forEach(popup => {
        popup.addEventListener('click', function (e) {
            if (e.target === this) {
                closeAllPopups();
            }
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeAllPopups();

            if (isMobile()) {
                showDefaultBlock();
                activeDaButton = null;
            }
        }
    });

    const burgerLinks = document.querySelectorAll('.burger-menu-top ul a:not([data-menu-popup])');
    burgerLinks.forEach(link => {
        link.addEventListener('click', function () {
            closeAllPopups();
        });
    });

    window.addEventListener('resize', function () {
        if (isMobile()) {
            const hasActiveElements =
                Array.from(blocks).some(b => b.classList.contains('active')) ||
                Array.from(daButtons).some(b => b.classList.contains('active')) ||
                Array.from(popups).some(p => p.classList.contains('active'));

            if (!hasActiveElements && defaultBlock) {
                showDefaultBlock();
            }
        }
    });

    if (isMobile() && defaultBlock) {
        showDefaultBlock();
    }

    const conflictingButtons = document.querySelectorAll('.burger-menu-link[data-da][data-menu-popup]');
    if (conflictingButtons.length) {
        conflictingButtons.forEach(btn => {
            btn.removeAttribute('data-da');
        });
    }
}