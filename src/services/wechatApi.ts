
import { Article } from '../utils/mockData';

export interface WeChatAuth {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  userId: string;
}

export interface SyncStatus {
  isSyncing: boolean;
  lastSyncTime: string | null;
  syncError: string | null;
}

const AUTH_KEY = 'wechat_auth';
const DATA_KEY = 'wechat_data';
const STATUS_KEY = 'sync_status';

export const isConnected = (): boolean => {
  const auth = localStorage.getItem(AUTH_KEY);
  if (!auth) return false;
  try {
    const data: WeChatAuth = JSON.parse(auth);
    return data.expiresAt > Date.now();
  } catch {
    return false;
  }
};

export const getAuth = (): WeChatAuth | null => {
  const auth = localStorage.getItem(AUTH_KEY);
  if (!auth) return null;
  try {
    return JSON.parse(auth);
  } catch {
    return null;
  }
};

export const clearAuth = (): void => {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(DATA_KEY);
};

export const getSyncStatus = (): SyncStatus => {
  const status = localStorage.getItem(STATUS_KEY);
  if (!status) {
    return {
      isSyncing: false,
      lastSyncTime: null,
      syncError: null,
    };
  }
  try {
    return JSON.parse(status);
  } catch {
    return {
      isSyncing: false,
      lastSyncTime: null,
      syncError: null,
    };
  }
};

export const saveSyncStatus = (status: SyncStatus): void => {
  localStorage.setItem(STATUS_KEY, JSON.stringify(status));
};

export const getLocalData = (): Article[] | null => {
  const data = localStorage.getItem(DATA_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
};

export const saveLocalData = (articles: Article[]): void => {
  localStorage.setItem(DATA_KEY, JSON.stringify(articles));
};

export const syncData = async (): Promise<Article[]> => {
  const status = getSyncStatus();
  saveSyncStatus({ ...status, isSyncing: true, syncError: null });
  
  try {
    if (!isConnected()) {
      throw new Error('Not connected');
    }
    
    const mockArticles: Article[] = [
      {
        id: 'api_1',
        title: 'API Sync Article 1',
        date: '2024-05-20',
        views: 15800,
        likes: 923,
        comments: 156,
        shares: 278,
        category: 'Tech',
        wordCount: 3800,
        readTime: 10,
      },
      {
        id: 'api_2',
        title: 'API Sync Article 2',
        date: '2024-05-18',
        views: 12400,
        likes: 756,
        comments: 123,
        shares: 210,
        category: 'Trends',
        wordCount: 2900,
        readTime: 7,
      },
    ];
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    saveLocalData(mockArticles);
    
    saveSyncStatus({
      isSyncing: false,
      lastSyncTime: new Date().toISOString(),
      syncError: null,
    });
    
    return mockArticles;
  } catch (error) {
    saveSyncStatus({
      isSyncing: false,
      lastSyncTime: getSyncStatus().lastSyncTime,
      syncError: error instanceof Error ? error.message : 'Sync failed',
    });
    throw error;
  }
};

export const connectWeChat = async (): Promise<WeChatAuth> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const mockAuth: WeChatAuth = {
    accessToken: 'mock_token_' + Date.now(),
    refreshToken: 'mock_refresh_' + Date.now(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    userId: 'mock_user',
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(mockAuth));
  return mockAuth;
};
