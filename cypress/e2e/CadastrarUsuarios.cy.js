import {usersUrl} from '../support/commands.js'
import {generateRandomLetters} from '../support/commands.js'
import {headers} from '../support/commands.js'
import {createUser} from '../support/commands.js'

describe('Cadastro de usuários', () => {}) 
  it('Não deve cadastrar usuário com nome ou senha em branco', () => {
    const payload = {
      nome: "",
      email: `${generateRandomLetters}@qa.com.br`,
      password: "",
      administrador: "true",
    };
    createUser(payload).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.nome).to.equal('nome não pode ficar em branco');
      expect(response.body.password).to.equal('password não pode ficar em branco');
    });
  });

  it('Não deve cadastrar usuário com email já existente', () => {
    const payload = {
      nome: "testes",
      email: "testes@qa.com.br",
      password: "testes",
      administrador: "true"
    };
    const payloads = {
      nome: "testes",
      email: "testes@qa.com.br",
      password: "testes",
      administrador: "true"
    };
    createUser(payload).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.equal('Este email já está sendo usado');
    });
  });