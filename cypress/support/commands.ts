
interface ILogin {
    Username?: string;
    Password?: string;
}

interface IUser extends ILogin {
    id?: string;
    Name?: string;
    Email?: string;
    Method: string;
    Headers?: object;
}

interface ITasks {
    id?: string
    Name?: string;
    Date?: Date;
    Method: string;
    Route: string;
    Token: string;
}

Cypress.Commands.add("loginRequest", loginRequest);
function loginRequest(info: ILogin) {
    cy.request({
        url: `${Cypress.env("BASE_URL")}/login`,
        method: "POST",
        body: {
            Username: info.Username,
            Password: info.Password
        }
    })
}

Cypress.Commands.add("userRequest", userRequest);
function userRequest(info: IUser){
    cy.request({
        url: `${Cypress.env("BASE_URL")}/user`,
        method: info.Method,
        headers: info.Headers,
        body: {
            id: info.id,
            Name: info.Name,
            Email: info.Email,
            Username: info.Username,
            Password: info.Password
        }
    })
}

Cypress.Commands.add("createUser", createUser);
function createUser () {
    cy.request({
        url: `${Cypress.env("BASE_URL")}/user`,
        method: 'POST',
        body: {
            Name: "Novo usuario",
            Email: "email2@email.com",
            Username: "teste123",
            Password: "123123"
        }
    }).then(response => {
        expect(response.body.status).to.be.true;
        expect(response.body.message).to.be.eql("Usuário cadastrado com sucesso.");
    })

}

Cypress.Commands.add("deleteAllUser", deleteAllUser);
function deleteAllUser (token: string) {
    cy.request({
        url: `${Cypress.env("BASE_URL")}/user/all`,
        method: 'DELETE', 
        headers: {
            Authorization: `Bearer ${token}`
        }     
    }).then(response => {
        expect(response.body.status).to.be.true;
        expect(response.body.message).to.be.eql("Usuário deletado com sucesso.");
    })
}

Cypress.Commands.add("taskRequest", taskRequest);
function taskRequest(info: ITasks) {
    if(info.Method == 'POST' || info.Method == 'PUT'){
        cy.request({
            url: `${Cypress.env("BASE_URL")}/${info.Route}`,
            method: info.Method,
            headers: {
                Authorization: `Bearer ${info.Token}`
            },
            body: {
                id: info.id,
                Name: info.Name,
                Date: info.Date
            }
        })
    }else {
        cy.request({
            url: `${Cypress.env("BASE_URL")}/${info.Route}`,
            method: info.Method,
            headers: {
                Authorization: `Bearer ${info.Token}`
            }
        })
    }
}

declare namespace Cypress {
    interface Chainable<Subject> {
       loginRequest(info: ILogin);
       userRequest(info: IUser);
       createUser();
       deleteAllUser(token);
       taskRequest(info: ITasks);
    }
}
