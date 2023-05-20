import {usersUrl} from '../support/commands.js'
import {headers} from '../support/commands.js'
import {ListUser} from '../support/commands.js'
import {idgerado} from '../support/commands.js'
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
        _id: idgerado
      };
    cy.log(payload)
    ListUser(payload).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.quantidade).to.eq(1);
      expect(response.body.usuarios.email).to.equal('testetest@qa.com.br')
      //expect(response.body.quantidade).to.eq(1);

      // const usuario = response.body.usuarios[0];
      // expect(usuario.nome).to.eq('teste');
      // expect(usuario.email).to.equal('testetest@qa.com.br');
      // expect(usuario.password).to.equal('testes2002');
      // expect(usuario.administrador).to.equal('true');
      });
    });
  })
