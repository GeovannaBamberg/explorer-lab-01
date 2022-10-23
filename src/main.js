import "./css/index.css"
import IMask from 'imask'

const ccGbColor01 = document.querySelector(".cc-bg svg >g g:nth-child(1) path")
const ccGbColor02 = document.querySelector(".cc-bg svg >g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")


function setCardType(type) {
    const colors = {
        visa: ["#2D57F2", "#436D99"],
        mastercard: ["#C69347", "#DF6F29"],
        elo: ["#EF4123","#00A4E0"],
        default: ["black", "gray"]
    }

ccGbColor01.setAttribute("fill", colors[type][0])
ccGbColor02.setAttribute("fill", colors[type][1])
ccLogo.setAttribute("src", `cc-${type}.svg`)
}
// input do security code
const elementoCVC = document.getElementById("security-code") 
const cvcPattern ={
    mask: "000"
}
const cvcMasked = IMask(elementoCVC, cvcPattern)

const elementoDateExpiration = document.getElementById("expiration-date")

const DateExpirationPattern = {
    mask: "MM{/}YY",
    blocks: {
        MM:{
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2
        },
       YY:{
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()-5).slice(2),
            to: String(new Date().getFullYear()+5).slice(2)
        }
    }
}
const expirationDateMasked = IMask(elementoDateExpiration, DateExpirationPattern)

const cardNumber = document.querySelector('#card-number')
const  cardNumberPattern = {
    mask: [{
        mask: "0000 0000 0000 0000",
        regex: /4\d{0,15}/,
        cardType: 'visa'
    },
    {
        mask: "0000 0000 0000 0000",
        regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0-2})\d{0,12}/,
        cardType: 'mastercard'
    },
    {
        mask: "0000 0000 0000 0000",
        regex: /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-8][0-9]{2}|99[0-8][0-9]|999[0-9])|^627780|^63(6297|6368|6369)|^65(0(0(3([1-3]|[5-9])|4([0-9])|5[0-1])|4(0[5-9]|[1-3][0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8]|4[1-9]|[5-8][0-9]|9[0-8])|7(0[0-9]|1[0-8]|2[0-7])|9(0[1-9]|[1-6][0-9]|7[0-8]))|16(5[2-9]|[6-7][0-9])|50(0[0-9]|1[0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
        cardType: 'elo'
    },
    {
        mask: "0000 0000 0000 0000",
        cardType: 'default'
    }
],
dispatch: function(appended, dynamicMasked){
    const number = (dynamicMasked.value + appended).replace(/\D/g,'');

    const foundMask = dynamicMasked.compiledMasks.find(function(item) {
        return number.match(item.regex)
    }) 
    console.log(foundMask)
    return foundMask
}
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const addButton = document.querySelector("#add-card")

addButton.addEventListener("click", (e) =>{
    e.preventDefault()
    alert("clicou")
})

document.querySelector("form").addEventListener("submit", (event)=>{
    event.preventDefault()
})

const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", ()=>{
    let ccHolder = document.querySelector(".cc-holder .value")

    ccHolder.innerText = cardHolder.value
    ccHolder.innerText= cardHolder.value.length ===0? ccHolder.innerText="FULANO DA SILVA" :  cardHolder.value
})

cvcMasked.on("accept", ()=>{
    updateSecurityCode(cvcMasked.value)
})
function updateSecurityCode(code) {
    const ccSecurity = document.querySelector(".cc-security .value")
    ccSecurity.innerText = code.length===0? "123": code
}
cardNumberMasked.on("accept", ()=>{
    const cardType = cardNumberMasked.masked.currentMask.cardType
    setCardType(cardType)
    updateCardNumber(cardNumberMasked.value)
})
function updateCardNumber(code) {
    const numberCard = document.querySelector(".cc-number")
    numberCard.innerText = code.length===0? "1234 5678 9012 3456":code
}
expirationDateMasked.on("accept", ()=>{
    updateexpirationDate(expirationDateMasked.value)
})
function updateexpirationDate(date) {
    const ccexpiration = document.querySelector(".cc-expiration .value")
    ccexpiration.innerText = date.length===0? "02/32":date 
}
/* regex */

/* 
const re = /foo/ 
como ler: procure um "f" seguido de um "o" e seguide outro "o"

Um construtor de regex
const re = new RegExp(/foo/)

agrupar os padroes em um array:
const matcher = "aBC".match(/[A-Z]/g);
output = array [B,C]
leia: procure de [A á Z MAISCULO] no texto inteiro g= global

pESQUISE SE EXISTE OU NÃO O PADRÃO:
const index = "aBC".search(/[A-Z]/g);
output = 1 (resposta será sempre: 1 para sim, encontrou ou 0 para não, encontrou.)
leia: procure de [A á Z MAISCULO] dentro do texto, se encontrar retorne 1 ou 0
SUBSTITUI OS PADROES POR NOVO VALOR
const next = aBC".replace(/a/, 'A');

Oi Fala, Dev 
*/