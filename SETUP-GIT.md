# 🔧 Configuração Git Local (Apenas para este projeto)

## 📋 Pré-requisitos

1. ✅ Git instalado no sistema
2. ✅ Conta no GitHub
3. ✅ Repositório criado no GitHub

---

## 🚀 Passo a Passo

### 1️⃣ Verificar se Git está instalado

```bash
git --version
```

Se não estiver instalado: https://git-scm.com/downloads

---

### 2️⃣ Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Nome: `univirtus-pwa` (ou outro)
3. Deixe **público**
4. **NÃO** marque "Initialize with README"
5. Clique em "Create repository"
6. **Copie a URL** que aparece (ex: `https://github.com/seu-usuario/univirtus-pwa.git`)

---

### 3️⃣ Configurar Git LOCAL (apenas neste projeto)

Execute estes comandos **dentro da pasta univirtus-pwa**:

```bash
# Entrar na pasta do projeto
cd univirtus-pwa

# Inicializar Git
git init

# Configurar nome e email APENAS para este projeto (não global)
git config user.name "Seu Nome"
git config user.email "seu-email@example.com"

# Verificar configuração local
git config --local user.name
git config --local user.email
```

**⚠️ Importante:** Sem a flag `--global`, a configuração fica apenas neste projeto!

---

### 4️⃣ Atualizar vite.config.ts

Antes de fazer o deploy, atualize o `base` no arquivo `vite.config.ts`:

```typescript
// SUBSTITUA 'univirtus-pwa' pelo nome do SEU repositório
export default defineConfig({
  base: '/univirtus-pwa/',  // ← Nome do repositório entre barras
  // ... resto do código
})
```

---

### 5️⃣ Instalar gh-pages

```bash
npm install --save-dev gh-pages
```

---

### 6️⃣ Adicionar Remote do GitHub

```bash
# SUBSTITUA pela URL do SEU repositório
git remote add origin https://github.com/SEU-USUARIO/univirtus-pwa.git

# Verificar se foi adicionado
git remote -v
```

---

### 7️⃣ Primeiro Commit e Push

```bash
# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Initial commit - Univirtus PWA"

# Criar branch main
git branch -M main

# Push para GitHub
git push -u origin main
```

**Se pedir autenticação:**
- Usuário: seu username do GitHub
- Senha: use um **Personal Access Token** (não a senha da conta)

---

### 8️⃣ Criar Personal Access Token (se necessário)

Se o GitHub pedir senha e não aceitar:

1. Acesse: https://github.com/settings/tokens
2. Clique em "Generate new token" → "Generate new token (classic)"
3. Nome: `Univirtus Deploy`
4. Marque: `repo` (todos os sub-itens)
5. Clique em "Generate token"
6. **COPIE O TOKEN** (só aparece uma vez!)
7. Use este token como senha no git push

---

### 9️⃣ Deploy para GitHub Pages

```bash
npm run deploy
```

Aguarde alguns minutos e seu app estará em:
```
https://seu-usuario.github.io/univirtus-pwa/
```

---

## 🔄 Atualizações Futuras

Quando fizer mudanças no código:

```bash
# 1. Adicionar mudanças
git add .

# 2. Commit
git commit -m "Descrição das mudanças"

# 3. Push
git push

# 4. Deploy
npm run deploy
```

---

## 📝 Comandos Úteis

### Ver configuração LOCAL (apenas deste projeto):
```bash
git config --local --list
```

### Ver configuração GLOBAL (não mexer):
```bash
git config --global --list
```

### Ver status:
```bash
git status
```

### Ver histórico:
```bash
git log --oneline
```

### Ver remote:
```bash
git remote -v
```

### Mudar remote (se errou a URL):
```bash
git remote set-url origin https://github.com/usuario-correto/repo-correto.git
```

---

## ❓ Troubleshooting

### "Permission denied (publickey)"

Use HTTPS em vez de SSH:
```bash
git remote set-url origin https://github.com/seu-usuario/univirtus-pwa.git
```

### "Authentication failed"

1. Crie um Personal Access Token (passo 8️⃣)
2. Use o token como senha
3. Ou configure credential helper:
```bash
git config --local credential.helper store
```

### "gh-pages not found"

```bash
npm install --save-dev gh-pages
```

### "Failed to publish"

Verifique:
1. ✅ Fez push para main primeiro
2. ✅ Repositório é público
3. ✅ Nome do remote está correto

---

## 🎯 Checklist Completo

Antes de fazer deploy:

- [ ] Git instalado
- [ ] Repositório criado no GitHub
- [ ] Git inicializado (`git init`)
- [ ] Configuração local feita (nome e email)
- [ ] vite.config.ts atualizado (base)
- [ ] gh-pages instalado
- [ ] Remote adicionado
- [ ] Primeiro push feito
- [ ] Deploy executado

---

## 🔐 Segurança

### ✅ Configuração Local vs Global

**Local (apenas este projeto):**
```bash
git config user.name "Nome"
git config user.email "email@example.com"
```

**Global (todos os projetos - NÃO USAR):**
```bash
git config --global user.name "Nome"  # ❌ Não fazer
git config --global user.email "email"  # ❌ Não fazer
```

### ✅ Verificar onde está configurado

```bash
# Ver apenas configuração local
git config --local --list

# Ver apenas configuração global
git config --global --list

# Ver todas (local sobrescreve global)
git config --list
```

---

## 📞 Comandos Rápidos

### Setup Inicial Completo:
```bash
cd univirtus-pwa
git init
git config user.name "Seu Nome"
git config user.email "seu-email@example.com"
git remote add origin https://github.com/SEU-USUARIO/univirtus-pwa.git
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
npm run deploy
```

### Atualização Rápida:
```bash
git add .
git commit -m "Update"
git push
npm run deploy
```

---

**✅ Pronto! Git configurado apenas para este projeto!**

Suas configurações do VSCode não serão afetadas.
