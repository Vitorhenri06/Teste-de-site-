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

### 2. Criar Credenciais OAuth 2.0

1. Vá para "APIs e Serviços" > "Credenciais"
2. Clique em "Criar Credenciais" > "ID do cliente OAuth"
3. Selecione "Aplicação Web"
4. Adicione `http://localhost:3000/oauth2callback` como URI de redirecionamento autorizado
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

## 📁 Estrutura do Projeto

```
/
├── index.html              # Página inicial
├── pages/
│   └── contato.html        # Página de contato
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos CSS
│   ├── js/
│   │   └── script.js       # JavaScript
│   └── images/             # Imagens (favicon, etc.)
├── server.js               # Backend Node.js
├── package.json            # Dependências
├── .env                    # Configurações (não commitar)
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