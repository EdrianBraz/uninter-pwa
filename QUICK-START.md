# ⚡ Quick Start - Deploy em 5 Minutos

## 🎯 Opção 1: Script Automático (Recomendado)

```bash
cd univirtus-pwa
./setup-git.sh
```

O script vai perguntar:
1. Seu nome
2. Seu email
3. URL do repositório GitHub

E configurar tudo automaticamente! ✨

---

## 🎯 Opção 2: Manual (Passo a Passo)

### 1. Criar repositório no GitHub
- Acesse: https://github.com/new
- Nome: `univirtus-pwa`
- Público
- Criar

### 2. Configurar Git LOCAL
```bash
cd univirtus-pwa
git init
git config user.name "Seu Nome"
git config user.email "seu@email.com"
```

### 3. Adicionar repositório
```bash
git remote add origin https://github.com/SEU-USUARIO/univirtus-pwa.git
```

### 4. Atualizar vite.config.ts
```typescript
base: '/univirtus-pwa/',  // Nome do seu repositório
```

### 5. Instalar gh-pages
```bash
npm install --save-dev gh-pages
```

### 6. Primeiro commit
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

### 7. Deploy
```bash
npm run deploy
```

---

## 🎉 Pronto!

Seu app estará em:
```
https://seu-usuario.github.io/univirtus-pwa/
```

---

## 🔄 Atualizações

```bash
git add .
git commit -m "Update"
git push
npm run deploy
```

---

## ❓ Problemas?

### Pede senha no push:
Use Personal Access Token:
1. https://github.com/settings/tokens
2. Generate new token (classic)
3. Marque `repo`
4. Use o token como senha

### gh-pages não encontrado:
```bash
npm install --save-dev gh-pages
```

### Erro de permissão:
```bash
git remote set-url origin https://github.com/usuario/repo.git
```

---

**✅ Configuração LOCAL - Não afeta VSCode!**
