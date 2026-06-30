const modules_flsModules = {};

let bodyLockStatus = true;
let bodyUnlock = (delay = 500) => {
    if (bodyLockStatus) {
        const lockPaddingElements = document.querySelectorAll("[data-lp]");
        setTimeout((() => {
            lockPaddingElements.forEach((lockPaddingElement => {
                lockPaddingElement.style.paddingRight = "";
            }));
            document.body.style.paddingRight = "";
            document.documentElement.classList.remove("lock");
        }), delay);
        bodyLockStatus = false;
        setTimeout((function () {
            bodyLockStatus = true;
        }), delay);
    }
};
let bodyLock = (delay = 500) => {
    if (bodyLockStatus) {
        const lockPaddingElements = document.querySelectorAll("[data-lp]");
        const lockPaddingValue = window.innerWidth - document.body.offsetWidth + "px";
        lockPaddingElements.forEach((lockPaddingElement => {
            lockPaddingElement.style.paddingRight = lockPaddingValue;
        }));
        document.body.style.paddingRight = lockPaddingValue;
        document.documentElement.classList.add("lock");
        bodyLockStatus = false;
        setTimeout((function () {
            bodyLockStatus = true;
        }), delay);
    }
};
function functions_FLS(message) {
    setTimeout((() => {
        if (window.FLS) console.log(message);
    }), 0);
}

let _slideUp = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains("_slide")) {
        target.classList.add("_slide");
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + "ms";
        target.style.height = `${target.offsetHeight}px`;
        target.offsetHeight;
        target.style.overflow = "hidden";
        target.style.height = showmore ? `${showmore}px` : `0px`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        window.setTimeout((() => {
            target.hidden = !showmore ? true : false;
            !showmore ? target.style.removeProperty("height") : null;
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            !showmore ? target.style.removeProperty("overflow") : null;
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
            target.classList.remove("_slide");
            document.dispatchEvent(new CustomEvent("slideUpDone", {
                detail: {
                    target
                }
            }));
        }), duration);
    }
};
let _slideDown = (target, duration = 500, showmore = 0) => {
    if (!target.classList.contains("_slide")) {
        target.classList.add("_slide");
        target.hidden = target.hidden ? false : null;
        showmore ? target.style.removeProperty("height") : null;
        let height = target.offsetHeight;
        target.style.overflow = "hidden";
        target.style.height = showmore ? `${showmore}px` : `0px`;
        target.style.paddingTop = 0;
        target.style.paddingBottom = 0;
        target.style.marginTop = 0;
        target.style.marginBottom = 0;
        target.offsetHeight;
        target.style.transitionProperty = "height, margin, padding";
        target.style.transitionDuration = duration + "ms";
        target.style.height = height + "px";
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        window.setTimeout((() => {
            target.style.removeProperty("height");
            target.style.removeProperty("overflow");
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
            target.classList.remove("_slide");
            document.dispatchEvent(new CustomEvent("slideDownDone", {
                detail: {
                    target
                }
            }));
        }), duration);
    }
};
let _slideToggle = (target, duration = 500) => {
    if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
};

function getHash() {
    if (location.hash) { return location.hash.replace('#', ''); }
}

function dataMediaQueries(array, dataSetValue) {
    const media = Array.from(array).filter(function (item) {
        return item.dataset[dataSetValue];
    });

    if (media.length) {
        const breakpointsArray = media.map(item => {
            const params = item.dataset[dataSetValue];
            const paramsArray = params.split(",");
            return {
                value: paramsArray[0],
                type: paramsArray[1] ? paramsArray[1].trim() : "max",
                item: item
            };
        });

        const mdQueries = uniqArray(
            breakpointsArray.map(item => `(${item.type}-width: ${item.value}px),${item.value},${item.type}`)
        );

        const mdQueriesArray = mdQueries.map(breakpoint => {
            const [query, value, type] = breakpoint.split(",");
            const matchMedia = window.matchMedia(query);
            const itemsArray = breakpointsArray.filter(item => item.value === value && item.type === type);
            return { itemsArray, matchMedia };
        });

        return mdQueriesArray;
    }
}

function uniqArray(array) {
    return array.filter(function (item, index, self) {
        return self.indexOf(item) === index;
    });
}

//========================================================================================================================================================

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

//========================================================================================================================================================

