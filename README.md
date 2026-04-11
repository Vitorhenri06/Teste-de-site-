# Site Profissional - Chico Linguiça

Site profissional responsivo com formulário de contato integrado à API do Gmail.

## 🚀 Funcionalidades

- Design moderno e responsivo
- Menu de navegação com hamburger para mobile
- Seções: Hero, Sobre, Serviços, Portfólio, Contato
- Formulário de contato com envio via Gmail API
- Animações suaves e efeitos hover

## 📧 Configuração da API do Gmail

Para o formulário de contato funcionar, você precisa configurar a API do Gmail:

### 1. Criar Projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a API do Gmail:
   - Vá para "APIs e Serviços" > "Biblioteca"
   - Procure por "Gmail API" e ative

### 3. Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. Preencha as variáveis no arquivo `.env`:
   - `GMAIL_CLIENT_ID`: Cole o Client ID das credenciais OAuth
   - `GMAIL_CLIENT_SECRET`: Cole o Client Secret das credenciais OAuth
   - `GMAIL_REDIRECT_URI`: Deve ser `http://localhost:3000/oauth2callback`
   - `GMAIL_REFRESH_TOKEN`: Você precisará gerar este token (veja instruções abaixo)
   - `GMAIL_USER_EMAIL`: Seu endereço de email do Gmail
   - `PORT`: Porta do servidor (padrão: 3000)

### 4. Gerar Refresh Token

Para gerar o refresh token, você pode usar um script auxiliar ou seguir o fluxo OAuth2 manualmente. O refresh token permite que a aplicação envie emails em seu nome.

## 🛠️ Instalação e Execução

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure o arquivo `.env` conforme descrito acima

3. Execute o servidor:
   ```bash
   npm start
   ```

4. Para desenvolvimento (com nodemon):
   ```bash
   npm run dev
   ```

5. Acesse `http://localhost:3000` no navegador
5. Baixe o arquivo JSON das credenciais

### 3. Obter Refresh Token

1. Instale as dependências: `npm install`
2. Crie um arquivo temporário `get-token.js`:

```javascript
const { google } = require('googleapis');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/gmail.send']
});

console.log('Authorize this app by visiting this url:', authUrl);
```

3. Execute: `node get-token.js`
4. Acesse a URL gerada e autorize a aplicação
5. Copie o código de autorização da URL de redirecionamento
6. Use o código para obter o refresh token

### 4. Configurar Variáveis de Ambiente

Edite o arquivo `.env`:

```env
GMAIL_CLIENT_ID=your_client_id_here
GMAIL_CLIENT_SECRET=your_client_secret_here
GMAIL_REDIRECT_URI=http://localhost:3000/oauth2callback
GMAIL_REFRESH_TOKEN=your_refresh_token_here
GMAIL_USER_EMAIL=your_email@gmail.com
PORT=3000
```

## 🏃‍♂️ Como Executar

1. Instale as dependências:
```bash
npm install
```

2. Configure as variáveis de ambiente no arquivo `.env`

3. Execute o servidor:
```bash
npm start
```

4. Acesse `http://localhost:3000` no navegador

## � Variáveis de Ambiente

O arquivo `.env` deve conter as seguintes variáveis:

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `PORT` | Porta do servidor | `3000` |
| `GMAIL_CLIENT_ID` | Client ID do OAuth2 | `123456789-abc...` |
| `GMAIL_CLIENT_SECRET` | Client Secret do OAuth2 | `GHIjklMN...` |
| `GMAIL_REDIRECT_URI` | URI de redirecionamento | `http://localhost:3000/oauth2callback` |
| `GMAIL_REFRESH_TOKEN` | Token de refresh OAuth2 | `1//abc123...` |
| `GMAIL_USER_EMAIL` | Email do administrador | `seuemail@gmail.com` |

## �📁 Estrutura do Projeto

```
/
├── index.html              # Página inicial
├── pages/
│   ├── contato.html        # Página de contato
│   ├── portfolio.html      # Página de portfólio
│   ├── servico.html        # Página de serviços
│   └── sobre.html          # Página sobre
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos CSS
│   └── js/
│       └── script.js       # JavaScript
├── server.js               # Backend Node.js
├── package.json            # Dependências
├── .env                    # Configurações (não commitar)
├── .env.example           # Exemplo das variáveis necessárias
├── .gitignore             # Arquivos ignorados pelo Git
└── README.md              # Este arquivo
```

## 🎨 Personalização

- **Cores**: Edite as variáveis CSS em `:root` no `style.css`
- **Conteúdo**: Modifique os textos no HTML
- **Imagens**: Adicione imagens na pasta `assets/images/`
- **Informações**: Atualize email, telefone e localização

## 📧 Como Funciona o Formulário

1. Usuário preenche o formulário
2. Dados são enviados via AJAX para `/api/send-email`
3. Backend usa Gmail API para enviar 2 emails:
   - Um para você (administrador) com os dados do contato
   - Um de confirmação para o usuário
4. Resposta é exibida na página

## 🔒 Segurança

- Nunca commite o arquivo `.env` no Git
- Use HTTPS em produção
- Valide os dados no backend
- Implemente rate limiting se necessário

## 📝 Notas

- O refresh token do Gmail não expira automaticamente
- Teste o formulário antes de colocar em produção
- Monitore o uso da API do Gmail (limites diários)

---

**Desenvolvido por:** Chico Linguiça
**Data:** 2026</content>
<parameter name="filePath">/workspaces/Teste-de-site-/README.md