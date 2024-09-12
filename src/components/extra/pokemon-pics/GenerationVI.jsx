import { useContext } from "react";
import PokemonData from "../../../context/PokemonData";
import PokemonPicture from "../../../context/PokemonPicture";

const GenerationVI = () => {
    const { pokemonPicture, setPokemonPicture } = useContext(PokemonPicture);
    const { pokemonData, setPokemonData } = useContext(PokemonData);
    return(
        <>
        <h2>Generation VI</h2>
         <div className="omegaruby-alphasapphire">
          <h3>Omegaruby-alphasapphire</h3>
            <button
              onClick={() =>
                setPokemonPicture({
                  front: pokemonData.sprites.versions["generation-vi"]["omegaruby-alphasapphire"]
                  .front_default,
                  back: pokemonData.sprites.versions["generation-vi"]["omegaruby-alphasapphire"]
                  .back_default,
                })
              }
            >
              Male
            </button>
            <button
              onClick={() =>
                setPokemonPicture({
                  front: pokemonData.sprites.versions["generation-vi"]["omegaruby-alphasapphire"]
                  .front_female,
                  back: pokemonData.sprites.versions["generation-vi"]["omegaruby-alphasapphire"]
                  .back_female,
                })
              }
            >
              Female
            </button>
            <button
              onClick={() =>
                setPokemonPicture({
                  front: pokemonData.sprites.versions["generation-vi"]["omegaruby-alphasapphire"]
                  .front_shiny,
                  back: pokemonData.sprites.versions["generation-vi"]["omegaruby-alphasapphire"]
                  .back_shiny,
                })
              }
            >
              Shiny-Male
            </button>
            <button
              onClick={() =>
                setPokemonPicture({
                  front: pokemonData.sprites.versions["generation-vi"]["omegaruby-alphasapphire"]
                  .front_shiny_female,
                  back: pokemonData.sprites.versions["generation-vi"]["omegaruby-alphasapphire"]
                  .back_shiny_female,
                })
              }
            >
              Shiny-Female
            </button>
          </div>






          <div className="x-y">
            <h3>X-Y</h3>
          <button
              onClick={() =>
                setPokemonPicture({
                  front: pokemonData.sprites.versions["generation-vi"]["x-y"]
                  .front_default,
                  back: pokemonData.sprites.versions["generation-vi"]["x-y"]
                  .back_default,
                })
              }
            >
              Male
            </button>
            <button
              onClick={() =>
                setPokemonPicture({
                  front: pokemonData.sprites.versions["generation-vi"]["x-y"]
                  .front_female,
                  back: pokemonData.sprites.versions["generation-vi"]["x-y"]
                  .back_female,
                })
              }
            >
              Female
            </button>
            <button
              onClick={() =>
                setPokemonPicture({
                  front: pokemonData.sprites.versions["generation-vi"]["x-y"]
                  .front_shiny,
                  back: pokemonData.sprites.versions["generation-vi"]["x-y"]
                  .back_shiny,
                })
              }
            >
              Shiny-Male
            </button>
            <button
              onClick={() =>
                setPokemonPicture({
                  front: pokemonData.sprites.versions["generation-vi"]["x-y"]
                  .front_shiny_female,
                  back: pokemonData.sprites.versions["generation-vi"]["x-y"]
                  .back_shiny_female,
                })
              }
            >
              Shiny-Female
            </button>

          </div>
        </>
    )
}

export default GenerationVI