import {login} from '../support/commands.js'


it('Email com a estrutura errada', () => {
  const payload = {
    email: "teste",
    password: "teste"
  };
  login(payload).then((response) => {
    expect(response.status).to.eq(400);
    expect(response.body.email).to.equal('email deve ser um email válido');
  });
});

it('Sem usuário cadastrado', () => {
  const payload = {
    email: "teste@teste.com",
    password: "teste"
  };
  login(payload).then((response) => {
    expect(response.status).to.eq(401);
    expect(response.body.message).to.equal('Email e/ou senha inválidos');
  });
});