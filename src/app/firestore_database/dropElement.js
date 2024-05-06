export function dropElement(e) {
    const element = document.querySelector('#'+e.target.id);
    element.parentElement.parentElement.removeChild(element.parentElement);
}