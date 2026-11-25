# Testes automatizados do Banco Web

Projeto de testes automatizados de interface com Cypress e JavaScript para praticar e executar os conteúdos do curso **Como automatizar com Cypress**, da **Mentoria 2.0 de Julio de Lima**.

Os cenários exercitam os fluxos de login e transferência bancária da aplicação Banco Web. Os testes usam Custom Commands para organizar ações e verificações reutilizáveis, e o `cypress-mochawesome-reporter` para gerar relatórios.

## Pré-requisitos

- Node.js e npm instalados.
- A [API do Banco](https://github.com/juliodelimas/banco-api) em execução.
- A [aplicação Banco Web](https://github.com/juliodelimas/banco-web) em execução e configurada para se comunicar com a API.

O Cypress está configurado para abrir a aplicação em `http://localhost:4000` (`baseUrl`). Inicie a aplicação nessa URL antes de executar os testes. Para iniciar e configurar a API e a aplicação, siga as instruções dos respectivos repositórios.

## Instalação

Clone este repositório, acesse a pasta do projeto e instale as dependências:

```bash
git clone https://github.com/Arthur-Goncalves/banco-web-tests.git
cd banco-web-tests
npm ci
```

O `npm ci` instala as versões registradas no `package-lock.json`. Caso não use o arquivo de lock, também é possível instalar com `npm install`.

## Execução

Com a API e a aplicação em execução:

```bash
# Executa os testes no modo headless
npm test

# Executa os testes com o navegador visível
npm run cy:headed

# Abre a interface interativa do Cypress
npm run cy:open
```

Os comandos também podem ser usados para conferir os testes em desenvolvimento. A interface aberta por `cy:open` permite selecionar os arquivos de especificação individualmente.

## Estrutura do projeto

```text
.
├── cypress/
│   ├── e2e/                       # Especificações dos testes
│   ├── fixtures/                  # Dados de teste, incluindo credenciais
│   └── support/
│       ├── commands/              # Implementações dos Custom Commands
│       ├── commands.js            # Importação dos comandos
│       └── e2e.js                 # Suporte carregado antes dos testes
├── cypress.config.js              # Configuração do Cypress e do reporter
├── package.json                   # Dependências e scripts npm
└── package-lock.json              # Versões instaladas das dependências
```

### Componentes e dependências

- **Cypress**: execução e organização dos testes end-to-end.
- **JavaScript**: linguagem dos arquivos de teste e dos comandos.
- **Custom Commands**: ações comuns extraídas dos cenários e carregadas por `cypress/support/commands.js`.
- **Fixtures**: dados usados nos testes, como as credenciais em `cypress/fixtures/credenciais.json`.
- **cypress-mochawesome-reporter**: reporter configurado no Cypress para gerar relatórios HTML.

## Testes automatizados

As especificações estão em `cypress/e2e/`:

| Arquivo | Cenários |
| --- | --- |
| `login.cy.js` | Login com credenciais válidas deve permitir o acesso à tela de transferência; login com credenciais inválidas deve exibir uma mensagem de erro. |
| `transferencia.cy.js` | Transferência com dados válidos deve exibir confirmação; tentativa de transferir mais de R$ 5.000,00 sem token deve exibir a mensagem de autenticação necessária. |

Os cenários de transferência fazem login antes de cada teste e usam as contas e os valores informados no próprio arquivo de especificação.

## Custom Commands

Os comandos estão organizados em `cypress/support/commands/` e importados por `cypress/support/commands.js`. O arquivo `cypress/support/e2e.js` carrega essa configuração e registra a integração do reporter.

| Comando | Arquivo | Responsabilidade |
| --- | --- | --- |
| `cy.fazerLoginCredenciaisValidas()` | `login.js` | Lê as credenciais válidas da fixture, preenche o formulário e envia o login. |
| `cy.fazerLoginCredenciaisInvalidas()` | `login.js` | Lê as credenciais inválidas da fixture, preenche o formulário e envia o login. |
| `cy.realizarTranferencias(contaOrigem, contaDestino, valor)` | `transferencias.js` | Seleciona as contas de origem e destino, informa o valor e aciona a transferência. |
| `cy.verificarMensagemToast(mensagem)` | `common.js` | Verifica se o toast exibido contém exatamente o texto esperado. |
| `cy.selecionarOpcaoCombobox(labelCampo, opcao)` | `common.js` | Abre o combobox identificado pelo campo e seleciona a opção indicada. |

## Relatórios

O reporter está habilitado em `cypress.config.js` e é registrado em `cypress/support/e2e.js`. Após a execução, os arquivos do relatório são gerados em `cypress/reports/`; o relatório HTML pode ser aberto em `cypress/reports/html/index.html`.
