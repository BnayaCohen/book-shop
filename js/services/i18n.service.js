'use strict'

var gTrans = {
    title: {
        en: 'Welcome to the best book shop',
        he: 'ברוכים הבאים לחנות המטורפת'
    },
    language: {
        en: 'Language:',
        he: 'שפה:',
    },
    'filter-title': {
        en: 'Filter',
        he: 'פילטר',
    },
    'filter-min-rate': {
        en: 'Set min rate:',
        he: 'דירוג מינימלי:',
    },
    'table-head-id': {
        en: 'Id',
        he: 'מספור',
    },
    'table-head-image': {
        en: 'Image',
        he: 'תמונה',
    },
    'table-head-title': {
        en: 'Title',
        he: 'כותר',
    },
    'table-head-price': {
        en: 'Price',
        he: 'מחיר',
    },
    'table-head-rate': {
        en: 'Rate',
        he: 'דירוג',
    },
    'table-head-actions': {
        en: 'Actions',
        he: 'פעולות',
    },
    'table-read': {
        en: 'Read',
        he: 'הצג',
    },
    'table-update': {
        en: 'Update',
        he: 'עדכן',
    },
    'table-delete': {
        en: 'Delete',
        he: 'מחק',
    },
    'update-book-price': {
        en: 'Update Price',
        he: 'עדכן מחיר',
    },
    'add-new-book': {
        en: 'Add new book',
        he: 'הוסף ספר חדש',
    },
    'close-modal-btn': {
        en: 'Close',
        he: 'סגור',
    },
    'page-back': {
        en: 'Back',
        he: 'אחורה',
    },
    'page-next': {
        en: 'Next',
        he: 'קדימה',
    },
    'max-price-placeholder': {
        en: 'Set max price',
        he: 'הכנס מחיר הכי גבוה'
    },
    'new-book-name-placeholder': {
        en: 'Set book name',
        he: 'הכנס את שם הספר'
    },
    'new-book-price-placeholder': {
        en: 'Set book price',
        he: 'הכנס את מחיר הספר'
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return "UNKNOWN";

    var txt = keyTrans[gCurrLang] // he
    if (!txt) txt = keyTrans.en

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)

        if (el.localName === "input") {
            el.setAttribute("placeholder", txt)
        } else el.innerText = txt
    })
}

function setLang(lang) {
    gCurrLang = lang // he
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    switch (gCurrLang) {
        case 'he': return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS' }).format(num);
        case 'en': return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
    }
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang, options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}