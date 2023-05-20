const baseUrl = 'https://serverest.dev';
const usersUrl = `${baseUrl}/usuarios`;
export {usersUrl};
//export {idgerado};

export const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  };


export const createUser = (payload) => {
    return cy.request({
      method: 'POST',
      url: usersUrl,
      headers: headers,
      failOnStatusCode: false,
      body: payload
    });
  };

  export const ListUser = (payload) => {
    return cy.request({
      method: 'GET',
      url: usersUrl,
      headers: headers,
      failOnStatusCode: false,
      qs: payload
    });
  };
//Cadastro de usuário e geração do _id no response
  it('Cadastro de usuario e consulta de usuário', () => {
    const payload = {
      nome: "teste",
      email: "testetest@qa.com.br",
      password: "testes2002",
      administrador: "true"
    };
    createUser(payload).then((response) => {
    //const idgerado = Cypress.env('idgerado', usuarios[0][_id])
    if (response.status == 201) {
      expect(response.body._id).to.have.property;
      expect(response.body.message).to.equal('Cadastro realizado com sucesso')
    } else {
      const payload = {
        email: "testetest@qa.com.br"
      };
      cy.log(payload)
      ListUser(payload).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body._id).to.have.property;
      });
    }
    });
  });

  export const login = (payload) => {
    return cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      headers: headers,
      failOnStatusCode: false,
      body: payload
    });
  };
  
  it('Login', () => {
    const payload = {
      email: "testetest@qa.com.br",
      password: "testes2002",
    };
  
    login(payload).then((response) => {
      const token = response.body.token;
      Cypress.env('token', token);
      cy.log(token);
      expect(response.status).to.eq(200);
      expect(response.body.authorization).to.have.property;
  
      // Define headers2 com o token obtido
    const headers2 = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
    });
  });
  