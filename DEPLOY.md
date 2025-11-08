# 🚀 Deploy do Univirtus PWA no GitHub Pages

## 📋 Pré-requisitos

- Conta no GitHub
- Node.js instalado (v18 ou superior)
- Git instalado

## 🔧 Configuração Inicial

### 1. Criar Repositório no GitHub

1. Acesse [GitHub](https://github.com)
2. Clique em "New repository"
3. Nome: `univirtus-pwa` (ou outro nome de sua preferência)
4. Deixe como **público**
5. Clique em "Create repository"

### 2. Configurar o Projeto

No arquivo `vite.config.ts`, certifique-se de que o `base` está configurado corretamente:

```typescript
export default defineConfig({
  base: '/univirtus-pwa/', // Nome do seu repositório
  // ... resto da configuração
})
```

### 3. Adicionar Script de Deploy

No `package.json`, adicione o script de deploy:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### 4. Instalar gh-pages

```bash
npm install --save-dev gh-pages
```

## 📤 Deploy

### Primeira vez:

```bash
# 1. Inicializar git (se ainda não foi feito)
git init

# 2. Adicionar remote do GitHub
git remote add origin https://github.com/SEU-USUARIO/univirtus-pwa.git

# 3. Adicionar todos os arquivos
git add .

# 4. Fazer commit
git commit -m "Initial commit"

# 5. Push para main
git branch -M main
git push -u origin main

# 6. Deploy para GitHub Pages
npm run deploy
```

### Atualizações futuras:

```bash
# 1. Fazer commit das mudanças
git add .
git commit -m "Descrição das mudanças"
git push

# 2. Deploy
npm run deploy
```

## ⚙️ Configurar GitHub Pages

1. Vá para o repositório no GitHub
2. Clique em **Settings**
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Clique em **Save**

Aguarde alguns minutos e seu app estará disponível em:
```
https://SEU-USUARIO.github.io/univirtus-pwa/
```

## 📱 Instalar como PWA no Celular

### Android (Chrome):

1. Abra o link do app no Chrome
2. Toque no menu (⋮) no canto superior direito
3. Selecione "Adicionar à tela inicial" ou "Instalar app"
4. Confirme a instalação

### iOS (Safari):

1. Abra o link do app no Safari
2. Toque no botão de compartilhar (□↑)
3. Role para baixo e toque em "Adicionar à Tela de Início"
4. Toque em "Adicionar"

## 🔄 Funcionalidades Offline

O app está configurado para funcionar offline com:

✅ **Service Worker** - Cache automático de todos os recursos
✅ **Cache de dados** - Informações do usuário salvas localmente
✅ **Cache de imagens** - Todas as imagens pré-carregadas
✅ **Sincronização** - Dados sincronizados quando voltar online

### Como funciona:

1. **Primeiro acesso**: Conecte-se à internet e faça login
2. **Dados salvos**: Todas as informações são salvas no cache
3. **Uso offline**: Pode usar o app sem internet
4. **Sincronização**: Quando voltar online, dados são atualizados

## 🐛 Troubleshooting

### Erro: "gh-pages not found"
```bash
npm install --save-dev gh-pages
```

### Erro: "Permission denied"
```bash
git remote set-url origin https://SEU-USUARIO:SEU-TOKEN@github.com/SEU-USUARIO/univirtus-pwa.git
```

### App não atualiza após deploy
1. Limpe o cache do navegador (Ctrl+Shift+Delete)
2. Ou acesse em modo anônimo
3. Aguarde alguns minutos para propagação

### PWA não instala
1. Certifique-se de estar usando HTTPS (GitHub Pages usa automaticamente)
2. Verifique se o manifest.json está correto
3. Teste em modo anônimo

## 📊 Monitoramento

Para ver estatísticas de uso:
1. Acesse o repositório no GitHub
2. Vá em **Insights** > **Traffic**
3. Veja visitantes e visualizações

## 🔐 Segurança

- ✅ HTTPS automático via GitHub Pages
- ✅ Dados salvos apenas localmente (localStorage + Cache API)
- ✅ Sem envio de dados para servidores externos
- ✅ Código open source e auditável

## 📝 Notas Importantes

- O GitHub Pages é **gratuito** para repositórios públicos
- Limite de **1GB** de espaço
- Limite de **100GB** de banda por mês
- Atualizações podem levar **alguns minutos** para propagar

## 🆘 Suporte

Se encontrar problemas:
1. Verifique os logs no console do navegador (F12)
2. Verifique o status do GitHub Pages nas configurações
3. Teste em modo anônimo para descartar problemas de cache

---

**Desenvolvido com ❤️ para Univirtus**
