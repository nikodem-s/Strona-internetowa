const OpenModalButtons = document.querySelectorAll('[data-modal-target]')
const CloseModalButtons = document.querySelectorAll('[data-close-button]') // wybieram wszedzie gdzie mam wlasnie cos w tym stylu. linijka np 49
const overlay = document.getElementById('overlay') //wybieram wszedzie gdzie mam id = overlay //to sa tzw. selektory 
const CloseModal2 = document.querySelectorAll('[turn-off]');

OpenModalButtons.forEach(button => { //petla sprawajaca ze za kazdym razem gdy klikne przycisk
    button.addEventListener('click', () => { //tu wlasnie jest zdefiniowane co sie dzieje za kazzdym kliknieciem przycisku, eventlistener
        const modal = document.querySelector(button.dataset.modalTarget) //ten selector bierze wszystko co ma modal z html
        openModal(modal) //funkcja otwierajaca nasz pop-up
    })
})

overlay.addEventListener('click', () => { //jesli klikne w to tlo to wtedy:
    const modals = document.querySelectorAll('.modal.active') //wybieram wszystko co zwiazane z .modal.active
    modals.forEach(modal => { //za kazdym razem jak klikne poza to wtedy zamkne tego pop-upa, musi byc for-each zeby to dzialalo
        closeModal(modal) //za kazdym razem jak takie wydarzenie sie stanie. 
    })
})

CloseModalButtons.forEach(button => { //petla dziala tak samo jak dla open
    button.addEventListener('click', () => {
        const modal = button.closest('.modal') //tu jest ta roznica - biore rodzica, przycisk zamkniecia jest w divie modal zamkniety, dlatego modal zamknie sie gdy klikne X
        closeModal(modal)
    })
})

CloseModal2.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    })
})


function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active'); //dodajemy klasy active do naszego pop-upa oraz do naszego tla, tego szarego co sie pojawia jak klikniemy kontakt
    overlay.classList.add('active'); //klasa active jest zdefinowana w pliku css, one dochodzac nadpisuja tamte porpzednie.
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active') //analogicznje dziala jak open, z tym ze usuwamy tutaj ta klase z naszego modal i overlay
}