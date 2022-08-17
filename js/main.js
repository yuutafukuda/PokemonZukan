// I've learned how to PokeAPI at「転生しないブログ」
// https://tensei-shinai.com/2022/05/02/poke-api/

const pokemonImg = document.querySelector('#pokemon__img');
const pokemonNumber = document.querySelector('#pokemon__number');
const pokemonName = document.querySelector('#pokemon__name');

const form = document.querySelector('#form');
const  input = document.querySelector('.input-search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); 

    if (APIResponse.status === 200) { //verification of valid pokemon name
        const pokemonData = await APIResponse.json();
        return pokemonData;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading ...';
    pokemonNumber.innerHTML = '';

    const pokemonData = await fetchPokemon(pokemon);

    if (pokemonData) {
        pokemonNumber.innerHTML = pokemonData.id ;
        pokemonName.innerHTML = pokemonData.name;
        pokemonImg.src = pokemonData['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonImg.style.display = 'block';
        searchPokemon = pokemonData.id;
    } else {
        pokemonName.innerHTML = 'Not found :(';
        pokemonNumber.innerHTML = '';
        pokemonImg.style.display = 'none';
    }

    input.value = '';
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);