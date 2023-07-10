import { useRouter } from "next/router";
import useSWR from "swr";
import { fetchFromURL } from "./_app";
import Image from "next/image";
import styled from "styled-components";

type PokemonDetailsData = {
  name: string;
  height: number;
  order: number;
  sprites: { front_default: string };
  types: [{ type: { name: string; url: string } }];
};

const StyledParagraph = styled.p`
  text-align: left;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: left;

  text-transform: capitalize;
  margin: 0 auto;
  width: fit-content;
  align-content: left;
  padding: 5rem;
  border: 1px solid white;
`;

const StyledList = styled.ul`
  list-style: none;
`;

export default function PokemonDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data: pokemons } = useSWR(
    "https://pokeapi.co/api/v2/pokemon/" + id,
    fetchFromURL<PokemonDetailsData>
  );

  const {
    data: pokemonDetails,
    isLoading,
    error,
  } = useSWR(
    "https://pokeapi.co/api/v2/pokemon/" + id,
    fetchFromURL<PokemonDetailsData>
  );
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (typeof pokemonDetails === "undefined") {
    return <h1>{error.message}</h1>;
  }
  console.log(pokemonDetails);
  return (
    <StyledDiv>
      <Image
        alt=""
        src={pokemonDetails.sprites.front_default}
        width={100}
        height={100}
      />
      <StyledParagraph>Name: {pokemonDetails.name}</StyledParagraph>
      <StyledParagraph>Height: {pokemonDetails.height}</StyledParagraph>
      <StyledParagraph>Order: {pokemonDetails.order}</StyledParagraph>
      <StyledParagraph>Types:</StyledParagraph>
      <ul>
        {pokemonDetails.types.map((type) => {
          console.log(type);
          return (
            <StyledList key={type.type.name}>
              <StyledParagraph>{type.type.name}</StyledParagraph>
            </StyledList>
          );
        })}
      </ul>
    </StyledDiv>
  );
}
