const baseUrl = 'https://serverest.dev';
const usersUrl = `${baseUrl}/usuarios`;
export {usersUrl};

//Cadastro de usuário e geração do _id no response

export const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
// arquivo generateRandomLetters.js
export const generateRandomLetters = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
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
  it('Deve cadastrar usuário com sucesso', () => {
    const payload = {
      nome: generateRandomLetters(5),
      email: `${generateRandomLetters(5)}@qa.com.br`,
      password: generateRandomLetters(5),
      administrador: "true"
    };
    createUser(payload).then((response) => {
      Cypress.env('idgerado', response.body._id);
      expect(response.status).to.eq(201);
      expect(response.body.message).to.equal('Cadastro realizado com sucesso');
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
        email: `${generateRandomLetters(5)}@qa.com.br`,
        password: generateRandomLetters(5),
    };
    cy.log(login);
    login(payload).then((response) => {
    Cypress.env('auth', response.body.authorization)
    cy.log(login);
      expect(response.status).to.eq(201);
      cy.log(login);
      expect(response.body.message).to.equal('Login realizado com sucesso');
    });
  });