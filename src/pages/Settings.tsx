
import { useState, useEffect } from 'react';
import { Link2, RefreshCw, Trash2, CheckCircle, AlertCircle, Settings as SettingsIcon } from 'lucide-react';
import {
  isConnected,
  getAuth,
  clearAuth,
  syncData,
  getSyncStatus,
  saveSyncStatus,
  connectWeChat,
  type WeChatAuth,
  type SyncStatus
} from '../services/wechatApi';
import { useStore } from '../store/useStore';

export const Settings = () => {
  const [auth, setAuth] = useState<WeChatAuth | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>(getSyncStatus());
  const [isConnecting, setIsConnecting] = useState(false);
  const { setArticles } = useStore();

  useEffect(() => {
    setAuth(getAuth());
    setSyncStatus(getSyncStatus());
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connectWeChat();
      setAuth(getAuth());
      await handleSync();
    } catch (error) {
      console.error('Connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    if (window.confirm('Are you sure you want to disconnect?')) {
      clearAuth();
      setAuth(null);
      saveSyncStatus({
        isSyncing: false,
        lastSyncTime: null,
        syncError: null,
      });
      setSyncStatus(getSyncStatus());
    }
  };

  const handleSync = async () => {
    const newStatus = { ...syncStatus, isSyncing: true, syncError: null };
    setSyncStatus(newStatus);
    saveSyncStatus(newStatus);
    
    try {
      const articles = await syncData();
      setArticles(articles);
      setSyncStatus(getSyncStatus());
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncStatus(getSyncStatus());
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatExpiryDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <SettingsIcon className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          </div>
          <p className="text-gray-600">Manage WeChat integration and data sync</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">WeChat Connection</h2>
          
          {auth ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <div>
                  <p className="font-semibold text-green-800">Connected</p>
                  <p className="text-sm text-green-600">
                    Expires: {formatExpiryDate(auth.expiresAt)}
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleDisconnect}
                className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                Disconnect
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <AlertCircle className="w-6 h-6 text-gray-400" />
                <div>
                  <p className="font-semibold text-gray-700">Not Connected</p>
                  <p className="text-sm text-gray-500">Connect your WeChat account to sync data</p>
                </div>
              </div>
              
              <button
                onClick={handleConnect}
                disabled={isConnecting}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Link2 className="w-5 h-5" />
                {isConnecting ? 'Connecting...' : 'Connect WeChat'}
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Data Sync</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Last Sync</p>
                <p className="font-semibold text-gray-900">
                  {syncStatus.lastSyncTime ? formatDate(syncStatus.lastSyncTime) : 'Never'}
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <p className="font-semibold text-gray-900">
                  {syncStatus.isSyncing ? 'Syncing...' : 'Idle'}
                </p>
              </div>
            </div>
            
            {syncStatus.syncError && (
              <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                <p className="font-semibold text-red-800 mb-1">Sync Error</p>
                <p className="text-sm text-red-600">{syncStatus.syncError}</p>
              </div>
            )}
            
            <button
              onClick={handleSync}
              disabled={!auth || syncStatus.isSyncing}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-5 h-5 ${syncStatus.isSyncing ? 'animate-spin' : ''}`} />
              {syncStatus.isSyncing ? 'Syncing...' : 'Sync Now'}
            </button>
            
            {!auth && (
              <p className="text-sm text-gray-500">
                Connect WeChat first to sync data
              </p>
            )}
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6 mt-6">
          <h3 className="font-semibold text-blue-800 mb-2">About</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>This is a demo version</li>
            <li>Production requires WeChat Open Platform credentials</li>
            <li>Requires backend service for OAuth and API calls</li>
            <li>Data stored locally in your browser</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
