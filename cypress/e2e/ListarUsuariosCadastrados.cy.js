/// <reference types="cypress" />
const headers = {
  'accept': 'application/json',
  'Content-Type': 'application/json'
};

const baseUrl = 'https://serverest.dev';
const usersUrl = `${baseUrl}/usuarios`;

const ListUser = (payload) => {
  return cy.request({
    method: 'GET',
    url: usersUrl,
    headers: headers,
    failOnStatusCode: false,
    qs: payload
  });
};

describe('lista usuários', () => {
  it('lista usuários', () => {
    const payload = {
      nome: "teste"
    };
    ListUser(payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.equal('Cadastro realizado com sucesso');
    });
  });
});


