describe("Api Task Tests", () => {
    let token;
    let taskID;

    before(() => {
        cy.createUser();

        cy.loginRequest({
            Username: "teste123",
            Password: "123123"
        }).then(response => {
            token = response.body.token;
        })
    })

    it ("Create task successfully",  () => {
        cy.taskRequest({
            id: "",
            Name: "Primeira tarefa",
            Date: new Date("2021-12-01"),
            Method: "POST",
            Token: token,
            Route: "task"
        }).then(response => {
            expect(response.body.status).to.be.true;
            expect(response.body.message).to.be.eql("Tarefa cadastrada com sucesso.")
        })
    })

    it ("Create task with incorrect values",  () => {
        cy.taskRequest({
            id: "",
            Name: "Primeira tarefa",
            Date: new Date("2021-12-01"),
            Method: "POST",
            Token: token,
            Route: "task"
        }).then(response => {
            expect(response.body.status).to.be.false;
            expect(response.body.message).to.be.eql("Essa tarefa já foi cadastrada.")
        })

        cy.taskRequest({
            Name: "",
            Date: new Date("2021-12-01"),
            Method: "POST",
            Token: token,
            Route: "task"
        }).then(response => {
            expect(response.body.status).to.be.false;
            expect(response.body.message).to.be.eql("Todos os campos devem ser preenchidos.")
        })
    })

    it ("Get task successfully",  () => {
        cy.taskRequest({
            Route: "task/Primeira tarefa",
            Method: "GET",
            Token: token
        }).then(response => {
            expect(response.body.status).to.be.true;
            expect(response.body.data[0].Name).not.be.empty;
            expect(response.body.data[0].Date).not.be.empty;
            taskID = response.body.data[0].id
        })
    })

    it ("Get task with incorrect values",  () => {
        cy.taskRequest({
            Route: "task/Tarefa invalida",
            Method: "GET",
            Token: token
        }).then(response => {
            expect(response.body.status).to.be.false;
            expect(response.body.message).to.be.eql("Nenhuma tarefa localizada.")
        })
    })

    it ("Update task successfully",  () => {
        cy.taskRequest({
            id: taskID,
            Name: "Tarefa atualizada",
            Date: new Date("2021-10-01"),
            Method: "PUT",
            Token: token,
            Route: "task"
        }).then(response => {
            expect(response.body.status).to.be.true;
            expect(response.body.message).to.be.eql("Tarefa editada com sucesso.")
        })
    })

    it ("Update task with incorrect values",  () => {
        cy.taskRequest({
            id: "-1",
            Name: "Tarefa atualizada2",
            Date: new Date("2021-09-01"),
            Method: "PUT",
            Token: token,
            Route: "task"
        }).then(response => {
            expect(response.body.status).to.be.false;
            expect(response.body.message).to.be.eql("Tarefa não localizada.")
        })
    })

    it ("Delete task successfully",  () => {
        cy.taskRequest({
            Route: `task/${taskID}`,
            Method: "DELETE",
            Token: token
        }).then(response => {
            expect(response.body.status).to.be.true;
            expect(response.body.message).to.be.eql("Tarefa deletada com sucesso.")
        })
    })

    it ("Delete task with incorrect values",  () => {
        cy.taskRequest({
            Route: "task/Tarefa inexistente",
            Method: "DELETE",
            Token: token
        }).then(response => {
            expect(response.body.status).to.be.false;
            expect(response.body.message).to.be.eql("Erro ao deletar a tarefa.")
        })
    })

    after(() => {
        cy.deleteAllUser(token);

        cy.taskRequest({
            Route: "task/all",
            Method: "DELETE",
            Token: token
        });
    })

})