//Спойлер
function spollers() {
    const spollersArray = document.querySelectorAll("[data-spollers]");
    if (spollersArray.length > 0) {
        const spollersRegular = Array.from(spollersArray).filter((function (item, index, self) {
            return !item.dataset.spollers.split(",")[0];
        }));
        if (spollersRegular.length) initSpollers(spollersRegular);

        spollersArray.forEach(spollersBlock => {
            const mediaQuery = spollersBlock.dataset.spollers;
            if (mediaQuery) {
                const [maxWidth, type] = mediaQuery.split(",");
                const width = parseInt(maxWidth);

                if (type === "max" && window.innerWidth <= width) {
                    if (!spollersBlock.classList.contains("_spoller-init")) {
                        initSpollers([spollersBlock]);
                    }
                } else if (type === "max" && window.innerWidth > width) {
                    if (spollersBlock.classList.contains("_spoller-init")) {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                }
            }
        });

        function initSpollers(spollersArray, matchMedia = false) {
            spollersArray.forEach((spollersBlock => {
                spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                if (matchMedia.matches || !matchMedia) {
                    spollersBlock.classList.add("_spoller-init");
                    initSpollerBody(spollersBlock);
                    spollersBlock.addEventListener("click", setSpollerAction);

                    initCloseButtons(spollersBlock);
                } else {
                    spollersBlock.classList.remove("_spoller-init");
                    initSpollerBody(spollersBlock, false);
                    spollersBlock.removeEventListener("click", setSpollerAction);
                }
            }));
        }

        function initSpollerBody(spollersBlock, hideSpollerBody = true) {
            let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
            if (spollerTitles.length) {
                spollerTitles = Array.from(spollerTitles).filter((item => item.closest("[data-spollers]") === spollersBlock));
                spollerTitles.forEach((spollerTitle => {
                    if (hideSpollerBody) {
                        spollerTitle.removeAttribute("tabindex");
                        if (!spollerTitle.classList.contains("_spoller-active")) {
                            if (spollerTitle.nextElementSibling) {
                                spollerTitle.nextElementSibling.hidden = true;
                            }
                        }
                    } else {
                        spollerTitle.setAttribute("tabindex", "-1");
                        if (spollerTitle.nextElementSibling) {
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    }
                }));
            }
        }

        function initCloseButtons(spollersBlock) {
            const closeButtons = spollersBlock.querySelectorAll('.cabinet-orders-spollers__button');

            closeButtons.forEach(button => {
                button.removeEventListener('click', closeSpollerHandler);
                button.addEventListener('click', closeSpollerHandler);
            });
        }

        function closeSpollerHandler(e) {
            e.preventDefault();
            e.stopPropagation();

            const button = e.currentTarget;
            const spollersBlock = button.closest('[data-spollers]');
            const spollerItem = button.closest('.cabinet-orders-spollers__item');

            if (spollersBlock && spollerItem) {
                const spollerTitle = spollerItem.querySelector('[data-spoller]');

                if (spollerTitle && spollerTitle.classList.contains('_spoller-active')) {
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

                    spollerTitle.classList.remove('_spoller-active');
                    spollerItem.classList.remove('_spoller-active');

                    const contentBlock = spollerTitle.nextElementSibling;
                    _slideUp(contentBlock, spollerSpeed);
                }
            }
        }

        function setSpollerAction(e) {
            const el = e.target;
            if (el.closest("[data-spoller]")) {
                const spollerTitle = el.closest("[data-spoller]");

                const spollerItem = spollerTitle.closest(".spollers__item, .cabinet-orders-spollers__item");
                const spollersBlock = spollerTitle.closest("[data-spollers]");

                const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;

                if (!spollersBlock.querySelectorAll("._slide").length) {
                    if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) {
                        hideSpollersBody(spollersBlock);
                    }

                    spollerTitle.classList.toggle("_spoller-active");
                    if (spollerItem) spollerItem.classList.toggle("_spoller-active");

                    const contentBlock = spollerTitle.nextElementSibling;
                    _slideToggle(contentBlock, spollerSpeed);

                    e.preventDefault();
                }
            }
        }

        function hideSpollersBody(spollersBlock) {
            const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
            const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
            if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                const spollerItem = spollerActiveTitle.closest(".spollers__item, .cabinet-orders-spollers__item");

                spollerActiveTitle.classList.remove("_spoller-active");
                if (spollerItem) spollerItem.classList.remove("_spoller-active");
                _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
            }
        }

        const spollersClose = document.querySelectorAll("[data-spoller-close]");
        if (spollersClose.length) {
            document.addEventListener("click", (function (e) {
                const el = e.target;
                if (!el.closest("[data-spollers]")) {
                    spollersClose.forEach((spollerClose => {
                        const spollersBlock = spollerClose.closest("[data-spollers]");
                        const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                        spollerClose.classList.remove("_spoller-active");

                        const spollerItem = spollerClose.closest(".spollers__item, .cabinet-orders-spollers__item");
                        if (spollerItem) spollerItem.classList.remove("_spoller-active");

                        _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                    }));
                }
            }));
        }
    }
}
spollers();
window.addEventListener('resize', function () {
    spollers();
});

//========================================================================================================================================================

const menuContainer = document.querySelector('.block-section-menu');

