import data from '../world-cities_json.json' assert { type: 'json' };

let countries = [];
const countryListElement = document.querySelector('#country-list');
const countryListElementDest = document.querySelector('#country-list-dest');
const countryInputElement = document.querySelector('#country-input');
const countryInputElementDest = document.querySelector('#country-input-dest');

let aux = '';
function fetchCountries() { 
    countries = data.map(x => x.country)
    countries.sort();
    loadData(countries, countryListElement)
    loadData(countries, countryListElementDest)
}
// data.forEach((e) => {
    
//     if(aux !== e.country) {
//         aux = e.country;
//         $("#country-list").append(`<li class="mb-2" id="country-selected" onclick="hideCountryList()">${e.country}</li>`);
//     }
    
// })

fetchCountries()

function loadData(data, element, isDest='') {
    if(data) {
        element.innerHTML = "";
        let innerElement = "";
        let aux = '';
        data.forEach((e) => {
    
            if(aux !== e) {
                aux = e;
                innerElement += `<li class="mb-2" id="country-selected" onclick="fillInput('${e}','${isDest}')">${e}</li>`;
            }
            
        })
        element.innerHTML = innerElement;
        
    }
}

function filterData(data, searchText) {
    return data.filter(x => x.toLowerCase().includes(searchText.toLowerCase()));
}

countryInputElement.addEventListener('input', function () {
    $("#country-list").removeClass("visually-hidden");
    const filteredData = filterData(countries, countryInputElement.value);
    loadData(filteredData, countryListElement)
})
countryInputElementDest.addEventListener('input', function () {
    $("#country-list-dest").removeClass("visually-hidden");
    const filteredDataDest = filterData(countries, countryInputElementDest.value);
    loadData(filteredDataDest, countryListElementDest, '-dest')
})

 

