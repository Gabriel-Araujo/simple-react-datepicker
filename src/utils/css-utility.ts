export function removeClass(targetClass: string) {
    document.querySelectorAll(`.${targetClass}`).forEach(item => {
        item.classList.remove(targetClass);
    })
}

export function removeClasses(classes: string[]) {
    classes.forEach(removeClass);
}

export function addClassesTo(classes: string[], targetId: string) {
    classes.forEach(item => {
        document.getElementById(targetId)?.classList.add(item);
    })
}