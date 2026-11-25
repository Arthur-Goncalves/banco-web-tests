describe('Transferencias', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.fazerLoginCredenciaisValidas()
    })

    it('Deve tranferir quando informo dados e valores válidos', () => {

        cy.realizarTranferencias('João da Silva', 'Maria Oliveira', '11' )
        cy.verificarMensagemToast('Transferência realizada!')

    })

    it('Deve apresentar erro quando tentar transferir mais de 5 mil sem o token', () => {
        cy.realizarTranferencias('João da Silva', 'Maria Oliveira', '5000.01' )
        cy.verificarMensagemToast('Autenticação necessária para transferências acima de R$5.000,00.')

    })

})


