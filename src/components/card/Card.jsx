import { useContext, useEffect, useRef, useState } from "react";
import PokemonData from "../../context/PokemonData";
import PokemonPicture from "../../context/PokemonPicture";
import { cardColor } from "../data/cardColor";
import defaultPic from "/not-implented.jpg";
import "./card.css";
import SecondDataFetch from "../../context/SecondDataFetch";
import PokemonCounter from "../../context/PokemonCounter";
import { typeFunction } from "../function/TypeFunction";
import Translater from "../translater/Translater";
import { firstDataFetch } from "../function/firstDataFetch";
import HoverText from "../function/HoverText";

const url = import.meta.env.VITE_URL;

const Card = () => {
  const { pokemonData, setPokemonData } = useContext(PokemonData);
  const { pokemonPicture, setPokemonPicture } = useContext(PokemonPicture);
  const { secondDataFetch, setSecondDataFetch } = useContext(SecondDataFetch);
  const { pokemonCounter, setPokemonCounter } = useContext(PokemonCounter);
  const [language, setLanguage] = useState("en");
  const [searchedPokemon, setSearchedPokemon] = useState("");
  const [cooldown, setCooldown] = useState(true);
  const [pokemonSound, setPokemonSound] = useState(pokemonData?.cries);
  const [volume, setVolume] = useState(1);

 
  const legacyAudioRef = useRef(null);
  const latestAudioRef = useRef(null);

  
  
  useEffect(() => {
    if (pokemonData?.cries) {
      setPokemonSound(pokemonData.cries);
    }
  }, [pokemonData]);

  const handlePlayLegacySound = () => {
    if (legacyAudioRef.current) {
      legacyAudioRef.current.volume = volume;
      legacyAudioRef.current.play();
    }
  };

  const handlePlayLatestSound = () => {
    if (latestAudioRef.current) {
      latestAudioRef.current.volume = volume;
      latestAudioRef.current.play();
    }
  };

  if (cooldown) {
    setTimeout(() => {
      setCooldown(false);
    }, 5000);
  }
  
  
  
  const cardBackground =
    pokemonData?.types?.[0]?.type &&
    cardColor.find((item) => item.typ === pokemonData.types[0].type.name)
      ?.backgroundColor;

  const pokemonType = pokemonData?.types?.map((item) => item.type.name);
  const [allTypes, setAllTypes] = useState(
    cardColor.filter((type) => pokemonType?.includes(type.typ))
  );
  const [typeLanguage, setTypeLanguage] = useState([]);
  const pokemonId = pokemonData.id;
  const weight = pokemonData.weight / 10;
  const height = pokemonData.height / 10;
  const baseExperience = pokemonData.base_experience;

  useEffect(() => {
    typeFunction(
      cardColor.filter((type) => pokemonType?.includes(type.typ)),
      typeLanguage,
      setTypeLanguage,
      language
    );
  }, [language]);

  useEffect(() => {
    setTypeLanguage(
      cardColor.filter((type) => pokemonType?.includes(type.typ))
    );
    setLanguage("en");
  }, [pokemonData]);

  const languageText = [
    {
      name: secondDataFetch?.names?.filter(
        (item) => item.language.name === language
      ),
    },
    {
      animal: secondDataFetch?.genera?.filter(
        (item) => item.language.name === language
      ),
    },
    {
      text: secondDataFetch?.flavor_text_entries?.filter(
        (item) => item.language.name === language
      ),
    },
    {
      type: typeLanguage,
    },
  ];

  const pokemonName = languageText[0]?.name?.[0]?.name || "Unknown Pokemon";
  const pokemonAnimal = languageText[1]?.animal?.[0]?.genus || "Unknown Animal";
  const pokemonText =
    languageText[2]?.text?.map((item) => item.flavor_text) || [];

  const handlePokemonChange = async (newId) => {
    setSearchedPokemon(newId);
    await firstDataFetch(
      newId,
      url,
      setPokemonCounter,
      setPokemonData,
      setPokemonPicture,
      setSearchedPokemon,
      setSecondDataFetch
    );
  };
  

  console.log(pokemonData);
  

  return (
    <>
      {pokemonData && pokemonData.name ? (
        <div>
          <div>
            <Translater
              setLanguage={setLanguage}
              setPokemonCounter={setPokemonCounter}
              typeFunction={typeFunction}
              cardColor={cardColor}
              pokemonType={pokemonType}
              typeLanguage={typeLanguage}
              setTypeLanguage={setTypeLanguage}
              language={language}
              allTypes={allTypes}
              pokemonData={pokemonData}
            />
          </div>
          <div
            style={{
              backgroundColor: cardBackground,
            }}
            className="pokemon-card"
          >
            <div className="header">
              <h2>{pokemonName}</h2>
              <p>Order: {pokemonId}</p>
            </div>

            <div className="pic-div">
              <img
                style={{
                  objectFit:
                    (pokemonPicture && pokemonPicture.front === null) ||
                    pokemonPicture.front === undefined
                      ? "scale-down"
                      : "fill",
                }}
                src={
                  (pokemonPicture && pokemonPicture.front === null) ||
                  pokemonPicture.front === undefined
                    ? defaultPic
                    : pokemonPicture.front
                }
                alt={pokemonData.name}
              />
              <img
                style={{
                  objectFit:
                    (pokemonPicture && pokemonPicture.front === null) ||
                    pokemonPicture.front === undefined
                      ? "scale-down"
                      : "fill",
                }}
                src={
                  (pokemonPicture && pokemonPicture.back === null) ||
                  pokemonPicture.back === undefined
                    ? defaultPic
                    : pokemonPicture.back
                }
                alt={pokemonData.name}
              />
            </div>
            <div className="type-container">
              <p>Type:</p>
              <div className="type-div">

                <div className="swap-pokemon-button-container">
                  <HoverText text={"Previos"} />
                  <button
                    style={{
                      background:
                        cooldown ||
                        pokemonData.id <= 1 ||
                        pokemonData.id >= 1026
                          ? "gray"
                          : "",
                    }}
                    disabled={
                      cooldown || pokemonData.id <= 1 || pokemonData.id >= 1025
                    }
                    className="swap-pokemon-button"
                    onClick={() => {
                      handlePokemonChange(pokemonData.id - 1),
                        setCooldown(true);
                    }}
                  >
                    <i className="fa-solid fa-circle-arrow-left"></i>
                  </button>
                </div>

                {languageText[3].type.map((item) => (
                  <div className="type" key={item.id}>
                    <p>
                      {item.typ[0].toUpperCase() +
                        item.typ.slice(1).toLowerCase()}
                    </p>
                    <img src={item.symbol} alt={item.typ} />
                  </div>
                ))}

                <div className="swap-pokemon-button-container">
                  <HoverText text={"Next"} />
                  <button
                    style={{
                      background:
                        cooldown || pokemonData.id >= 1025 ? "gray" : "",
                    }}
                    disabled={cooldown || pokemonData.id >= 1025}
                    className="swap-pokemon-button"
                    onClick={() => {
                      handlePokemonChange(pokemonData.id + 1),
                        setCooldown(true);
                    }}
                  >
                    <i className="fa-solid fa-circle-arrow-right"></i>
                  </button>
                </div>

              </div>
            </div>
            <div className="card-informations">
              <p>Animal: {pokemonAnimal}</p>
              <p>Weight: {weight} kg</p>
              <p>Height: {height} m</p>
              <p>Base experience: {baseExperience}</p>
            </div>

            <div className="pokemon-cries" style={{justifyContent: pokemonSound?.legacy === null || pokemonSound?.latest === null ? "center" : ""}}>
            {pokemonSound?.legacy && (
              <div>
                <p>Legacy Sound:</p>
                <audio
                  key={pokemonSound.legacy}  
                  ref={legacyAudioRef}
                >
                  <source src={pokemonSound.legacy} type="audio/ogg" />
                </audio>
                <button onClick={handlePlayLegacySound}><i className="fa-solid fa-play"></i></button>
              </div>
            )}

            {pokemonSound?.latest && (
              <div>
                <p>Latest Sound:</p>
                <audio
                  key={pokemonSound.latest}
                  ref={latestAudioRef}
                >
                  <source src={pokemonSound.latest} type="audio/ogg" />
                </audio>
                <button onClick={handlePlayLatestSound}><i className="fa-solid fa-play"></i></button>
              </div>
            )}
    </div>
    <div>
            <label htmlFor="volume">Volume: {Math.round(volume * 100)}%</label>
            <input style={{background: "transparent"}}
              id="volume"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
          </div>


            <div className="card-text">
              {pokemonText.length > 0 ? (
                <div className="text-button">
                  <button
                    style={{ background: pokemonCounter === 0 ? "gray" : "" }}
                    disabled={pokemonCounter === 0}
                    onClick={() => setPokemonCounter(pokemonCounter - 1)}
                  >
                    <i className="fa-solid fa-circle-arrow-left"></i>
                  </button>
                  <p>
                    {pokemonCounter + 1}/{pokemonText?.length}
                  </p>
                  <button
                    style={{
                      background:
                        pokemonCounter + 1 === pokemonText?.length
                          ? "gray"
                          : "",
                    }}
                    disabled={pokemonCounter + 1 === pokemonText?.length}
                    onClick={() => setPokemonCounter(pokemonCounter + 1)}
                  >
                    <i className="fa-solid fa-circle-arrow-right"></i>
                  </button>
                </div>
              ) : (
                ""
              )}

              <p>
                {pokemonText.length
                  ? pokemonText[pokemonCounter]
                  : "No informations available"}
              </p>
            </div>

            <div className="card-footer">
              <p className="card-footer-p">
                Designed by MSR, {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Card;