if (menuContainer) {
    const arrowButton = menuContainer.querySelector('.arrow');
    const allButtons = menuContainer.querySelectorAll('.block-section-menu__button');
    const SPOLLER_SPEED = 300;

    function slideDown(element) {
        if (element.classList.contains('_slide')) return;

        element.classList.add('_slide');
        element.style.display = 'flex';
        element.style.maxHeight = '0';
        element.style.overflow = 'hidden';
        element.style.transition = `max-height ${SPOLLER_SPEED}ms ease`;

        requestAnimationFrame(() => {
            element.style.maxHeight = element.scrollHeight + 'px';
        });

        setTimeout(() => {
            element.classList.remove('_slide');
            element.style.maxHeight = '';
            element.style.overflow = '';
            element.style.transition = '';
        }, SPOLLER_SPEED + 50);
    }

    function slideUp(element) {
        if (element.classList.contains('_slide')) return;

        element.classList.add('_slide');
        element.style.maxHeight = element.scrollHeight + 'px';
        element.style.overflow = 'hidden';
        element.style.transition = `max-height ${SPOLLER_SPEED}ms ease`;

        requestAnimationFrame(() => {
            element.style.maxHeight = '0';
        });

        setTimeout(() => {
            element.classList.remove('_slide');
            element.style.display = 'none';
            element.style.maxHeight = '';
            element.style.overflow = '';
            element.style.transition = '';
        }, SPOLLER_SPEED + 50);
    }

    function slideToggle(element) {
        if (element.style.display === 'none' || !element.style.display || element.style.display === '') {
            slideDown(element);
        } else {
            slideUp(element);
        }
    }

    if (arrowButton) {
        arrowButton.addEventListener('click', function () {
            menuContainer.classList.toggle('active');

            const buttonsToToggle = [];
            allButtons.forEach(button => {
                if (!button.classList.contains('active')) {
                    buttonsToToggle.push(button);
                }
            });

            if (menuContainer.classList.contains('active')) {
                buttonsToToggle.forEach(button => {
                    if (button.style.display === 'none' || !button.style.display) {
                        slideDown(button);
                    }
                });
            } else {
                buttonsToToggle.forEach(button => {
                    if (button.style.display !== 'none' && button.style.display !== '') {
                        slideUp(button);
                    }
                });
            }
        });
    }

    function initMobileMenu() {
        if (window.innerWidth <= 768) {
            allButtons.forEach(button => {
                if (!button.classList.contains('active')) {
                    button.style.display = 'none';
                    button.style.maxHeight = '';
                    button.style.overflow = '';
                    button.style.transition = '';
                    button.classList.remove('_slide');
                }
            });
            menuContainer.classList.remove('active');
        } else {
            allButtons.forEach(button => {
                button.style.display = '';
                button.style.maxHeight = '';
                button.style.overflow = '';
                button.style.transition = '';
                button.classList.remove('_slide');
            });
            menuContainer.classList.remove('active');
        }
    }

    initMobileMenu();

    let resizeTimeout;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 768) {
                allButtons.forEach(button => {
                    button.style.display = '';
                    button.style.maxHeight = '';
                    button.style.overflow = '';
                    button.style.transition = '';
                    button.classList.remove('_slide');
                });
                menuContainer.classList.remove('active');
            } else {
                if (!menuContainer.classList.contains('active')) {
                    allButtons.forEach(button => {
                        if (!button.classList.contains('active')) {
                            button.style.display = 'none';
                            button.style.maxHeight = '';
                            button.style.overflow = '';
                            button.style.transition = '';
                            button.classList.remove('_slide');
                        }
                    });
                }
            }
        }, 200);
    });
}

//========================================================================================================================================================

const menuButtons = document.querySelectorAll('.block-section-menu__button');
const cardsContainer = document.querySelectorAll('.block-section__cards');

