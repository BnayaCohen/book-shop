'use strict'

var gCurrBook = null
var gIsAddNewBookActive = false

function onInit() {
    renderFilterByQueryStringParams()
    renderBooks()
    renderPageBtns()
}

function renderBooks(books = getBooks()) {
    var strHTMLs =
        books.map(book => `<tr><td class="cell">${book.id}</td>
            <td class="cell"><img src="${book.imgUrl}"></td>
            <td class="cell">${book.name}</td>
            <td class="cell">${formatCurrency(book.price)}</td>
            <td class="cell">${book.rate}</td>
            <td class="cell"><button class="btn bg-warning" onclick="onReadBook(${book.id})">${getTrans('table-read')}</button></td>
            <td class="cell"><button class="btn bg-warning" onclick="onUpdateBookTableBtn(${book.id})">${getTrans('table-update')}</button></td>
            <td class="cell"><button class="btn bg-warning" onclick="onRemoveBook(${book.id})">${getTrans('table-delete')}</button></td></tr>`
        )
    var elTable = document.querySelector('.books-table')
    elTable.innerHTML = strHTMLs.join('')
}

function renderPageBtns() {
    var pageCount = getPagesCount()
    var strHTMLs = ''
    for (let i = 0; i <= pageCount; i++) {
        var className = 'btn mx-1 '
        className += i === getPageIndex() ? 'bg-light' : 'bg-success'
        strHTMLs += `<button class="${className}" onclick="onChangePage(${i})">${i + 1}</button>`
    }
    var elTable = document.querySelector('.page-buttons')
    elTable.innerHTML = strHTMLs
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()
}

function onAddBook() {
    var elAddNewBook = document.querySelector('.new-book-inputs')
    if (!gIsAddNewBookActive) {
        elAddNewBook.style.display = 'block'
        gIsAddNewBookActive = true
    } else if (gIsAddNewBookActive) {
        var bookName = document.getElementById('new-book-name-input').value
        var bookPrice = +document.getElementById('new-book-price-input').value
        if (bookName === '' || bookPrice === 0) return
        addBook(bookName, bookPrice)
        renderBooks()
        renderPageBtns()
        elAddNewBook.style.display = 'none'
        gIsAddNewBookActive = false
    }
}

function onUpdateBookTableBtn(bookId) {
    gCurrBook = getBookById(bookId)
    $('.update-price-modal').modal('show')
}

function onUpdateBook() {
    const newPrice = document.getElementById('book-price-input').value
    if (!newPrice) return

    updateBookPrice(gCurrBook.id, newPrice)
    renderBooks()
    document.getElementById('book-price-input').value = ''
    $('.update-price-modal').modal('hide')
    gCurrBook = null
}

function onReadBook(bookId) {
    gCurrBook = getBookById(bookId)

    document.querySelector('.book-modal-title').innerText = gCurrBook.name
    document.querySelector('.book-modal-image').src = gCurrBook.imgUrl
    document.querySelector('.book-modal-price').innerText = formatCurrency(gCurrBook.price)
    document.querySelector('.book-rate').innerText = gCurrBook.rate
    document.querySelector('.book-description').innerText = gCurrBook.description

    $('.book-datails-modal').modal('show')

    const queryStringParams = `?currBookId=${gCurrBook.id}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onCloseDetailsModal() {
    $('.book-datails-modal').modal('hide')
    gCurrBook = null
    const queryStringParams = `?currBookId=${0}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
    renderBooks()
}

function onChangeRate(rateValue) {
    const newRate = gCurrBook.rate + rateValue
    if (newRate < 0 || newRate > 10) return

    updateBookRate(gCurrBook.id, rateValue)
    document.querySelector('.book-rate').innerText = newRate
}

function onSetFilterBy(filterBy) {
    filterBy = setBookFilter(filterBy)
    renderBooks()
    renderPageBtns()
    const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)

}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        maxPrice: +queryStringParams.get('maxPrice') || 0,
        minRate: +queryStringParams.get('minRate') || 0
    }

    const currBookId = +queryStringParams.get('currBookId')
    if (currBookId) onReadBook(currBookId)

    if (!filterBy.maxPrice && !filterBy.minRate) return

    document.querySelector('.filter-price-number').value = filterBy.maxPrice
    document.querySelector('.filter-rate-range').value = filterBy.minRate
    setBookFilter(filterBy)
}

function onSortBy(sortBy) {
    renderBooks(getSortedTable(sortBy))
    formatCurrency(1681068)
}

function onAddPage(addPage) {
    const newPageIdx = getPageIndex() + addPage
    if (newPageIdx > getPagesCount() || newPageIdx < 0) return

    changePage(newPageIdx)
    renderBooks()
    renderPageBtns()
}

function onChangePage(pageIdx) {
    changePage(pageIdx)
    renderBooks()
    renderPageBtns()
}

function onSetLang(lang) {
    setLang(lang)
    if (lang === "he") document.body.classList.add("rtl")
    else document.body.classList.remove("rtl")
    doTrans()
    renderBooks()
}