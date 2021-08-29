describe ("Api User Tests", () => {

    let token;
    let user;

    it("Create User successfully", () => {
        cy.userRequest({
            id: "",
            Name: "Novo usuario",
            Email: "email2@email.com",
            Username: "teste123",
            Password: "123123",
            Method: 'POST'
        }).then(response => {
            expect(response.body.status).to.be.true;
            expect(response.body.message).to.be.eql("Usuário cadastrado com sucesso.");
        })

        cy.loginRequest({Username: "teste123", Password: "123123"})
        .then(response => {
            expect(response.body.token).not.be.empty;
            token = response.body.token;
        })
    })

    it("Create User with invalid values", () => {
        cy.userRequest({
            id: "",
            Name: "",
            Email: "email@email.com",
            Username: "teste",
            Password: "123123",
            Method: 'POST'
        }).then(response => {
            expect(response.body.status).to.be.false;
            expect(response.body.message).to.be.eql("Favor preencher todos os campos.");
        })

        cy.userRequest({
            id: "",
            Name: "Allan Scala",
            Email: "email.com",
            Username: "teste123",
            Password: "123123",
            Method: 'POST'
        }).then(response => {
            expect(response.body.status).to.be.false;
            expect(response.body.message).to.be.eql("Preencha um email válido.");
        })

        cy.userRequest({
            id: "",
            Name: "Allan Scala",
            Email: "email@email.com",
            Username: "teste123",
            Password: "123123",
            Method: 'POST'
        }).then(response => {
            expect(response.body.status).to.be.false;
            expect(response.body.message).to.be.eql("Já existe um usuário cadastrado com esse login/email.");
        })
    })

    it("Get User successfully", () => {
        cy.request({
            url: `${Cypress.env("BASE_URL")}/user/Novo usuario`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            expect(response.body.status).to.be.true;
            user = response.body.data[0];
        })
    })

    it("Get User with invalid values", () => {
        cy.request({
            url: `${Cypress.env("BASE_URL")}/user/0`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            expect(response.body.status).to.be.false;
            expect(response.body.message).to.be.eql("Usuário não localizado.");
        })
    })

    it("Update User successfully", () => {
        cy.userRequest({
            id: user.id,
            Name: "Nome atualizado",
            Email: "emailAtualizado@email.com",
            Method: "PUT",
            Headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            expect(response.body.status).to.be.true;
            expect(response.body.message).to.eql("Usuário atualizado com sucesso.")
        })

        cy.request({
            url: `${Cypress.env("BASE_URL")}/user/Nome atualizado`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            expect(response.body.status).to.be.true;
            expect(response.body.data[0].Name).to.be.eql("Nome atualizado");
        })
    })

    it("Update User with invalid values", () => {
        cy.userRequest({
            id: user.id,
            Name: "",
            Email: "emailAtualizado@email.com",
            Method: "PUT",
            Headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            expect(response.body.status).to.be.false;
            expect(response.body.message).to.eql("Todos os campos devem ser preenchidos.")
        })

        cy.userRequest({
            id: "-1",
            Name: "Atualizar",
            Email: "emailAtualizado@email.com",
            Method: "PUT",
            Headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            expect(response.body.status).to.be.false;
            expect(response.body.message).to.eql("Não existe nenhum usuário com esse ID")
        })

    })

    it("Delete User successfully", () => {
        cy.request({
            url: `${Cypress.env("BASE_URL")}/user/${user.id}`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            expect(response.body.status).to.be.true;
            expect(response.body.message).to.eql("Usuário deletado com sucesso.")
        })
    })

    it("Delete User with invalid values", () => {
        cy.request({
            url: `${Cypress.env("BASE_URL")}/user/${user.id}`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            expect(response.body.status).to.be.false;
            expect(response.body.message).to.eql("Nenhum usuário localizado.")
        })
    })

    after(() => {
        cy.deleteAllUser(token);
    })
})