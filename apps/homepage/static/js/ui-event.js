const _ui = {
    init() {
        if (document.querySelectorAll('[data-event="modal"]').length) {
            this.modal.init();
        }
        if (document.querySelectorAll('[data-event="tab-sub"]').length) {
            this.tabSub.init();
        }
    },
    modal: {
        _ACTIVE: '_active',
        init() {
            const _this = this;
            const eventModal = document.querySelectorAll('[data-event="modal"]');
            const modalClose = document.querySelectorAll('[data-event-modal="close"]');
            const modalDim = document.querySelectorAll('[data-event-modal="dim"]');

            eventModal.forEach((element) => {
                element.addEventListener('click', function (e) {
                    const _thisModal = this;

                    _this.open(_thisModal);
                });
            });

            modalClose.forEach((element) => {
                element.addEventListener('click', function (e) {
                    const _thisModal = this;

                    _this.close(_thisModal);
                });
            });
        },
        open(thisModal) {
            const _this = this;
            const { modalId } = thisModal.dataset;
            const targetModal = document.getElementById(modalId);
            const targetDim = document.querySelector(`[data-modal-dim="${modalId}"]`);

            targetDim.classList.add(_this._ACTIVE);
            targetModal.classList.add(_this._ACTIVE);
        },
        close(thisModal) {
            const _this = this;
            const { modalId } = thisModal.dataset;
            const targetModal = document.getElementById(modalId);
            const targetDim = document.querySelector(`[data-modal-dim="${modalId}"]`);

            targetDim.classList.remove(_this._ACTIVE);
            targetModal.classList.remove(_this._ACTIVE);
        },
    },
    tabSub: {
        _ACTIVE: '_active',
        init() {
            const _this = this;
            const tabSub = document.querySelector('[data-tab-sub]');
            const tabEvent = document.querySelectorAll('[data-event="tab-sub"]');
            const header = document.getElementById('header');

            _this.swiper(tabEvent);

            tabEvent.forEach(function (element) {
                // const
                const { tabId } = element.dataset;

                function scrollFunc() {
                    const headerHeight = header.clientHeight;
                    let headerCurrentOffsetY = header.offsetTop;
                    const tabOffset = document.querySelector('[data-offset]');
                    const tabOffsetY = tabOffset.offsetTop;
                    const subElement = document.querySelector(tabId);
                    const subScrollY = subElement.offsetTop;
                    const offSetY = window.scrollY;

                    if (offSetY > tabOffsetY) {
                        tabSub.classList.add(_this._ACTIVE);
                        tabOffset.style.height = `${tabSub.clientHeight}px`;
                        tabSub.style.top = `${headerCurrentOffsetY + headerHeight - 0.5}px`;

                        if (header.classList.contains('_mobile-active')) {
                            header.style.top = 0;
                        }
                    } else if (offSetY < tabOffsetY) {
                        tabSub.classList.remove(_this._ACTIVE);
                        tabEvent[0].classList.add(_this._ACTIVE);
                        tabOffset.style.height = `auto`;
                    }

                    if (
                        offSetY + tabSub.clientHeight + headerHeight > subScrollY &&
                        offSetY < subScrollY + subElement.clientHeight - tabSub.clientHeight - headerHeight
                    ) {
                        element.classList.add(_this._ACTIVE);
                    } else {
                        element.classList.remove(_this._ACTIVE);
                    }

                    element.addEventListener('mouseenter', function (e) {
                        e.preventDefault();

                        element.classList.add(_this._ACTIVE);
                    });

                    element.addEventListener('mouseleave', function (e) {
                        e.preventDefault();

                        if (
                            offSetY + tabSub.clientHeight + headerHeight > subScrollY &&
                            offSetY < subScrollY + subElement.clientHeight - tabSub.clientHeight - headerHeight
                        ) {
                            element.classList.add(_this._ACTIVE);
                        } else {
                            element.classList.remove(_this._ACTIVE);
                        }
                    });
                }

                scrollFunc();

                window.addEventListener('scroll', function () {
                    scrollFunc();

                    header.style.transition = 'none';
                });
                window.addEventListener('resize', function (e) {
                    setTimeout(scrollFunc, 300);
                });
                element.addEventListener('click', function (e) {
                    setTimeout(scrollFunc, 300);
                });
                window.addEventListener('load', function (e) {
                    setTimeout(scrollFunc, 300);
                });
            });
        },
        swiper(tabEvent) {
            const _this = this;
            const slideList = document.querySelector('[data-event-slide="tab-sub"]');
            let tabSubSwiper = null;
            let windowWidth = window.innerWidth;

            function swiperFunction() {
                const headerHeight = header.clientHeight;
                windowWidth = window.innerWidth;

                if (windowWidth > 1280 && tabSubSwiper != null) {
                    tabSubSwiper.destroy();
                    tabSubSwiper = null;
                } else if (windowWidth <= 1280 && tabSubSwiper == null) {
                    tabSubSwiper = new Swiper(slideList, {
                        slidesPerView: 'auto',
                        freeMode: true,
                        watchSlidesProgress: true,
                        breakpoints: {
                            1280: {
                                spaceBetween: 10,
                            },
                            320: {
                                spaceBetween: 5,
                            },
                        },
                    });

                    tabEvent.forEach(function (element, index) {
                        element.addEventListener('click', function (e) {
                            if (tabSubSwiper != null) {
                                tabSubSwiper.slideTo(tabSubSwiper.clickedIndex);
                            }
                        });
                        window.addEventListener('scroll', function (e) {
                            if (element.classList.contains(_this._ACTIVE)) {
                                if (tabSubSwiper != null) {
                                    tabSubSwiper.slideTo(index);
                                }
                            }
                        });
                    });
                }
            }

            swiperFunction();

            window.addEventListener('resize', function (e) {
                swiperFunction();
            });
        },
    },
};

const footerCopyrightYear = () => {
    const date = new Date();
    const year = date.getFullYear();
    const thisYear = document?.querySelector('[data-copyright="year"]');

    thisYear.innerText = year;
};

document.addEventListener('DOMContentLoaded', function (e) {
    _ui.init();
    footerCopyrightYear();
});
