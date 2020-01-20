//==========  Get Data (axios) ==========

const url = 'https://rickandmortyapi.com/api/character';

function getData () {
axios
    .get(url)
    .then(response => {
        const count = response.data.info.pages;
        const links = [...new Array(count)].map((el,i) => `${url}/?page=${i+1}`);
        Promise.all(links.map(el => axios.get(el)))
            .then(response => {
                const characters = ([...new Array(response.length)]
                    .map((el,i) => el = response[i].data.results))
                    .flat();
                localStorage.setItem("charKey", JSON.stringify(characters));
            })
            .catch(error => console.log('Error in all Promise', error));
    })
    .catch(error => console.log('Error in main Promise', error));
};

getData ();

function deleteFromLs () {
    localStorage.getItem("charKey") ? localStorage.removeItem("charKey") : console.log('no data');
}

function getDataFromLs () {
    let data = {};
    localStorage.getItem("charKey") ? data = JSON.parse(localStorage.getItem("charKey")) : alert('В localStorage нет данных. Загрузите данные.');
    return data;
}

document.getElementById("write-ls").onclick = getData;
document.getElementById("delete-ls").onclick = deleteFromLs;
// sorting =======================

function sortByCategory (obj, key1, key2, key3) {
    let result = obj;
        switch (true) {
            case (key1.length > 0 && key2.length == 0 && key3.length == 0):
                result = obj.filter(el => el.gender == key1);
                break;
            case (key1.length == 0 && key2.length > 0 && key3.length == 0):
                result = obj.filter(el => el.status == key2);
                break;
            case (key1.length == 0 && key2.length == 0 && key3.length > 0):
                result = obj.filter(el => el.species == key3);
                break;
            case (key1.length > 0 && key2.length > 0 && key3.length == 0):
                result = obj.filter(el => (el.gender == key1 && el.status == key2));
                break;
            case (key1.length > 0 && key2.length == 0 && key3.length > 0):
                result = obj.filter(el => (el.gender == key1 && el.species == key3));
                break;
            case (key1.length == 0 && key2.length > 0 && key3.length > 0):
                result = obj.filter(el => (el.status == key2 && el.species == key3));
                break;
            case (key1.length > 0 && key2.length > 0 && key3.length > 0):
                result = obj.filter(el => (el.gender == key1 && el.status == key2 && el.species == key3));
                break;
        }
        console.log(result);
    return result;
};

function createHTMLNode (tag, attrs, content) {
    let el = document.createElement(tag);
    attrs.map(attr => {el.setAttribute(attr.name, attr.value.join(' '))});
    content?el.innerHTML=content:null;
    return el;
}

function outputCards (dataObject) {
    document.getElementById('results-col') ? document.getElementById ('results-col').remove() : null;
    const resWrapper = createHTMLNode ('div', [{name: 'class', value: ['col resWrapper']}, {name: 'id', value: ['results-col']}], null);
    const res = createHTMLNode ('h4', [{name: 'class', value: ['text-primary']}], `Найдено результатов: ${dataObject.length}`);
    resWrapper.appendChild(res);
    document.getElementById('results').appendChild(resWrapper);
    document.getElementById('card-col') ? document.getElementById ('card-col').remove() : null;
    const col = createHTMLNode ('div', [{name: 'class', value: ['col output-div']}, {name: 'id', value: ['card-col']}], null);
    dataObject.map(el => {
        const title = createHTMLNode ('h5', [{name: 'class', value: ['card-title']}], `Name: ${el.name}`);
        const text = createHTMLNode ('p', [{name: 'class', value: ['card-text']}], `Origin: ${el.origin.name}`);
        const body = createHTMLNode ('div', [{name: 'class', value: ['card-body']}], null);
        const image = createHTMLNode ('img', [{name: 'class', value: ['card-img-top']}, {name: 'src', value: [`${el.image}`]}], null);
        const card = createHTMLNode ('div', [{name: 'class', value: ['card']}, {name: 'id', value: ['datacard']}], null);
        body.appendChild(title);
        body.appendChild(text);
        card.appendChild(image);
        card.appendChild(body);
        col.appendChild(card);
        document.getElementById('output').appendChild(col);
})}

function getResults () {
    let inpData = getDataFromLs ();
    let gend = document.getElementById("selGender").value;
    let stat = document.getElementById("selStatus").value;
    let spec = document.getElementById("selSpecies").value;
    let sortedArray = sortByCategory(inpData, gend, stat, spec);
    outputCards(sortedArray);
    document.getElementById ('selGender').value = "";
    document.getElementById ('selStatus').value = "";
    document.getElementById ('selSpecies').value = "";  
}

document.getElementById("sort-run").onclick = getResults;
