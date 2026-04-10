const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, 'pages')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Configuração do Gmail API
const oauth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN
});

const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

// Função para criar email
function createEmail(to, subject, body) {
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  const messageParts = [
    `To: ${to}`,
    `Subject: ${utf8Subject}`,
    'Content-Type: text/html; charset=utf-8',
    'MIME-Version: 1.0',
    '',
    body
  ];
  const message = messageParts.join('\n');

  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return encodedMessage;
}

// Rota para enviar email
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validação básica
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Todos os campos são obrigatórios'
      });
    }

    // Email para você (destinatário)
    const adminEmail = process.env.GMAIL_USER_EMAIL;
    const adminSubject = `Novo contato: ${subject}`;
    const adminBody = `
      <h2>Nova mensagem de contato</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Assunto:</strong> ${subject}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><em>Enviado através do formulário de contato do site</em></p>
    `;

    // Email de confirmação para o usuário
    const userSubject = 'Confirmação de contato - Chico Linguiça';
    const userBody = `
      <h2>Obrigado pelo contato, ${name}!</h2>
      <p>Recebemos sua mensagem e entraremos em contato em breve.</p>
      <p><strong>Assunto:</strong> ${subject}</p>
      <p><strong>Sua mensagem:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p>Atenciosamente,<br>Chico Linguiça</p>
    `;

    // Enviar email para o administrador
    const adminEmailEncoded = createEmail(adminEmail, adminSubject, adminBody);
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: adminEmailEncoded
      }
    });

    // Enviar email de confirmação para o usuário
    const userEmailEncoded = createEmail(email, userSubject, userBody);
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: userEmailEncoded
      }
    });

    res.json({
      success: true,
      message: 'Mensagem enviada com sucesso!'
    });

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar mensagem. Tente novamente.'
    });
  }
});

// Rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para página de contato
app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'contato.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});