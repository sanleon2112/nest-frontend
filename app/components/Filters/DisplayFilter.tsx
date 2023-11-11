"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateState } from "@/redux/features/GlobalSlice";

const DisplayFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.selec.properties);

  const [filters, setFilters] = useState({
    selectedPriceRange: "",
    selectedCountry: "",
    selectedCity: "",
  });

  const uniquePriceRanges = Array.from(new Set(posts.map((post) => post.priceRange)));
  const uniqueCountries = Array.from(new Set(posts.map((post) => post.country)));
  const uniqueCities = Array.from(new Set(posts.map((post) => post.city)));

  const applyFilters = () => {
    let filtered = posts.filter((post) => {
      const price = post.price;
      const { selectedPriceRange, selectedCountry, selectedCity } = filters;

      return (
        (selectedPriceRange === "" ||
          (selectedPriceRange === "lessThan1000" && price < 1000) ||
          (selectedPriceRange === "1000To10000" && price >= 1000 && price <= 10000) ||
          (selectedPriceRange === "greaterThan10000" && price > 10000)) &&
        (selectedCountry === "" || post.country === selectedCountry) &&
        (selectedCity === "" || post.city === selectedCity)
      );
    });

    dispatch(updateState(filtered));
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters({ ...filters, [filterName]: value });
  };

  const clearFilters = () => {
    setFilters({
      selectedPriceRange: "",
      selectedCountry: "",
      selectedCity: "",
    });
    dispatch(updateState(posts));
  };

  return (
    <div className="flex gap-5 m-9">
      <div>
        <label htmlFor="selectedPriceRange">Filtrar por Precio:</label>
        <select
          id="selectedPriceRange"
          value={filters.selectedPriceRange}
          onChange={(e) => handleFilterChange("selectedPriceRange", e.target.value)}
        >
          <option value="">Selecciona un rango de precio</option>
        <option value="lessThan1000">Menor que 1000</option>
        <option value="1000To10000">Entre 1000 y 10000</option>
        <option value="greaterThan10000">Mayor que 10000</option>
        </select>
      </div>
      <div>
        <label htmlFor="selectedCountry">Filtrar por País:</label>
        <select
          id="selectedCountry"
          value={filters.selectedCountry}
          onChange={(e) => handleFilterChange("selectedCountry", e.target.value)}
        >
          <option value="">Selecciona un país</option>
          {uniqueCountries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="selectedCity">Filtrar por Ciudad:</label>
        <select
          id="selectedCity"
          value={filters.selectedCity}
          onChange={(e) => handleFilterChange("selectedCity", e.target.value)}
        >
          <option value="">Selecciona una ciudad</option>
          {uniqueCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={applyFilters}>Buscar</button>
        <button onClick={clearFilters}>Limpiar</button>
      </div>
    </div>
  );
};

export default DisplayFilter;
