/* Rick and Morty analyzes */
// console.log("Rick and Morty analyzes is started ...");


const url = 'https://rickandmortyapi.com/api/character';

axios
    .get(url)
    .then(response => {
        const count = response.data.info.pages;
        const links = [...new Array(count)].map((el,i) => `${url}/?page=${i+1}`);
        Promise.all(links.map(el => axios.get(el)))
            .then(response => {
                const characters = ([...new Array(response.length)].map((el,i) => el = response[i].data.results)).flat();
                console.log(characters);
                
            })
            .catch(error => console.log('Error in all Promise', error));
    })
    .catch(error => console.log('Error in main Promise', error));



