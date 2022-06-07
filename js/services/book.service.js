'use strict'
const STORAGE_KEY = 'bookDB'

const gBookNames = ['Tunnels', 'Hunger Games', 'Atomic Habits', 'The Deliver']

var gBooks
var gBookIdx
var gFilterBy = { maxPrice: 2000, minRate: 0 }


_createBooks()

function getBooks() {
    var filteredBooks = gBooks.filter(book=> book.price<=gFilterBy.maxPrice&&book.rate>=gFilterBy.minRate)
    return filteredBooks
}

function removeBook(bookId) {
    const deleteBookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(deleteBookIdx, 1)
    _saveBooksToStorage()
}

function addBook(bookName, bookPrice) {
    const newBook = _createBook(bookName, bookPrice)
    gBooks.push(newBook)
}

function updateBookPrice(bookId, bookPrice) {
    const updateBookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks[updateBookIdx].price = bookPrice
    _saveBooksToStorage()
}

function updateBookRate(bookId, bookRateChange) {
    const updateBookIdx = gBooks.findIndex(book => book.id === bookId)
    gBooks[updateBookIdx].rate += bookRateChange
    _saveBooksToStorage()
}

function getBookById(bookId) {
    const book = gBooks.find(book => bookId === book.id)
    return book
}

function setBookFilter(filterBy={}){
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    return gFilterBy
}

function _createBook(name, price = +getRandomInclusive(50, 99)) {
    return {
        id: gBookIdx++,
        imgUrl: `img/book${getRandomIntInclusive(1, 4)}.png`,
        name,
        price,
        description: makeLorem(),
        rate: 0,
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)

    if (!books || !books.length) {
        books = []
        gBookIdx = 1
        for (let i = 0; i < 4; i++) {
            var bookName = gBookNames[i]
            books.push(_createBook(bookName))
        }
    }
    gBooks = books
    gBookIdx = gBooks.length
    _saveBooksToStorage()
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}
