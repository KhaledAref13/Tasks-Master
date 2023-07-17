const createElement = (element, className = '', textContent = '') => {
    let htmlElement = document.createElement(element);
    if (className) {
        htmlElement.className = className;
    }
    if (textContent) {
        htmlElement.textContent = textContent
    }
    return htmlElement
}