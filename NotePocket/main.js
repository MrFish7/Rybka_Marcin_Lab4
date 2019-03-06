window.addEventListener('load', function () {
    let addBtn = document.querySelector('.add')
    let clearButton = document.querySelector('.clear')
    let notes, sticky, span, button, value, key

    //Utworzenie nowej notatki
    addBtn.addEventListener('click', function () {
        createNote()
    })

    function createNote() {
        value = document.querySelector('.note').value
        key = 'sticky_' + localStorage.length
        localStorage.setItem(key, value)
        addNote(value)
    }

    //Dodanie nowej notatki
    function addNote(value) {
        notes = document.querySelector('.notes')
        sticky = document.createElement('li')
        span = document.createElement('span')
        span.setAttribute('class', 'sticky')
        span.innerHTML = value
        sticky.appendChild(span)
        notes.appendChild(sticky)
    }

    //Pętla wyświetlająca notatki w Localstorage
    for (let i = 0; i < localStorage.length; i++) {
        key = localStorage.key(i)
        if (key.substring(0, 6) == 'sticky') { // test to see if begins with 'sticky'
            let value = localStorage.getItem(key)
            addNote(value)
        }
    }

    //Usuwanie notatek
    clearButton.addEventListener('click', function () {
        clearStorage()
    })

    function clearStorage() {
        localStorage.clear()
    }

})()
