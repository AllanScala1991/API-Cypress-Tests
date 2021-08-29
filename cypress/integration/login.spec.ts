

describe("Api Login Tests", () => {

    let token;

    it("Login user successfully", () => {
        cy.createUser();

        cy.loginRequest({Username: "teste123", Password: "123123"})
        .then(response => {
            expect(response.body.status).to.be.true;
            expect(response.body.token).not.be.empty;
            expect(response.body.message).not.exist;
            token = response.body.token;
        })
    })

    it("Login with empty value", () => {
        cy.loginRequest({Username: "", Password: ""})
        .then(response => {
            expect(response.body.status).to.be.false;
            expect(response.body.token).to.be.undefined;
            expect(response.body.message).to.be.eql("Por favor, preencha todos os campos.");
        })
    })

    it("Login with invalid user and password", () => {
        cy.loginRequest({Username: "teste", Password: "teste"})
        .then(response => {
            expect(response.body.status).to.be.false;
            expect(response.body.token).to.be.undefined;
            expect(response.body.message).to.be.eql("Usuário e/ou Senha incorretos.");
        })
    })

    after(() => {
        cy.deleteAllUser(token);
    })
})