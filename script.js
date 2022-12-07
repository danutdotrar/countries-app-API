'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const btnReset = document.querySelector('.btn-reset');
const country = document.getElementById('country-name');


// Render error
function renderError(msg) {
    alert(msg);
};

// // Render country function (from 250 lesson)
function renderCountry(data, className = '') {

    // Get the first language from 'languages' object
    const [lang] = Object.values(data.languages);
    // console.log(lang);

    // Get the currency from 'currencies' object
    const [currency]= Object.values(data.currencies);
    // console.log(currency.name)

    let html = `
    <article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(+data.population/ 1000000).toFixed(1)} millions</p>
                <p class="country__row"><span>🗣️</span>${lang}</p>
            <p class="country__row"><span>💰</span>${currency.name}</p>
        </div>
    </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    
};

btn.addEventListener('click', function getCountryData() {

    // The fetch will return a promise
    // To handle the fulfilled state we can use the 'then()' method that is available on all promises
    // Into the 'then' method we need to pass a callback function that we want to be executed as soon as the promise is actually fulfilled

    // Country 1
    fetch(`https://restcountries.com/v3.1/name/${country.value}`)
        .then(response => response.json())
        .then(data => {
            renderCountry(data[0])
            // Get neighbour
            const neighbour = data[0].borders[0];

            if (!neighbour) return;

            // Country 2
            // fetch will return a promise, use then() method
            return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
        }).then(response => response.json())
          .then(data => renderCountry(data[0], 'neighbour'))
          .catch(error => {
            console.log(`${error}`);
            renderError(`Something went wrong :( ${error.message}.`)
        })
        .finally(() => {
            countriesContainer.style.opacity = '1';
        })

        country.style.display = 'none';
        btn.style.display = 'none';
        country.value = '';
});

btnReset.addEventListener('click', function() {
    countriesContainer.innerHTML = '';
    btn.style.display = 'flex';
    country.style.display = 'flex';
});