if (menuButtons) {
    function setActiveFilter(filterValue) {
        menuButtons.forEach(button => {
            const buttonFilter = button.getAttribute('data-filter');
            if (buttonFilter === filterValue) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        cardsContainer.forEach(card => {
            const cardFilter = card.getAttribute('data-filter');
            if (cardFilter === filterValue) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    menuButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filter = this.getAttribute('data-filter');
            setActiveFilter(filter);
        });
    });

    document.addEventListener('DOMContentLoaded', function () {
        const activeButton = document.querySelector('.block-section-menu__button.active');
        if (activeButton) {
            const filter = activeButton.getAttribute('data-filter');
            setActiveFilter(filter);
        } else {
            const firstButton = document.querySelector('.block-section-menu__button');
            if (firstButton) {
                const filter = firstButton.getAttribute('data-filter');
                setActiveFilter(filter);
            }
        }
    });
}

//========================================================================================================================================================

const galleryItems = document.querySelectorAll('.card-section__item');
const productCard = document.querySelectorAll('.card-section__images');

if (galleryItems) {
    galleryItems.forEach(item => {
        item.addEventListener("mouseenter", function (e) {
            let child_count = this.parentNode.children.length;
            let child_arr = [];
            for (let i = 0; i < child_count; i++) {
                child_arr.push(this.parentNode.children[i]);
            }
            let filter_child_arr = [];
            for (let i = 0; i < child_count; i++) {
                let curr_child = this.parentNode.children[i];
                if (curr_child !== this)
                    filter_child_arr.push(curr_child);
                curr_child.classList.remove("active")
            }
            this.classList.add("active")
        });

    });
    productCard.forEach(card => {
        card.addEventListener("mouseleave", function (e) {
            const $elements = this.querySelectorAll(`.card-section__item`);
            $elements.forEach(element => {
                element.classList.remove("active")
            });
            $elements[0].classList.add("active")
        });
    });
}


//========================================================================================================================================================

if (document.querySelector('.card-section__slider')) {
    const swiperSection = new Swiper('.card-section__slider', {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
    });
}

const blockClub = document.getElementById('block-club');
if (blockClub) {
    const swiperElement = blockClub.querySelector('.swiper');

    let isScrollLocked = false;
    let isTransitioning = false;
    let wheelTimeout = null;
    let lastWheelTime = 0;
    let lastScrollY = 0;

    let scrollAccumulator = 0;
    let isAnimating = false;
    let animationFrame = null;

    let swiperInstance = null;

    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            || window.innerWidth <= 768;
    }

    const SPEED_CONFIG = {
        minSpeed: 400,
        maxSpeed: 1000,
        defaultSpeed: 700,
        wheelCooldown: 100,
        transitionBuffer: 50,
        scrollThreshold: 30,
        mobile: {
            scrollThreshold: 20,
            minSpeed: 300,
            maxSpeed: 800,
            longSwipeThreshold: 150
        }
    };

    function getSlideWidth() {
        const slides = swiperElement.querySelectorAll('.swiper-slide');
        if (slides.length > 0) {
            const slide = slides[0];
            const slideStyles = window.getComputedStyle(slide);
            const marginRight = parseFloat(slideStyles.marginRight) || 0;
            const width = slide.offsetWidth + marginRight;
            return width;
        }
        return 370;
    }

    function getMaxTranslate() {
        if (!swiperInstance) return 0;

        const slides = swiperInstance.slides;
        const slideWidth = getSlideWidth();
        const totalSlides = slides.length;
        const containerWidth = swiperElement.offsetWidth;

        const isMobile = isMobileDevice();
        const paddingOffset = isMobile ? 19 : 0;

        const totalWidth = totalSlides * slideWidth;
        const maxTranslate = Math.max(0, totalWidth - containerWidth + paddingOffset);

        return maxTranslate;
    }

    function isEndReached() {
        if (!swiperInstance) return true;

        const isMobile = isMobileDevice();
        if (!isMobile) {
            return swiperInstance.isEnd;
        }

        const wrapper = swiperElement.querySelector('.swiper-wrapper');
        if (!wrapper) return true;

        const transform = wrapper.style.transform;
        const match = transform.match(/translate3d\((-?\d+\.?\d*)px/);
        if (!match) return false;

        const currentTranslate = Math.abs(parseFloat(match[1]));
        const maxTranslate = getMaxTranslate();

        return currentTranslate >= maxTranslate - 1;
    }

    function isStartReached() {
        if (!swiperInstance) return true;

        const isMobile = isMobileDevice();
        if (!isMobile) {
            return swiperInstance.isBeginning;
        }

        const wrapper = swiperElement.querySelector('.swiper-wrapper');
        if (!wrapper) return true;

        const transform = wrapper.style.transform;
        const match = transform.match(/translate3d\((-?\d+\.?\d*)px/);
        if (!match) return true;

        const currentTranslate = parseFloat(match[1]);
        return currentTranslate >= -1;
    }

    function updateSwiperPosition() {
        if (!swiperInstance || !isMobileDevice()) return;

        const wrapper = swiperElement.querySelector('.swiper-wrapper');
        if (!wrapper) return;

        const activeIndex = swiperInstance.activeIndex;
        const slideWidth = getSlideWidth();
        const maxTranslate = getMaxTranslate();
        const targetTranslate = Math.min(activeIndex * slideWidth, maxTranslate);

        if (Math.abs(swiperInstance.translate + targetTranslate) > 1) {
            swiperInstance.setTranslate(-targetTranslate);
            swiperInstance.update();
        }
    }

    if (swiperElement && !swiperElement.swiper) {
        const isMobile = isMobileDevice();

        swiperInstance = new Swiper(swiperElement, {
            slidesPerView: 'auto',
            spaceBetween: 20,
            mousewheel: false,
            speed: SPEED_CONFIG.defaultSpeed,
            effect: 'slide',
            slidesPerGroup: 1,
            centeredSlides: false,
            watchOverflow: true,
            resistance: true,
            resistanceRatio: 0,
            touchRatio: isMobile ? 1.2 : 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: false,
            autoplay: false,
            easing: 'easeOutCubic',
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            grabCursor: false,
            preventInteractionOnTransition: true,
            slidesOffsetAfter: isMobile ? 19 : 0,
            autoHeight: false,
            on: {
                slideChange: function () {
                    updateSlideStates();
                },
                slideChangeTransitionEnd: function () {
                    isTransitioning = false;
                    isAnimating = false;
                    if (isMobile) {
                        updateSwiperPosition();
                        checkMobileEdges();
                    }
                },
                update: function () {
                    this.updateSlides();
                },
                reachEnd: function () {
                    unlockScrollSmooth();
                    showEdgeFeedback('end');
                },
                reachBeginning: function () {
                    unlockScrollSmooth();
                    showEdgeFeedback('start');
                },
                init: function () {
                    this.update();
                    setTimeout(() => {
                        this.slideTo(0, 0);
                        if (isMobile) {
                            setTimeout(() => {
                                const maxTranslate = getMaxTranslate();
                                this.params.slidesOffsetAfter = 19;
                                this.update();
                                updateSwiperPosition();
                            }, 100);
                        }
                    }, 50);
                },
                setTranslate: function (translate) {
                    if (isMobile) {
                        const maxTranslate = getMaxTranslate();
                        if (Math.abs(translate) > maxTranslate) {
                            translate = -maxTranslate;
                        }
                    }
                    this.wrapperEl.style.transform = `translate3d(${translate}px, 0px, 0px)`;
                }
            }
        });

        setTimeout(() => {
            if (swiperInstance) {
                swiperInstance.update();
                if (isMobileDevice()) {
                    const maxTranslate = getMaxTranslate();
                    swiperInstance.params.slidesOffsetAfter = 19;
                    swiperInstance.update();
                    updateSwiperPosition();
                }
            }
        }, 200);

    } else if (swiperElement && swiperElement.swiper) {
        swiperInstance = swiperElement.swiper;
        const isMobile = isMobileDevice();
        Object.assign(swiperInstance.params, {
            slidesPerView: 'auto',
            slidesPerGroup: 1,
            slidesPerGroupAuto: false,
            speed: SPEED_CONFIG.defaultSpeed,
            longSwipes: false,
            resistanceRatio: 0,
            easing: 'easeOutCubic',
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            watchOverflow: true,
            touchRatio: isMobile ? 1.2 : 1,
            spaceBetween: 20,
            slidesOffsetAfter: isMobile ? 19 : 0
        });
        swiperInstance.update();
        if (isMobile) {
            setTimeout(updateSwiperPosition, 100);
        }
    }

    function checkMobileEdges() {
        if (!isMobileDevice() || !swiperInstance) return;

        const isEnd = isEndReached();
        const isStart = isStartReached();

        if (isEnd) {
            unlockScrollSmooth();
            showEdgeFeedback('end');
        } else if (isStart) {
            unlockScrollSmooth();
            showEdgeFeedback('start');
        }
    }

    if (swiperInstance) {
        const originalSlideNext = swiperInstance.slideNext;
        const originalSlidePrev = swiperInstance.slidePrev;

        swiperInstance.slideNext = function (speed) {
            const isMobile = isMobileDevice();

            if (isMobile) {
                if (isEndReached()) {
                    unlockScrollSmooth();
                    showEdgeFeedback('end');
                    return false;
                }

                const nextIndex = this.activeIndex + 1;
                const maxIndex = this.slides.length - 1;

                if (nextIndex > maxIndex) {
                    unlockScrollSmooth();
                    showEdgeFeedback('end');
                    return false;
                }

                const result = originalSlideNext.call(this, speed);
                setTimeout(() => {
                    updateSwiperPosition();
                }, speed || this.params.speed);
                return result;
            } else {
                if (this.isEnd || this.activeIndex + 1 >= this.slides.length) {
                    unlockScrollSmooth();
                    showEdgeFeedback('end');
                    return false;
                }
                return originalSlideNext.call(this, speed);
            }
        };

        swiperInstance.slidePrev = function (speed) {
            const isMobile = isMobileDevice();

            if (isMobile) {
                if (isStartReached()) {
                    unlockScrollSmooth();
                    showEdgeFeedback('start');
                    return false;
                }

                const result = originalSlidePrev.call(this, speed);
                setTimeout(() => {
                    updateSwiperPosition();
                }, speed || this.params.speed);
                return result;
            } else {
                if (this.isBeginning || this.activeIndex - 1 < 0) {
                    unlockScrollSmooth();
                    showEdgeFeedback('start');
                    return false;
                }
                return originalSlidePrev.call(this, speed);
            }
        };
    }

    function calculateSpeedFromAccumulator(accumulator) {
        const isMobile = isMobileDevice();
        const minSpeed = isMobile ? SPEED_CONFIG.mobile.minSpeed : SPEED_CONFIG.minSpeed;
        const maxSpeed = isMobile ? SPEED_CONFIG.mobile.maxSpeed : SPEED_CONFIG.maxSpeed;

        const speedFactor = Math.min(accumulator / 100, 3);
        let speed = SPEED_CONFIG.defaultSpeed / (1 + speedFactor * 0.3);
        speed = Math.max(minSpeed, Math.min(speed, maxSpeed));

        if (accumulator > 200) {
            speed = speed * 0.9;
        }

        return Math.round(speed);
    }

    function handleWheelWithMomentum(e) {
        if (!isScrollLocked || !swiperInstance) return;

        e.preventDefault();
        e.stopPropagation();

        const delta = e.deltaY;
        const currentTime = Date.now();

        scrollAccumulator += delta;

        if (isAnimating) {
            return;
        }

        const absAccumulator = Math.abs(scrollAccumulator);
        const threshold = isMobileDevice() ? SPEED_CONFIG.mobile.scrollThreshold : SPEED_CONFIG.scrollThreshold;

        if (absAccumulator < threshold) {
            return;
        }

        let remainingAccumulator = scrollAccumulator;
        let speed = calculateSpeedFromAccumulator(absAccumulator);
        scrollAccumulator = 0;

        const direction = remainingAccumulator > 0 ? 1 : -1;

        if (direction > 0 && isEndReached()) {
            unlockScrollSmooth();
            showEdgeFeedback('end');
            return;
        }
        if (direction < 0 && isStartReached()) {
            unlockScrollSmooth();
            showEdgeFeedback('start');
            return;
        }

        isAnimating = true;
        isTransitioning = true;

        if (direction > 0) {
            swiperInstance.slideNext(speed);
        } else {
            swiperInstance.slidePrev(speed);
        }

        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            isTransitioning = false;
            isAnimating = false;
        }, speed + SPEED_CONFIG.transitionBuffer);

        lastWheelTime = currentTime;
    }

    let touchAccumulator = 0;
    let touchStartY = 0;
    let touchStartX = 0;
    let isSwipingHorizontally = false;
    let momentumTimer = null;
    let lastTouchEndTime = 0;

    document.addEventListener('touchstart', function (e) {
        if (!isScrollLocked) return;

        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchAccumulator = 0;
        isSwipingHorizontally = false;

        clearTimeout(momentumTimer);
    }, { passive: true });

    document.addEventListener('touchmove', function (e) {
        if (!isScrollLocked || !swiperInstance || isTransitioning) return;

        const deltaX = touchStartX - e.touches[0].clientX;
        const deltaY = touchStartY - e.touches[0].clientY;

        if (!isSwipingHorizontally && Math.abs(deltaX) > 10) {
            isSwipingHorizontally = true;
            e.preventDefault();
        }

        const touchDelta = isSwipingHorizontally ? deltaX : deltaY;
        touchAccumulator += touchDelta;

        const threshold = isMobileDevice() ? SPEED_CONFIG.mobile.scrollThreshold : SPEED_CONFIG.scrollThreshold;

        if (Math.abs(touchAccumulator) > threshold) {
            const direction = touchAccumulator > 0 ? 1 : -1;
            const isLongSwipe = Math.abs(touchAccumulator) > (isMobileDevice() ? SPEED_CONFIG.mobile.longSwipeThreshold : 200);
            let speed = calculateSpeedFromAccumulator(Math.abs(touchAccumulator));

            if (isLongSwipe) {
                speed = Math.max(SPEED_CONFIG.mobile.minSpeed, speed * 0.7);
            }

            if (direction > 0 && isEndReached()) {
                unlockScrollSmooth();
                showEdgeFeedback('end');
                touchAccumulator = 0;
                return;
            }
            if (direction < 0 && isStartReached()) {
                unlockScrollSmooth();
                showEdgeFeedback('start');
                touchAccumulator = 0;
                return;
            }

            if (direction > 0) {
                swiperInstance.slideNext(speed);
                isTransitioning = true;
                setTimeout(() => {
                    isTransitioning = false;
                    if (isMobileDevice()) {
                        updateSwiperPosition();
                    }
                }, speed + SPEED_CONFIG.transitionBuffer);
            } else {
                swiperInstance.slidePrev(speed);
                isTransitioning = true;
                setTimeout(() => {
                    isTransitioning = false;
                    if (isMobileDevice()) {
                        updateSwiperPosition();
                    }
                }, speed + SPEED_CONFIG.transitionBuffer);
            }

            touchAccumulator = 0;
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        }
    }, { passive: false });

    document.addEventListener('touchend', function (e) {
        if (!isScrollLocked || !swiperInstance || isTransitioning) return;

        clearTimeout(momentumTimer);
        lastTouchEndTime = Date.now();

        if (Math.abs(touchAccumulator) > 30) {
            const direction = touchAccumulator > 0 ? 1 : -1;
            const speed = calculateSpeedFromAccumulator(Math.abs(touchAccumulator) * 1.5);

            if (direction > 0 && isEndReached()) {
                unlockScrollSmooth();
                showEdgeFeedback('end');
                touchAccumulator = 0;
                return;
            }
            if (direction < 0 && isStartReached()) {
                unlockScrollSmooth();
                showEdgeFeedback('start');
                touchAccumulator = 0;
                return;
            }

            momentumTimer = setTimeout(() => {
                if (direction > 0) {
                    swiperInstance.slideNext(speed);
                    isTransitioning = true;
                    setTimeout(() => {
                        isTransitioning = false;
                        if (isMobileDevice()) {
                            updateSwiperPosition();
                        }
                    }, speed + SPEED_CONFIG.transitionBuffer);
                } else {
                    swiperInstance.slidePrev(speed);
                    isTransitioning = true;
                    setTimeout(() => {
                        isTransitioning = false;
                        if (isMobileDevice()) {
                            updateSwiperPosition();
                        }
                    }, speed + SPEED_CONFIG.transitionBuffer);
                }
            }, 50);
        }
    }, { passive: true });

    function updateSlideStates() {
        if (!swiperInstance) return;
        const slides = swiperInstance.slides;
        slides.forEach((slide, index) => {
            slide.classList.remove('swiper-slide-prev', 'swiper-slide-next');
            if (index === swiperInstance.activeIndex) {
                slide.classList.add('swiper-slide-active');
            } else if (index === swiperInstance.activeIndex - 1) {
                slide.classList.add('swiper-slide-prev');
            } else if (index === swiperInstance.activeIndex + 1) {
                slide.classList.add('swiper-slide-next');
            }
        });
    }

    function unlockScrollSmooth() {
        if (!isScrollLocked) return;

        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.classList.remove('scroll-locked');

        isScrollLocked = false;
        document.removeEventListener('wheel', handleWheelWithMomentum);
        clearTimeout(wheelTimeout);
        clearTimeout(momentumTimer);

        scrollAccumulator = 0;
        touchAccumulator = 0;
        isAnimating = false;

        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }

        window.scrollTo(0, scrollY);
    }

    function lockScroll() {
        if (isScrollLocked) return;

        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        isScrollLocked = true;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = getScrollbarWidth() + 'px';
        document.body.style.position = 'relative';
        document.body.style.height = '100vh';
        document.body.classList.add('scroll-locked');

        lastWheelTime = 0;
        isTransitioning = false;
        scrollAccumulator = 0;
        touchAccumulator = 0;

        document.addEventListener('wheel', handleWheelWithMomentum, { passive: false });
    }

    function unlockScroll() {
        if (!isScrollLocked) return;

        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        isScrollLocked = false;

        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.body.style.position = '';
        document.body.style.height = '';
        document.body.classList.remove('scroll-locked');

        document.removeEventListener('wheel', handleWheelWithMomentum);
        clearTimeout(wheelTimeout);
        clearTimeout(momentumTimer);

        scrollAccumulator = 0;
        touchAccumulator = 0;
        isAnimating = false;

        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    }

    function showEdgeFeedback(position) {
        const wrapper = document.querySelector('.block-club__slider-wrapper');
        if (!wrapper) return;

        wrapper.classList.remove('edge-start', 'edge-end', 'edge-unlock');

        if (position === 'start') {
            wrapper.classList.add('edge-start');
        } else if (position === 'end') {
            wrapper.classList.add('edge-end');
        } else if (position === 'unlock') {
            wrapper.classList.add('edge-unlock');
        }

        clearTimeout(window.edgeTimeout);
        window.edgeTimeout = setTimeout(() => {
            wrapper.classList.remove('edge-start', 'edge-end', 'edge-unlock');
        }, 800);

        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    function checkBlockPosition() {
        if (!blockClub) return;

        const rect = blockClub.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const blockMiddle = rect.top + rect.height / 2;
        const screenMiddle = windowHeight / 2;
        const threshold = 100;

        const isInView = blockMiddle < screenMiddle + threshold &&
            blockMiddle > screenMiddle - threshold;

        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;

        if (isInView) {
            if (!isScrollLocked && swiperInstance && swiperInstance.slides.length > 1) {
                const isEnd = isEndReached();
                const isStart = isStartReached();

                if (scrollDirection === 'down' && !isEnd) {
                    lockScroll();
                } else if (scrollDirection === 'up' && !isStart) {
                    lockScroll();
                } else if (scrollDirection === 'down' && isEnd) {
                    if (isScrollLocked) unlockScroll();
                } else if (scrollDirection === 'up' && isStart) {
                    if (isScrollLocked) unlockScroll();
                }
            }
        } else {
            if (isScrollLocked) {
                unlockScroll();
            }
        }
    }

    let scrollTimeout = null;
    window.addEventListener('scroll', function () {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(checkBlockPosition, 50);
    }, { passive: true });

    let resizeTimeout = null;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (isScrollLocked) {
                setTimeout(checkBlockPosition, 100);
            }
            if (swiperInstance) {
                const isMobile = isMobileDevice();
                swiperInstance.params.touchRatio = isMobile ? 1.2 : 1;
                swiperInstance.params.spaceBetween = 20;
                swiperInstance.params.slidesOffsetAfter = isMobile ? 19 : 0;
                swiperInstance.update();

                if (isMobile) {
                    setTimeout(() => {
                        updateSwiperPosition();
                        checkMobileEdges();
                    }, 100);
                }
            }
        }, 200);
    }, { passive: true });

    setTimeout(() => {
        checkBlockPosition();
        if (isMobileDevice()) {
            setTimeout(() => {
                updateSwiperPosition();
                checkMobileEdges();
            }, 300);
        }
    }, 300);

    document.addEventListener('keydown', function (e) {
        if (!isScrollLocked) return;

        const currentTime = Date.now();
        if (currentTime - lastWheelTime < SPEED_CONFIG.wheelCooldown) return;
        lastWheelTime = currentTime;

        const speed = SPEED_CONFIG.defaultSpeed;

        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            if (swiperInstance && !isEndReached()) {
                swiperInstance.slideNext(speed);
                isTransitioning = true;
                setTimeout(() => {
                    isTransitioning = false;
                    if (isMobileDevice()) {
                        updateSwiperPosition();
                    }
                }, speed + SPEED_CONFIG.transitionBuffer);
            } else if (swiperInstance && isEndReached()) {
                unlockScrollSmooth();
                showEdgeFeedback('end');
            }
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            if (swiperInstance && !isStartReached()) {
                swiperInstance.slidePrev(speed);
                isTransitioning = true;
                setTimeout(() => {
                    isTransitioning = false;
                    if (isMobileDevice()) {
                        updateSwiperPosition();
                    }
                }, speed + SPEED_CONFIG.transitionBuffer);
            } else if (swiperInstance && isStartReached()) {
                unlockScrollSmooth();
                showEdgeFeedback('start');
            }
        }
    });

    window.addEventListener('beforeunload', function () {
        unlockScroll();
        clearTimeout(wheelTimeout);
        clearTimeout(window.edgeTimeout);
        clearTimeout(scrollTimeout);
        clearTimeout(resizeTimeout);
        clearTimeout(momentumTimer);
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
    });
}

