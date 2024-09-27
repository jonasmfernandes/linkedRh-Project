# Perfil do Colaborador App

Este projeto é um aplicativo desenvolvido em **Ionic** e **TypeScript** que simula a visualização de um perfil de colaborador. O objetivo é renderizar dados dinâmicos a partir de um arquivo JSON, exibindo inforações profissionais e acadêmicmas, além de realizar operações de atualização simuladas através de uma API externa.

## Funcionalidades

1. **Tela Home**:  
   A tela inicial do app é uma página fictícia contendo:
   - Um card com imagem de fundo.
   - Um avatar com uma imagem fictícia.
   - Nome e cargo do colaborador.
   - Botões "Perfil do Colaborador" e "Atualizar App".

2. **Carregamento Inicial**:
   - Ao abrir o app, um **loading** é apresentado por 5 segundos (simulação), enquanto os dados são carregados de um JSON local.
   - O JSON é salvo localmente e utilizado para preencher as informações de **nome** e **cargo** do colaborador.

3. **Perfil do Colaborador**:
   - Ao clicar no botão **"Perfil do Colaborador"**, o usuário é redirecionado para uma nova tela.
   - Os dados do JSON são passados como parâmetro e exibidos em cards dinâmicos.
   - Os cards respeitam a propriedade `expanded`, que define se os itens estão abertos ou fechados inicialmente.
   - Um botão **"Ver mais"** permite carregar mais dados dinamicamente.

4. **Atualizar App**:
   - Ao clicar no botão **"Atualizar App"**, o app faz uma requisição HTTP à API [randomuser.me](https://randomuser.me/api/).
   - Um **loading** é exibido enquanto a requisição é processada.
   - Os dados retornados são salvos localmente de forma incremental.
   - Uma modal de confirmação informa o sucesso da atualização.

5. **Cards Dinâmicos**:
   - O app renderiza dinamicamente cada seção de acordo com os dados do JSON.
   - Cada card é independente e pode ter sua própria estrutura, respeitando os dados fornecidos no JSON.
   - O número de blocos e cards é flexível, permitindo fácil adaptação para diferentes cenários de visualização.

## Tecnologias Utilizadas
- **HTML5**
- **SCSS**
- **Ionic Framework - Angular**
- **TypeScript**
- **Storage Local (Ionic Storage)**
- **HTTP Client (para requisições à API)**
- **JSON Dinâmico**

## Como Rodar o Projeto

### Pré-requisitos
- **Node.js** instalado.
- **Ionic CLI** instalado globalmente:  
```bash
  npm install -g @ionic/cli
```
1. Clone este repositório.
  ```bash
   git clone https://github.com/jonasmfernandes/linkedRh-Project.git
  ```
2. Acesse a pasta do projeto. 
  ```bash
   cd linkedRh-Project
  ```
3. Instale as dependências:
  ```bash
   npm install
  ```
4. Execute o aplicativo em um servidor local:
  ```bash
   ionic serve
  ``` 
5. Acesse o aplicativo em:
- http://localhost:8100

### Autor 

Desenvolvido por: Jonas Monteiro Fernandes