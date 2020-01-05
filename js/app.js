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

function deleteFromLs () {
    localStorage.getItem("charKey") ? localStorage.removeItem("charKey") : console.log('no data');
}

function getDataFromLs () {
    let data = {};
    localStorage.getItem("charKey") ? data = JSON.parse(localStorage.getItem("charKey")) : alert('В localStorage нет данных. Загрузите данные.');
    return data;
}
 
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

function outputDataToList (arr) {
    let ol = document.createElement('ol');
    ol.className = "ol-result-list";
    ol.id = "resultList"
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let li = document.createElement('li');
        li.append(`${arr[i].name} --- происхождение: ${arr[i].origin.name}`);
        result.push(li);
    }
    output.prepend(ol);
    ol.append(`Найдено: ${arr.length}`);
    ol.append(...result); 
};

function sortData () {
    let inpData = getDataFromLs ();
    let gend = document.getElementById("selGender").value;
    let stat = document.getElementById("selStatus").value;
    let spec = document.getElementById("selSpecies").value;
    let sortedArray = sortByCategory(inpData, gend, stat, spec);
    outputDataToList(sortedArray);
}

function deleteOlList () {
    if (document.getElementById("resultList")) {
        document.getElementById("resultList").remove();
    } return;
};

document.getElementById("write-ls").onclick = getData;
document.getElementById("delete-ls").onclick = deleteFromLs;
document.getElementById("sort-run").onclick = sortData;
document.getElementById("clear-result").onclick = deleteOlList;


