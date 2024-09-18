import { useContext, useState } from "react";
import PokemonData from "../../context/PokemonData";
import PokemonPicture from "../../context/PokemonPicture";

const url = import.meta.env.VITE_URL;

const Search = () => {
    const [searchedPokemon, setSearchedPokemon] = useState("");
    const {pokemonData, setPokemonData} = useContext(PokemonData);
    const {pokemonPicture, setPokemonPicture} = useContext(PokemonPicture)
    
    async function test(e) {
        e.preventDefault();

        if(!searchedPokemon){
            return alert("Type in your favorite pokemon")
        }
        try {
            const response = await fetch(`${url}/${searchedPokemon}`, { 
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const newData = await response.json();
            console.log(newData);
            
            if (response.ok) {
                setPokemonData(newData); 
                setPokemonPicture({front: newData.sprites?.front_default, back: newData.sprites.back_default})
            } else {
                console.log(newData.response);
                alert("Pokemon not found!")
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Pokemon not found!")
        }
        setSearchedPokemon("")
    }

    return (
        <>
            <form onSubmit={test}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name or number"
                    value={searchedPokemon}
                    onChange={(e) => setSearchedPokemon(e.target.value)}
                    required
                />
                <button type="submit">Search</button>
            </form>
        </>
    );
};

export default Search;
