
// const getCurrencyOptions = async() => {
//     const apiUrl = 'https://api.exchangerate.host/symbols'
//     const response = await fetch(apiUrl)
//     const data = await response.json()
//     // console.log(json.symbols);
//     return (data.symbols);
// }

        //OR

const getCurrencyOptions = async () => {
    const apiUrl = 'https://api.exchangerate.host/symbols';
    const symbols = fetch(apiUrl).then((response) => response.json()).then((data) => data.symbols)
   return symbols
}

// *******

// const getCurrencyRates = async(fromCurrency, toCurrency) => {
//     const apiUrl = 'https://api.exchangerate.host/convert'
//     const currencyConvertUrl = new URL(apiUrl)
//     currencyConvertUrl.searchParams.append('from', fromCurrency)
//     currencyConvertUrl.searchParams.append('to', toCurrency)
//     // console.log(currencyConvertUrl);

//     const response = await fetch(currencyConvertUrl);
//     const json = await response.json()
//     // console.log(json.result);
//     return json.result;

// }

                // OR 

const getCurrencyRates = async(fromCurrency, toCurrency) => {
    const apiUrl = 'https://api.exchangerate.host/convert'
    const currencyConvertUrl = new URL(apiUrl)
    currencyConvertUrl.searchParams.append('from', fromCurrency)
    currencyConvertUrl.searchParams.append('to', toCurrency)

    const result = fetch(currencyConvertUrl)
    .then((response) => response.json())
    .then((data) => data.result)
    return result;
}

// getCurrencyRates();

// *******************

const appendOptionsElToSelectEl = (optionItem, selectEl) => {
    const optionEl = document.createElement("option"); //create <option> element on html
    optionEl.value = optionItem.code  //The value of the option
    optionEl.textContent = optionItem.description //The displayed description of the option. That will be shown
    selectEl.appendChild(optionEl)
}

const populateSelectEl = (selectEl, optionItems) => {
    optionItems.forEach((optionItem) => appendOptionsElToSelectEl(optionItem, selectEl))
}

const setUpCurrencies = async () => {
    const fromCurrency = document.getElementById('fromCurrency')
    const toCurrency = document.getElementById('toCurrency')

    const currencyOptions = await getCurrencyOptions()
    const currenciesArray = Object.keys(currencyOptions)   //Convert the keys to array

    const currencies = currenciesArray.map((currencyKeys) => currencyOptions[currencyKeys] )  

    // console.log(currencies);
    
    populateSelectEl(fromCurrency, currencies)
    populateSelectEl(toCurrency, currencies)

}
setUpCurrencies()

const setUpEventListener =() => {
    const formEl = document.getElementById('convert');
    formEl.addEventListener('submit', async(event) => {
        event.preventDefault()      //It prevents page to refresh after form submission
        const fromCurrency = document.getElementById('fromCurrency')
        const toCurrency = document.getElementById('toCurrency')
        const amount = document.querySelector('#amount')
        const convertResultEl = document.querySelector('#result')    

       
        try { 
            const rates = await getCurrencyRates(fromCurrency.value, toCurrency.value);
            const amountValue = Number(amount.value);         //Convert to Number
            const conversionRate = Number(amountValue * rates).toFixed(2)
            convertResultEl.textContent = `${amountValue} ${fromCurrency.value} = ${conversionRate} ${toCurrency.value}`
    
        }
        catch (err) {
            convertResultEl.textContent = `There is an error: ${err.message}`
            convertResultEl.classList.add('error')          //add class to our html document
        }
    })
}
setUpEventListener()