if (document.querySelector('.block-reviews__slider')) {

    const swiperReviews = new Swiper('.block-reviews__slider', {
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        spaceBetween: 10,
        speed: 400,
        breakpoints: {
            992: {
                spaceBetween: 14,
            },
        },
    });
}

//========================================================================================================================================================

const videos = document.querySelectorAll('.block-video video');
if (videos) {
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;

                if (entry.isIntersecting) {
                    video.play().catch(() => { });
                } else {
                    video.pause();
                }
            });
        }, {
            threshold: 0.5
        });

        videos.forEach(video => {
            observer.observe(video);
        });
    } else {
        videos.forEach(video => {
            video.play().catch(() => { });
        });
    }
}

//========================================================================================================================================================

const popupTriggers = document.querySelectorAll('.card-section-popup');

if (popupTriggers) {
    let isPopupVisible = false;
    function closePopup() {
        if (isPopupVisible) {
            document.documentElement.classList.remove('popup-show');
            const activePopup = document.querySelector('.popup_show');
            if (activePopup) {
                activePopup.classList.remove('popup_show');
            }
            isPopupVisible = false;
        }
    }

    if (popupTriggers.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const popupElement = entry.target;
                const popupId = popupElement.dataset.popup;

                const visiblePercent = entry.intersectionRatio * 100;

                if (visiblePercent >= 50 && entry.isIntersecting) {
                    if (!isPopupVisible) {
                        document.documentElement.classList.add('popup-show');
                        if (popupId) {
                            const popup = document.querySelector(popupId);
                            if (popup) {
                                popup.classList.add('popup_show');
                            }
                        }
                        isPopupVisible = true;
                    }
                }
                else if (visiblePercent < 70 && isPopupVisible) {
                    closePopup();
                }
            });
        }, {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
            rootMargin: '0px'
        });

        popupTriggers.forEach(trigger => {
            observer.observe(trigger);
        });
    }

    document.addEventListener('click', function (e) {
        const closeButton = e.target.closest('.popup__close');
        if (closeButton) {
            closePopup();
            e.preventDefault();
        }
    });
}

