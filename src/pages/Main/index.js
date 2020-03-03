/* eslint-disable no-throw-literal */
import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Form, SubmitButton, List, Error } from './styles';
import Container from '../../components/Container';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: null,
    messageError: '',
  };

  // carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // carregar os dados do localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, error: false, messageError: '' });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: false, messageError: '' });

    try {
      const { newRepo, repositories } = this.state;

      if (newRepo === '') {
        throw {
          name: 'Warning',
          message: 'Você precisa inserir um Repositório',
        };
      }
      const haveRepo = repositories.find(r => r.name === newRepo);

      if (haveRepo) {
        throw {
          name: 'Warning',
          message: 'Repositório duplicado',
        };
      }

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      });
    } catch (e) {
      const message =
        e.name !== 'Warning'
          ? 'A solicitação a api do github falhou'
          : e.message;
      this.setState({ error: true, messageError: `Erro: ${message}` });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newRepo, repositories, loading, error, messageError } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
          <div className="group">
            <input
              type="text"
              placeholder="Adicionar repositório"
              value={newRepo}
              onChange={this.handleInputChange}
              className={error ? 'error' : ''}
            />

            <SubmitButton loading={loading}>
              {loading ? (
                <FaSpinner color="#FFF" size={14} />
              ) : (
                <FaPlus color="#fff" size={14} />
              )}
            </SubmitButton>
          </div>
        </Form>

        <Error>
          <span className="error">{messageError}</span>
        </Error>

        {/* {error && <Error>{error}</Error>} */}

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
