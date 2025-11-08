#!/bin/bash

# Script de configuração Git LOCAL para Univirtus PWA
# Este script NÃO afeta configurações globais do Git

echo "🚀 Configuração Git Local - Univirtus PWA"
echo "=========================================="
echo ""

# Verificar se Git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Git não está instalado!"
    echo "Instale em: https://git-scm.com/downloads"
    exit 1
fi

echo "✅ Git instalado: $(git --version)"
echo ""

# Verificar se já está inicializado
if [ -d .git ]; then
    echo "⚠️  Git já está inicializado neste projeto"
    echo ""
else
    echo "📦 Inicializando Git..."
    git init
    echo "✅ Git inicializado"
    echo ""
fi

# Solicitar informações do usuário
echo "📝 Configuração LOCAL (apenas para este projeto)"
echo ""
read -p "Seu nome: " user_name
read -p "Seu email: " user_email
echo ""

# Configurar localmente (sem --global)
git config user.name "$user_name"
git config user.email "$user_email"

echo "✅ Configuração local salva:"
echo "   Nome: $(git config user.name)"
echo "   Email: $(git config user.email)"
echo ""

# Solicitar URL do repositório
echo "🔗 Configuração do Repositório GitHub"
echo ""
echo "Exemplo: https://github.com/seu-usuario/univirtus-pwa.git"
read -p "URL do repositório: " repo_url
echo ""

# Verificar se remote já existe
if git remote | grep -q "origin"; then
    echo "⚠️  Remote 'origin' já existe"
    read -p "Deseja atualizar? (s/n): " update_remote
    if [ "$update_remote" = "s" ]; then
        git remote set-url origin "$repo_url"
        echo "✅ Remote atualizado"
    fi
else
    git remote add origin "$repo_url"
    echo "✅ Remote adicionado"
fi

echo ""
echo "📋 Verificação:"
git remote -v
echo ""

# Perguntar sobre vite.config.ts
echo "⚙️  Configuração do vite.config.ts"
echo ""
echo "Extraindo nome do repositório da URL..."
repo_name=$(echo "$repo_url" | sed 's/.*\/\([^/]*\)\.git/\1/')
echo "Nome do repositório: $repo_name"
echo ""
echo "⚠️  IMPORTANTE: Atualize o vite.config.ts manualmente:"
echo "   base: '/$repo_name/',"
echo ""

# Verificar se gh-pages está instalado
if npm list gh-pages &> /dev/null; then
    echo "✅ gh-pages já está instalado"
else
    echo "📦 Instalando gh-pages..."
    npm install --save-dev gh-pages
    echo "✅ gh-pages instalado"
fi

echo ""
echo "✅ Configuração concluída!"
echo ""
echo "📝 Próximos passos:"
echo ""
echo "1. Atualize vite.config.ts:"
echo "   base: '/$repo_name/',"
echo ""
echo "2. Faça o primeiro commit:"
echo "   git add ."
echo "   git commit -m \"Initial commit\""
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Deploy:"
echo "   npm run deploy"
echo ""
echo "🎉 Seu app estará em:"
echo "   https://$(echo $repo_url | sed 's/https:\/\/github.com\///' | sed 's/\/.*//')/$repo_name/"
echo ""