//========================================================================================================================================================

let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
    const targetBlockElement = document.querySelector(targetBlock);

    if (!targetBlockElement) {
        console.warn(`Element ${targetBlock} not found`);
        return;
    }

    let headerItem = '';
    let headerItemHeight = 0;

    if (noHeader) {
        headerItem = 'header.header';
        const headerElement = document.querySelector(headerItem);
        if (headerElement) {
            if (!headerElement.classList.contains('_header-scroll')) {
                headerElement.style.cssText = `transition-duration: 0s;`;
                headerElement.classList.add('_header-scroll');
                headerItemHeight = headerElement.offsetHeight;
                headerElement.classList.remove('_header-scroll');
                setTimeout(() => {
                    headerElement.style.cssText = ``;
                }, 0);
            } else {
                headerItemHeight = headerElement.offsetHeight;
            }
        }
    }

    if (typeof SmoothScroll !== 'undefined') {
        let options = {
            speedAsDuration: true,
            speed: speed,
            header: headerItem,
            offset: offsetTop,
            easing: 'easeOutQuad',
        };
        new SmoothScroll().animateScroll(targetBlockElement, '', options);
    } else {
        let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + window.scrollY;

        if (headerItemHeight) {
            targetBlockElementPosition -= headerItemHeight;
        }

        if (offsetTop) {
            targetBlockElementPosition -= offsetTop;
        }

        window.scrollTo({
            top: targetBlockElementPosition,
            behavior: "smooth"
        });
    }
};

