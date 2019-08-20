import React, { useState, useRef } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import { paginationButton } from '../helpers/';

const CharactersQuery = gql`
  query($page: Int!, $character: String!) {
    characters(page: $page, filter: { name: $character }) {
      info {
        count
        next
        prev
        pages
      }
      results {
        name
        id
        image
        status
      }
    }
  }
`;

export default function Characters() {
  const [page, setPage] = useState(1);
  const [character, SetCharacter] = useState('');
  const inputRef = useRef(null);

  return (
    <React.Fragment>
      <Query variables={{ page, character }} query={CharactersQuery}>
        {({
          loading,
          error,
          data: {
            characters: {
              info: { next, prev, pages, count } = {},
              results,
            } = {},
          } = {},
        }) => {
          if (loading) {
            return (
              <React.Fragment>
                <div className="loader" />
              </React.Fragment>
            );
          }
          if (error) {
            return (
              <React.Fragment>
                <div className="row wait text-center">
                  <h3>Uh-oh! Error!</h3>
                </div>
              </React.Fragment>
            );
          }

          next = next ? next : pages;
          prev = prev ? prev : 1;

          return (
            <div className="container">
              <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <span className="navbar-brand">
                  <h2>Rick & Morty API</h2>
                </span>

                <Link to="/episodes" className="btn btn-primary">
                  Episodes
                </Link>

                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse">
                  <ul className="navbar-nav ml-auto">
                    <input
                      type="text"
                      placeholder="Search a character"
                      ref={inputRef}
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => SetCharacter(inputRef.current.value)}
                    >
                      Search
                    </button>
                  </ul>
                  <span className="badge badge-success">
                    {' '}
                    Results: {count > 0 && count}
                  </span>
                </div>
              </nav>

              <div className="row text-center">
                {results ? (
                  results.map(({ name, image, status, id }) => (
                    <div className="col-md-3" key={id}>
                      <div>
                        <img className="character-img" src={image} alt={name} />
                      </div>
                      <p>
                        <span className="name">{name}</span>
                        <span className="info">status:</span>{' '}
                        <span className="data">{status}</span>
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="col-md-3">
                    <h2>No Results</h2>
                  </div>
                )}
                {count > 1 && (
                  <div className="btn-group col-2">
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={() => setPage(prev)}
                    >
                      {' '}
                      Prev
                    </button>
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={() => setPage(next)}
                    >
                      {' '}
                      Next
                    </button>
                  </div>
                )}

                <div className="btn-toolbar col-12 mb-5">
                  <div className="btn-group">
                    {paginationButton(pages, setPage, page)}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    </React.Fragment>
  );
}
