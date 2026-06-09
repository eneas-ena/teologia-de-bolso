# Teólogo de Bolso PRO

Pesquisa bíblica avançada ao alcance da sua mão — app da **Igreja Vidas**.

O usuário escolhe uma **tarefa** (Analisar texto, Sermão, Estudo de célula, Aula ou um dos 7 **enfoques avançados** em "Estudo especializado") e um **nível de profundidade (1 a 4)**, digita ou dita um texto/tema, e recebe a resposta gerada por inteligência artificial, segundo a linha doutrinária da Igreja Vidas. Pode favoritar, ouvir, compartilhar, **baixar em Word (.docx)** e ver versículos relacionados.

> Este app é **independente** do "Teologia em Minutos". Os dois funcionam ao mesmo tempo, em endereços e projetos separados.

---

## Arquivos do projeto

```
teologia-de-bolso/
├── index.html          → a aparência (telas, cards, botões)
├── api/
│   └── ask.js          → o "cérebro": guarda a chave e fala com o Claude
├── manifest.json       → configuração do ícone na tela do celular
├── sw.js               → deixa o app "instalável" (PWA)
├── icon-192.png        → ícone
├── icon-512.png        → ícone (alta resolução)
├── apple-touch-icon.png→ ícone (iPhone)
├── package.json        → arquivo técnico (não precisa mexer)
└── README.md           → este guia
```

**Importante:** o arquivo `ask.js` precisa ficar dentro de uma pasta chamada `api`.

---

## Como publicar (uma única vez)

### 1) Subir os arquivos no GitHub
1. Abra o repositório `teologia-de-bolso` no GitHub.
2. Clique em **Add file → Upload files**.
3. Arraste **todos** os arquivos, mantendo o `ask.js` dentro da pasta `api`.
4. Clique em **Commit changes**.

### 2) Publicar na Vercel
1. Entre em **vercel.com** e faça login com o GitHub.
2. Clique em **Add New → Project** e selecione o repositório `teologia-de-bolso`.
3. Em **Environment Variables**, adicione:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** sua chave da Anthropic (a mesma usada no outro app)
   - O nome precisa ser **exatamente** `ANTHROPIC_API_KEY`.
4. Clique em **Deploy** e aguarde menos de um minuto.

Pronto. O app fica disponível num endereço como `https://teologia-de-bolso.vercel.app`.

---

## Como alterar no futuro

Não se repete a montagem. Para qualquer mudança:
1. Abra o repositório no GitHub.
2. Edite o arquivo desejado:
   - **`index.html`** → aparência (cores, textos, botões).
   - **`api/ask.js`** → o "cérebro" (doutrina, tarefas e níveis).
3. Clique em **Commit changes**.
4. A Vercel republica sozinha.

> Antes de mexer no `api/ask.js`, guarde uma cópia do conteúdo original como backup.

---

## Custo

- Modelo: Claude Sonnet 4.6 (`claude-sonnet-4-6`).
- Na prática, alguns centavos de dólar por pergunta. Níveis 1 e 2 custam menos; níveis 3 e 4 (respostas mais longas) custam um pouco mais.
- É possível definir um **limite mensal** no painel da Anthropic (em Billing), evitando surpresas.

---

*"O objetivo final da teologia não é apenas informar a mente, mas transformar a vida à luz da Palavra de Deus."*