function pageNavigation() {
    document.addEventListener("click", pageNavigationAction);
    document.addEventListener("watcherCallback", pageNavigationAction);

    function pageNavigationAction(e) {
        if (e.type === "click") {
            const targetElement = e.target;
            const gotoLink = targetElement.closest('[data-goto]');

            if (gotoLink) {
                const gotoLinkSelector = gotoLink.dataset.goto || '';
                const noHeader = gotoLink.hasAttribute('data-goto-header');
                const gotoSpeed = gotoLink.dataset.gotoSpeed ? parseInt(gotoLink.dataset.gotoSpeed) : 500;
                const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;

                if (window.modules_flsModules && modules_flsModules.fullpage) {
                    const fullpageSection = document.querySelector(`${gotoLinkSelector}`)?.closest('[data-fp-section]');
                    const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.fpId : null;

                    if (fullpageSectionId !== null) {
                        modules_flsModules.fullpage.switchingSection(fullpageSectionId);
                    }
                } else {
                    const targetBlock = document.querySelector(gotoLinkSelector);
                    if (targetBlock) {
                        gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
                    } else {
                        const href = gotoLink.getAttribute('href');
                        if (href && href !== '#' && !href.startsWith('#')) {
                            const targetId = gotoLinkSelector.replace(/^[.#]/, '');
                            const url = new URL(href, window.location.origin);
                            url.hash = gotoLinkSelector.startsWith('#') ? gotoLinkSelector : `#${targetId}`;
                            window.location.href = url.toString();
                        }
                    }
                }

                e.preventDefault();
            }
        } else if (e.type === "watcherCallback" && e.detail) {
            const entry = e.detail.entry;
            const targetElement = entry.target;

            if (targetElement.dataset.watch === 'navigator') {
                document.querySelectorAll('[data-goto]._navigator-active').forEach(el => {
                    el.classList.remove('_navigator-active');
                });

                const navigatorLinks = findNavigatorLinks(targetElement);
                navigatorLinks.forEach(link => {
                    if (entry.isIntersecting) {
                        link.classList.add('_navigator-active');
                    } else {
                        link.classList.remove('_navigator-active');
                    }
                });
            }
        }
    }

    function findNavigatorLinks(element) {
        const links = [];

        if (element.id) {
            const idLinks = document.querySelectorAll(`[data-goto="#${element.id}"]`);
            links.push(...idLinks);
        }

        if (element.classList.length) {
            element.classList.forEach(className => {
                const classLinks = document.querySelectorAll(`[data-goto=".${className}"]`);
                links.push(...classLinks);
            });
        }

        return links;
    }
}

pageNavigation();

(function () {
    function handleInitialNavigation() {
        let targetSelector = null;

        if (window.location.hash) {
            const hash = window.location.hash;
            const targetElement = document.querySelector(hash);
            if (targetElement) {
                targetSelector = hash;
            }
        }

        if (!targetSelector) {
            const urlParams = new URLSearchParams(window.location.search);
            const gotoParam = urlParams.get('goto');

            if (gotoParam) {
                if (gotoParam.startsWith('.') || gotoParam.startsWith('#')) {
                    targetSelector = gotoParam;
                } else {
                    targetSelector = `.${gotoParam}`;
                }
            }
        }

        if (targetSelector) {
            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
                const checkAndScroll = function () {
                    if (document.readyState === 'complete') {
                        setTimeout(function () {
                            const noHeader = true;
                            const speed = 500;
                            const offsetTop = 0;
                            gotoBlock(targetSelector, noHeader, speed, offsetTop);
                        }, 300);
                    } else {
                        setTimeout(checkAndScroll, 100);
                    }
                };
                checkAndScroll();
            }
        }
    }

    if (document.readyState === 'complete') {
        setTimeout(handleInitialNavigation, 100);
    } else {
        window.addEventListener('load', function () {
            setTimeout(handleInitialNavigation, 100);
        });
    }
})();

document.querySelectorAll('a[data-goto]').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href && href !== '#' && !href.startsWith('#')) {
        const originalHref = href;

        link.addEventListener('click', function (e) {
            const gotoSelector = this.dataset.goto;
            const targetBlock = document.querySelector(gotoSelector);

            if (!targetBlock) {
                const targetId = gotoSelector.replace(/^[.#]/, '');
                const url = new URL(originalHref, window.location.origin);
                url.hash = gotoSelector.startsWith('#') ? gotoSelector : `#${targetId}`;
                window.location.href = url.toString();
                e.preventDefault();
            }
        });
    }
});

//========================================================================================================================================================
