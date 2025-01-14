import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCharacters } from "../hooks/useCharacters";
import { useLanguage } from "../context/LanguageContext";

export default function CharactersList() {
  const { language, translations, toggleLanguage } = useLanguage();
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const { loading, error, data } = useCharacters({
    status,
    species,
    page,
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        Something went wrong. Please try again later.
      </div>
    );
  }

  const handleFilterChange = (event, filterType) => {
    if (filterType === "status") setStatus(event.target.value);
    if (filterType === "species") setSpecies(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSortField(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const sortedCharacters = [...data.characters.results].sort((a, b) => {
    let fieldA = sortField === "origin" ? a.origin.name : a[sortField];
    let fieldB = sortField === "origin" ? b.origin.name : b[sortField];
    if (typeof fieldA === "string") {
      fieldA = fieldA.toLowerCase();
      fieldB = fieldB.toLowerCase();
    }
    return sortOrder === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA);
  });

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-4">
          <select
            className="form-select"
            value={status}
            onChange={(e) => handleFilterChange(e, "status")}
          >
            <option value="">{translations.unknown}</option>
            <option value="Alive">{translations.alive}</option>
            <option value="Dead">{translations.dead}</option>
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={species}
            onChange={(e) => handleFilterChange(e, "species")}
          >
            <option value="">{translations.species}</option>
            <option value="Human">Human</option>
            <option value="Alien">Alien</option>
          </select>
        </div>
        <div className="col-md-4 d-flex justify-content-between">
          <select className="form-select" value={sortField} onChange={handleSortChange}>
            <option value="name">{translations.sort} - Name</option>
            <option value="origin">{translations.sort} - {translations.origin}</option>
          </select>
          <button className="btn btn-secondary" onClick={toggleSortOrder}>
            {translations.sort}: {sortOrder === "asc" ? "Ascending" : "Descending"}
          </button>
        </div>
      </div>

      <div className="row">
        {sortedCharacters.map((character) => (
          <div key={character.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{character.name}</h5>
                <p className="card-text">
                  <strong>{translations.status}:</strong> {character.status}
                </p>
                <p className="card-text">
                  <strong>{translations.species}:</strong> {character.species}
                </p>
                <p className="card-text">
                  <strong>{translations.gender}:</strong> {character.gender}
                </p>
                <p className="card-text">
                  <strong>{translations.origin}:</strong> {character.origin.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between">
        {data.characters.info.prev && (
          <button className="btn btn-primary" onClick={() => handlePageChange(page - 1)}>
            Previous
          </button>
        )}
        {data.characters.info.next && (
          <button className="btn btn-primary" onClick={() => handlePageChange(page + 1)}>
            Next
          </button>
        )}
      </div>

      <footer className="mt-4 text-center">
        <button className="btn btn-secondary" onClick={toggleLanguage}>
          {language === "en" ? "Switch to German" : "Switch to English"}
        </button>
      </footer>
    </div>
  );
}
