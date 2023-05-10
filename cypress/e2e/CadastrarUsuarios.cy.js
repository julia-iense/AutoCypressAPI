/// <reference types="cypress" />
const headers = {
  'accept': 'application/json',
  'Content-Type': 'application/json'
};

const baseUrl = 'https://serverest.dev';
const usersUrl = `${baseUrl}/usuarios`;

const generateRandomLetters = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

const createUser = (payload) => {
  return cy.request({
    method: 'POST',
    url: usersUrl,
    headers: headers,
    failOnStatusCode: false,
    body: payload
  });
};

describe('Cadastro de usuários', () => {
  beforeEach(() => {
    cy.request({
      method: 'DELETE',
      url: usersUrl,
      headers: headers
    })
  })
}) 

  it('Deve cadastrar usuário com sucesso', () => {
    const payload = {
      nome: generateRandomLetters(5),
      email: `${generateRandomLetters(5)}@qa.com.br`,
      password: generateRandomLetters(5),
      administrador: "true"
    };
    createUser(payload).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.message).to.equal('Cadastro realizado com sucesso');
    });
  });

  it('Não deve cadastrar usuário com nome ou senha em branco', () => {
    const payload = {
      nome: "",
      email: `${generateRandomLetters(5)}@qa.com.br`,
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

