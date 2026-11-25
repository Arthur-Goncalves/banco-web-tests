Cypress.Commands.add('verificarMensagemToast', mensagem => {
    cy.get('.toast').should('have.text', mensagem)
})

Cypress.Commands.add('selecionarOpcaoCombobox', (labelCampo, opcao) => {
    cy.get(`label[for="${labelCampo}"]`).parent().as(`campo-${labelCampo}`)
    cy.get(`@campo-${labelCampo}`).click()
    cy.get(`@campo-${labelCampo}`).contains(opcao).click()
})