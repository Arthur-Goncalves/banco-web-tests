describe('Login', () => {
  
  beforeEach(() => {
    // Arrange
    cy.visit('/')
  })

  it('Login com dados válidos deve permitir entrada no sistema', () => {

    cy.fazerLoginCredenciaisValidas()
    cy.contains('h4', 'Realizar Transferência').should('be.visible')
  })

  it('Login com dados inválidos deve apresentar mensagem de erro', () => {

    cy.fazerLoginCredenciaisInvalidas()
    cy.verificarMensagemToast('Erro no login. Tente novamente.')
  })

})