// Cache Manager para dados offline
const CACHE_VERSION = 'v1';
const CACHE_NAMES = {
  USER_DATA: `user-data-${CACHE_VERSION}`,
  MOCK_DATA: `mock-data-${CACHE_VERSION}`,
  IMAGES: `images-${CACHE_VERSION}`,
};

export class CacheManager {
  // Salvar dados do usuário no cache
  static async saveUserData(userId: string, data: any): Promise<void> {
    try {
      const cache = await caches.open(CACHE_NAMES.USER_DATA);
      const response = new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });
      await cache.put(`/user/${userId}`, response);
      console.log('✅ Dados do usuário salvos no cache');
    } catch (error) {
      console.error('❌ Erro ao salvar dados do usuário:', error);
    }
  }

  // Recuperar dados do usuário do cache
  static async getUserData(userId: string): Promise<any | null> {
    try {
      const cache = await caches.open(CACHE_NAMES.USER_DATA);
      const response = await cache.match(`/user/${userId}`);
      if (response) {
        const data = await response.json();
        console.log('✅ Dados do usuário recuperados do cache');
        return data;
      }
      return null;
    } catch (error) {
      console.error('❌ Erro ao recuperar dados do usuário:', error);
      return null;
    }
  }

  // Salvar dados mockados
  static async saveMockData(key: string, data: any): Promise<void> {
    try {
      const cache = await caches.open(CACHE_NAMES.MOCK_DATA);
      const response = new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      });
      await cache.put(`/mock/${key}`, response);
      console.log(`✅ Mock data '${key}' salvo no cache`);
    } catch (error) {
      console.error('❌ Erro ao salvar mock data:', error);
    }
  }

  // Recuperar dados mockados
  static async getMockData(key: string): Promise<any | null> {
    try {
      const cache = await caches.open(CACHE_NAMES.MOCK_DATA);
      const response = await cache.match(`/mock/${key}`);
      if (response) {
        const data = await response.json();
        console.log(`✅ Mock data '${key}' recuperado do cache`);
        return data;
      }
      return null;
    } catch (error) {
      console.error('❌ Erro ao recuperar mock data:', error);
      return null;
    }
  }

  // Pré-carregar imagens essenciais
  static async preloadImages(imageUrls: string[]): Promise<void> {
    try {
      const cache = await caches.open(CACHE_NAMES.IMAGES);
      const promises = imageUrls.map(async (url) => {
        try {
          const response = await fetch(url);
          if (response.ok) {
            await cache.put(url, response);
            console.log(`✅ Imagem carregada: ${url}`);
          }
        } catch (error) {
          console.warn(`⚠️ Falha ao carregar imagem: ${url}`);
        }
      });
      await Promise.all(promises);
      console.log('✅ Todas as imagens foram pré-carregadas');
    } catch (error) {
      console.error('❌ Erro ao pré-carregar imagens:', error);
    }
  }

  // Limpar caches antigos
  static async clearOldCaches(): Promise<void> {
    try {
      const cacheNames = await caches.keys();
      const currentCaches = Object.values(CACHE_NAMES);
      
      const deletePromises = cacheNames
        .filter(name => !currentCaches.includes(name))
        .map(name => caches.delete(name));
      
      await Promise.all(deletePromises);
      console.log('✅ Caches antigos removidos');
    } catch (error) {
      console.error('❌ Erro ao limpar caches antigos:', error);
    }
  }

  // Verificar se está online
  static isOnline(): boolean {
    return navigator.onLine;
  }

  // Sincronizar dados quando voltar online
  static setupOnlineListener(callback: () => void): void {
    window.addEventListener('online', () => {
      console.log('🌐 Conexão restaurada');
      callback();
    });

    window.addEventListener('offline', () => {
      console.log('📴 Sem conexão com a internet');
    });
  }
}

// Inicializar cache ao carregar o app
export const initializeCache = async () => {
  console.log('🚀 Inicializando sistema de cache...');
  
  // Limpar caches antigos
  await CacheManager.clearOldCaches();
  
  // Pré-carregar imagens essenciais
  const essentialImages = [
    '/src/utils/logoLogin.jpeg',
    '/src/utils/logoHome.png',
    '/src/utils/logoHome2.png',
    '/src/utils/LogoBlack.png',
    '/src/utils/cardWhite.png',
    '/src/utils/CardBlack.png',
  ];
  
  await CacheManager.preloadImages(essentialImages);
  
  console.log('✅ Sistema de cache inicializado');
};
