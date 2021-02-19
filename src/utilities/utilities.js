export const onKeyDown = (activeResult, filteredResults) => {
    if (activeResult === 0) {
        document.querySelector(`[title='${filteredResults[activeResult].description}']`).parentNode.classList.add('highlight-result');
    }
    else {
        document.querySelector(`[title='${filteredResults[activeResult].description}']`).parentNode.classList.add('highlight-result');
        document.querySelector(`[title='${filteredResults[activeResult - 1].description}']`).parentNode.classList.remove('highlight-result');
    }
}

export const onKeyUp = (activeResult, filteredResults) => {
    if (activeResult === 0) {
        document.querySelector(`[title='${filteredResults[activeResult].description}']`).parentNode.classList.remove('highlight-result');
    }
    else {
        document.querySelector(`[title='${filteredResults[activeResult - 1].description}']`).parentNode.classList.add('highlight-result');
        document.querySelector(`[title='${filteredResults[activeResult].description}']`).parentNode.classList.remove('highlight-result');
    }
}