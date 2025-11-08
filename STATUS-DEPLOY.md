# 📊 Status Atual do Deploy

## 🔍 Verificação Realizada

### ❌ Git NÃO está inicializado
```bash
# Resultado: "Git não inicializado"
```

### ❌ Sem script de deploy no package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
    // ❌ Falta: "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### ⚠️ Base configurado como raiz
```typescript
// vite.config.ts
base: '/'  // ⚠️ Precisa ser ajustado para o nome do repositório
```

---

## 🛠️ O QUE PRECISA SER FEITO

### 1️⃣ Instalar gh-pages

```bash
cd univirtus-pwa
npm install --save-dev gh-pages
```

### 2️⃣ Adicionar script de deploy

Edite o `package.json` e adicione:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"  // ✅ ADICIONAR ESTA LINHA
  }
}
```

### 3️⃣ Criar repositório no GitHub

1. Acesse: https://github.com/new
2. Nome do repositório: `univirtus-pwa` (ou outro nome)
3. Deixe como **público**
4. **NÃO** inicialize com README
5. Clique em "Create repository"

### 4️⃣ Anotar o nome do repositório

Exemplo: Se você criar `https://github.com/seu-usuario/univirtus-pwa`
- Nome do repositório: `univirtus-pwa`
- Seu usuário: `seu-usuario`

### 5️⃣ Atualizar vite.config.ts

Edite o arquivo e mude o `base`:

```typescript
// ANTES:
base: '/',

// DEPOIS (substitua pelo nome do seu repositório):
base: '/univirtus-pwa/',  // ✅ Nome do repositório entre barras
```

### 6️⃣ Inicializar Git e fazer deploy

```bash
# Navegar para a pasta do projeto
cd univirtus-pwa

# Inicializar Git
git init

# Adicionar remote (SUBSTITUA seu-usuario e nome-do-repo)
git remote add origin https://github.com/seu-usuario/univirtus-pwa.git

# Adicionar todos os arquivos
git add .

# Fazer primeiro commit
git commit -m "Initial commit - Univirtus PWA"

# Criar branch main
git branch -M main

# Push para GitHub
git push -u origin main

# Deploy para GitHub Pages
npm run deploy
```

---

## 📝 Passo a Passo Completo

### Opção A: Usando Terminal

```bash
# 1. Entrar na pasta
cd univirtus-pwa

# 2. Instalar gh-pages
npm install --save-dev gh-pages

# 3. Criar repositório no GitHub (via navegador)
# https://github.com/new

# 4. Inicializar Git
git init

# 5. Configurar usuário (se necessário)
git config user.name "Seu Nome"
git config user.email "seu-email@example.com"

# 6. Adicionar remote (SUBSTITUA com seus dados)
git remote add origin https://github.com/SEU-USUARIO/univirtus-pwa.git

# 7. Adicionar arquivos
git add .

# 8. Commit
git commit -m "Initial commit"

# 9. Push
git branch -M main
git push -u origin main

# 10. Deploy
npm run deploy
```

### Opção B: Passo a Passo Detalhado

#### Passo 1: Instalar gh-pages
```bash
cd univirtus-pwa
npm install --save-dev gh-pages
```

#### Passo 2: Editar package.json
Adicione a linha do deploy nos scripts (veja seção 2️⃣ acima)

#### Passo 3: Criar repositório no GitHub
- Vá em https://github.com/new
- Nome: `univirtus-pwa`
- Público
- Criar

#### Passo 4: Copiar URL do repositório
Exemplo: `https://github.com/seu-usuario/univirtus-pwa.git`

#### Passo 5: Atualizar vite.config.ts
Mude `base: '/'` para `base: '/univirtus-pwa/'`

#### Passo 6: Inicializar Git
```bash
git init
git remote add origin https://github.com/seu-usuario/univirtus-pwa.git
```

#### Passo 7: Primeiro commit
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

#### Passo 8: Deploy
```bash
npm run deploy
```

---

## 🎯 Resultado Final

Após seguir os passos, seu app estará em:

```
https://seu-usuario.github.io/univirtus-pwa/
```

### Exemplo:
- Se seu usuário for: `joaosilva`
- E o repositório for: `univirtus-pwa`
- URL final: `https://joaosilva.github.io/univirtus-pwa/`

---

## ✅ Checklist de Deploy

Antes de fazer deploy, verifique:

- [ ] gh-pages instalado (`npm install --save-dev gh-pages`)
- [ ] Script "deploy" adicionado no package.json
- [ ] Repositório criado no GitHub
- [ ] vite.config.ts com base correto (`/nome-do-repo/`)
- [ ] Git inicializado (`git init`)
- [ ] Remote adicionado (`git remote add origin ...`)
- [ ] Primeiro push feito (`git push -u origin main`)
- [ ] Deploy executado (`npm run deploy`)

---

## 🔧 Comandos Úteis

### Ver configuração atual do Git:
```bash
cd univirtus-pwa
git remote -v
```

### Ver status do Git:
```bash
git status
```

### Ver branch atual:
```bash
git branch
```

### Verificar se gh-pages está instalado:
```bash
npm list gh-pages
```

### Testar build localmente:
```bash
npm run build
npm run preview
```

---

## ❓ Perguntas Frequentes

### "Qual nome devo usar para o repositório?"
- Pode ser qualquer nome
- Recomendado: `univirtus-pwa`
- Evite espaços e caracteres especiais

### "Preciso pagar pelo GitHub?"
- Não! GitHub Pages é gratuito para repositórios públicos

### "Posso mudar o nome depois?"
- Sim, mas precisará atualizar:
  - vite.config.ts (base)
  - git remote
  - Fazer novo deploy

### "Como atualizar o app depois?"
```bash
git add .
git commit -m "Atualização"
git push
npm run deploy
```

### "Quanto tempo demora para ficar online?"
- Build: 1-2 minutos
- GitHub Pages: 2-5 minutos
- Total: ~5-7 minutos

---

## 🆘 Problemas Comuns

### "git: command not found"
Instale o Git: https://git-scm.com/downloads

### "Permission denied (publickey)"
Use HTTPS em vez de SSH:
```bash
git remote set-url origin https://github.com/usuario/repo.git
```

### "gh-pages not found"
```bash
npm install --save-dev gh-pages
```

### "Failed to publish"
Verifique se:
1. Fez push para main primeiro
2. Repositório é público
3. Nome do remote está correto

---

## 📞 Próximos Passos

1. ✅ Instalar gh-pages
2. ✅ Adicionar script de deploy
3. ✅ Criar repositório no GitHub
4. ✅ Atualizar vite.config.ts
5. ✅ Inicializar Git
6. ✅ Fazer primeiro push
7. ✅ Executar deploy
8. ✅ Compartilhar URL com usuários

---

**Precisa de ajuda? Siga o passo a passo acima! 🚀**
