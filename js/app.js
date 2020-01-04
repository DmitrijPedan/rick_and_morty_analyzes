//==========  Get Data (axios) ==========

const url = 'https://rickandmortyapi.com/api/character';

const getData = function() {
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

//==========  Local Storage ==========
const deleteFromLs = () => localStorage.removeItem("charKey");
document.getElementById("write-ls").onclick = getData;
document.getElementById("delete-ls").onclick = deleteFromLs;
 
//==========  Sorting ==========
function sortData () {
    let data = {};
    if (localStorage.getItem("charKey")) {
        data = JSON.parse(localStorage.getItem("charKey"));
    } else {
        alert('В localStorage нет данных. Загрузите данные.');
        return;
    }
    let gend = document.getElementById("selGender").value;
    let stat = document.getElementById("selStatus").value;
    let spec = document.getElementById("selSpecies").value;
    let result = sortByCategory(data, gend, stat, spec);


    console.log(result);
    console.log(data);
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
    return result.map(el => `id: ${el.id}, Имя: ${el.name}, пол: ${el.gender}, вид: ${el.species}, статус: ${el.status}`);
};

document.getElementById("sort-run").onclick = sortData;

//==========  Output data ==========
function outputDataToList () {
    let div = document.createElement('div');
}
outputDataToList ()


