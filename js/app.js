/*==================== Rick and Morty analyzes ==========================*/

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

const deleteFromLs = () => {
    localStorage.removeItem("charKey");
};

document.getElementById("write-ls").onclick = getData;
document.getElementById("delete-ls").onclick = deleteFromLs;
 
//==========  Analyzes ==========

//  const getCharactersInfo = () => {
//     const names = data.map(el => `id: ${el.id}, Имя: ${el.name}, вид: ${el.species}, пол: ${el.gender}, статус: ${el.status}. <br> `);
//     document.getElementById("output").innerHTML = names;
// };

function sortData () {
    let data = {};
    localStorage.getItem("charKey") ? data = JSON.parse(localStorage.getItem("charKey")) : alert('В localStorage нет данных. Загрузите данные.');
   


    let gend = document.getElementById("selGender").value;
    let stat = document.getElementById("selStatus").value;
    let spec = document.getElementById("selSpecies").value;
    
    
    
    
    
    
    console.log(gend, typeof(gend));
    console.log(stat, typeof(stat));
    console.log(spec, typeof(spec));
}


document.getElementById("sort-run").onclick = sortData;


const getGenderCharacters = (characters) => {
    const genders = {1: "Male", 2: "Female", 3: "Genderless", 4: "unknown"};
    const result = characters
        .filter(el => el.gender === (genders[2]))
        .map(el => `ID: ${el.id}, Имя: ${el.name}, вид: ${el.species}, статус: ${el.status}`);
    console.log(result);
};

const getHumansCharacters = (characters) => {
    const genders = {1: "Male", 2: "Female", 3: "Genderless", 4: "unknown"};
    const result = characters
        .filter(el => el.gender === (genders[2]))
        .map(el => `ID: ${el.id}, Имя: ${el.name}, вид: ${el.species}, пол: ${el.gender}, статус: ${el.status}`);
    console.log(result);
};


