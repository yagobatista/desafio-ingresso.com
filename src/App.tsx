import React, { useState, useEffect } from "react";
import "./App.css";
import { IMovie, IState, ICity } from "./Interfaces";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "./movieCard";

const App: React.FC = () => {
  const defaultCity = { id: 0, name: "Cidade" };
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [emAlta, setEmAlta] = useState<IMovie[]>([]);
  const [emBreve, setEmBreve] = useState<IMovie[]>([]);
  const [familia, setFamilia] = useState<IMovie[]>([]);
  const [culturais, setCulturais] = useState<IMovie[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([defaultCity]);
  const [city, setCity] = useState<ICity>();
  const tags = [
    {
      id: "5",
      name: "Em Alta",
      groupingActive: true,
      priority: 2,
      showAllEnabled: false,
      urlKey: "em-alta"
    },
    {
      id: "2",
      name: "Culturais",
      groupingActive: true,
      priority: 5,
      showAllEnabled: false,
      urlKey: "culturais"
    },
    {
      id: "1",
      name: "Família",
      groupingActive: true,
      priority: 3,
      showAllEnabled: false,
      urlKey: "familia"
    }
  ];
  useEffect(() => {
    const fetchData = async (url: string, setFunction: CallableFunction) => {
      const { data } = await axios(url);
      if (data) {
        setFunction(data);
      }
    };
    fetchData("http://localhost:5000/states/", (data: IState[]) =>
      setStates([{ name: "Estado", cities: [] }, ...data])
    );
    fetchData(
      "http://localhost:5000/em-cartaz/",
      (data: { count: number; items: IMovie[] }) => setMovies(data.items)
    );
    fetchData("http://localhost:5000/em-breve/", setEmBreve);
  }, []);

  useEffect(() => {
    const emAlta: IMovie[] = [];
    const familia: IMovie[] = [];
    const culturais: IMovie[] = [];
    movies.forEach(movie => {
      if (movie.tags.includes("Em Alta")) {
        emAlta.push(movie);
      }
      if (movie.tags.includes("Família")) {
        familia.push(movie);
      }
      if (movie.tags.includes("Culturais")) {
        culturais.push(movie);
      }
    });
    setCulturais(culturais);
    setEmAlta(emAlta);
    setFamilia(familia);
  }, [movies]);
  const selectState = (e: React.ChangeEvent) => {
    const target = e.target as HTMLSelectElement;
    const state: number = +target.value;
    if (!Number.isNaN(state) && states && states[state]) {
      setCities([defaultCity, ...states[state].cities]);
    }
  };
  const selectCity = (e: React.ChangeEvent) => {
    const target = e.target as HTMLSelectElement;
    const cityId: string = target.value.toString();
    if (cityId) {
      const newCity = cities.find(({ id }) => id?.toString() === cityId);
      if (newCity) {
        setCity(newCity);
      }
    }
  };

  return (
    <div className="App">
      <header>
        <div>
          <img src="logo-ingresso.png" alt="" />
        </div>
      </header>
      <select onChange={selectState}>
        {states &&
          states.map((state: IState, index: number) => (
            <option value={index > -1 ? index : ""}>{state.name}</option>
          ))}
      </select>
      <select onChange={selectCity}>
        {cities &&
          cities.map((city: ICity) => (
            <option value={city.id > 0 ? city.id : ""}>{city.name}</option>
          ))}
      </select>
      <MovieSection title="Em Cartaz" movies={movies}></MovieSection>
      <MovieSection title="Em Alta" movies={emAlta}></MovieSection>
      <MovieSection title="Família" movies={familia}></MovieSection>
      <MovieSection title="Culturais" movies={culturais}></MovieSection>
    </div>
  );
};

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 10
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};
const MovieSection: React.FC<{ title: String; movies: IMovie[] }> = ({
  title,
  movies
}) => {
  return (
    <section>
      <h1>{title}</h1>
      <Carousel
        responsive={responsive}
        draggable={true}
        swipeable={true}
        itemClass="card"
      >
        {movies.length
          ? movies.slice(0, 15).map(movie => <MovieCard {...movie}></MovieCard>)
          : ""}
      </Carousel>
    </section>
  );
};

export default App;
