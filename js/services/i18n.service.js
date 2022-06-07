'use strict'

var gTrans = {
    title: {
        en: 'What Todo?',
        es: 'Mis Cosas Por Hacer',
        he: 'משימות'
    },
    subtitle: {
        en: 'MVC - Model-View-Controller',
        es: 'MVC - Modelo-Vista-Controlador',
        he: 'מודל - ויו - קונטרולר',
    },
    'filter-all': {
        en: 'All',
        es: 'Todos',
        he: 'הכל',
    },
    'filter-active': {
        en: 'Active',
        es: 'Activo',
        he: 'פעיל'
    },
    'filter-done': {
        en: 'Done',
        es: 'Completo',
        he: 'הושלם',
    },
    'stat-todo-label': {
        en: 'Todo',
        es: 'Hacer',
        he: 'לעשות',
    },
    'stat-active-label': {
        en: 'Active',
        es: 'Activo',
        he: 'פעיל',
    },
    add: {
        en: 'Add',
        es: 'Aggregar',
        he: 'הוסף',
    },
    sure: {
        en: 'Are you sure?',
        es: 'Estas Seguru?',
        he: 'בטוח נשמה?',
    },
    'add-todo-placeholder': {
        en: 'What needs to be done?',
        es: 'Que te tienes que hacer?',
        he: 'מה יש לעשות?'
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if(!keyTrans) return "UNKNOWN";
    
    var txt = keyTrans[gCurrLang] // he
    if(!txt) txt = keyTrans.en

    return txt
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(el => {
        var transKey = el.dataset.trans
        var txt = getTrans(transKey)
        
        if(el.localName === "input") {
            el.setAttribute("placeholder",txt)
        } else el.innerText = txt 
    })
}

function setLang(lang) {
    gCurrLang = lang // he
}

// function formatNumOlder(num) {
//     return num.toLocaleString('es')
// }

// function formatNum(num) {
//     return new Intl.NumberFormat(gCurrLang).format(num);
// }

// function formatCurrency(num) {
//     return new Intl.NumberFormat('he-IL',{ style: 'currency', currency: 'ILS' }).format(num);
// }

// function formatDate(time) {

//     var options = {
//         year: 'numeric', month: 'short', day: 'numeric',
//         hour: 'numeric', minute: 'numeric',
//         hour12: true,
//     };

//     return new Intl.DateTimeFormat(gCurrLang,options).format(time);
// }

// function kmToMiles(km) {
//     return km / 1.609;
// }