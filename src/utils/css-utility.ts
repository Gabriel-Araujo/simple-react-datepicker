export function removeClassesFrom(classes: string[], ref: HTMLTableElement | null) {
    classes.forEach(cls => removeClassFrom(cls, ref));
}


export function removeClassFrom(targetClass: string, ref: HTMLTableElement | null) {
    if (ref === null) return;

    ref.childNodes[1].childNodes
        .forEach(row => row.childNodes
            .forEach(cell => (cell.firstChild as Element)?.classList.remove(targetClass)))
}

export function addClassesTo(classes: string[], ref: HTMLTableElement | null, id: string) {
    if (ref === null) return;
    if (classes.length === 0) return;

    ref.childNodes[1].childNodes
        .forEach(row => row.childNodes
            .forEach(cell => {
                const _cell = cell.firstChild as Element;
                if (_cell?.id === id ) {classes.forEach(cls => _cell?.classList.add(cls))}
            }))
}