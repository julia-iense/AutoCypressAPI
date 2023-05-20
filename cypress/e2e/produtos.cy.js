import {headers2} from '../support/commands.js'
import {headers1} from '../support/commands.js'

const CadastroProdutos = (payload) => {
  return cy.request({
    method: 'POST',
    url: 'https://serverest.dev/produtos',
    headers: headers2,
    failOnStatusCode: false,
    body: payload
  });
};
const CadastroProdutosSemToken = (payload) => {
  return cy.request({
    method: 'POST',
    url: 'https://serverest.dev/produtos',
    headers: headers1,
    failOnStatusCode: false,
    body: payload
  });
};

  it('Cadastrar produtos', () => {
    const payload = {
      nome: "teste",
      preco: "568",
      descricao: "testes2002",
      quantidade: "2"
    };
    cy.log(payload);
    CadastroProdutos(payload).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body._id).to.have.property;
      expect(response.body.message).to.equal('Cadastro realizado com sucesso');
    });
  });
  it('Erro no cadastro de produtos sem autenticação', () => {
    const payload = {
      nome: "teste",
      preco: "568",
      descricao: "testes2002",
      quantidade: "2"
    };
    cy.log(payload);
    CadastroProdutosSemToken(payload).then((response) => {
      cy.log(response);
      expect(response.status).to.eq(401);
      expect(response.body.message).to.equal('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais');
    });
  })
