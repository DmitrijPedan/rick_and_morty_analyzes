/* Rick and Morty analyzes */

const url = 'https://rickandmortyapi.com/api/character';

const getData = function(clb) {
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
                clb(characters);
                // console.log(clb);
                // console.log(characters);
            })
            .catch(error => console.log('Error in all Promise', error));
    })
    .catch(error => console.log('Error in main Promise', error));
};

const getCharactersInfo = (characters) => {
    const names = characters.map(el => `ID: ${el.id}, Имя: ${el.name}, вид: ${el.species}, пол: ${el.gender}, статус: ${el.status}`);
    console.log(names);
};

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



getData(getGenderCharacters);
