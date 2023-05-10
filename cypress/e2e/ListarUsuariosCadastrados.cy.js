/// <reference types="Cypress" />
import {usersUrl} from '../support/commands.js'

const headers = {
  'accept': 'application/json',
  'Content-Type': 'application/json'
};

const ListUser = (payload) => {
  return cy.request({
    method: 'GET',
    url: usersUrl,
    headers: headers,
    failOnStatusCode: false,
    qs: payload
  });
};

describe('Listar usuários cadastrados', () => {
  it('Listar usuários com somente nome', () => {
    const payload = {
      nome: 'generateRandomLetters'
    };
    ListUser(payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.quantidade).to.have.property;
      expect(response.body.usuarios).to.have.property
    });
  });
  it('Listar usuários - email somente letras ', () => {
    const payload = {
      email: 'generateRandomLetters'
    };
    cy.log(payload)
    ListUser(payload).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.email).to.equal('email deve ser um email válido')
    });
  });
  it('Listar usuários - email somente números', () => {
    const payload = {
      email: "1552968416515"
    };
    cy.log(payload)
    ListUser(payload).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.email).to.equal('email deve ser uma string')
    });
  });
  it('Listar usuários - pesquisa por _id', () => {
    const payload = {
      _id: "generateRandomLetters",
    };
    cy.log(payload)
    ListUser(payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.quantidade).to.have.property;
      expect(response.body.usuarios).to.have.property
    });
  });
});


