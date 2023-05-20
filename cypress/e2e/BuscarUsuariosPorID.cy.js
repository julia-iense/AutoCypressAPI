import {headers} from '../support/commands.js'
import {idgerado} from '../support/commands.js'

const ListUser = (payload) => {
  return cy.request({
    method: 'GET',
    url: 'https://serverest.dev/usuarios/',
    headers: headers,
    failOnStatusCode: false,
    qs: idgerado
  });
};

  it('Usuário não encontrado', () => {
    const payload = idgerado
    ListUser(payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.nome).to.have.property;
      expect(response.body.message).to.equal('Usuário não encontrado');
    });
  })
