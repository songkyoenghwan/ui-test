const footerCopyrightYear = () => {
    const date = new Date();
    const year = date.getFullYear();
    const thisYear = document?.querySelector('[data-copyright="year"]');

    thisYear.innerText = year;
};

document.addEventListener('DOMContentLoaded', function (e) {
    footerCopyrightYear();
});
