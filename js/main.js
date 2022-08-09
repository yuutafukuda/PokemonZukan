// PokeAPIの使い方を「転生しないブログ」をみて覚えました
// リンク https://tensei-shinai.com/2022/05/02/poke-api/

const pokemonImg = document.querySelector('#pokemon__img');
const pokemonNumber = document.querySelector('#pokemon__number');
const pokemonName = document.querySelector('#pokemon__name');

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); 
    const pokemonData = await APIResponse.json();

    return pokemonData;
}

const renderPokemon = async (pokemon) => {
    const pokemonData = await fetchPokemon(pokemon);

    // pokemonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonData.id}.gif`
    pokemonNumber.innerHTML = pokemonData.id ;
    pokemonName.innerHTML = pokemonData.name;
    pokemonImg.src = pokemonData['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
}

renderPokemon('pikachu');
