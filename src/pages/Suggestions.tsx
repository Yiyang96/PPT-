import { Lightbulb } from 'lucide-react';
import { SuggestionCard } from '../components/SuggestionCard';
import { useStore } from '../store/useStore';

export const Suggestions = () => {
  const { suggestions } = useStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Lightbulb className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-900">内容建议</h1>
          </div>
          <p className="text-gray-600">基于数据分析的智能创作方向推荐</p>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">智能分析报告</h2>
          <p className="text-blue-100 text-lg">
            我们分析了您最近的数据表现，为您准备了以下内容创作建议，帮助提升文章质量和用户互动。
          </p>
        </div>

        <div className="grid gap-6">
          {suggestions.map((suggestion) => (
            <SuggestionCard key={suggestion.priority} suggestion={suggestion} />
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">创作小贴士</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-4xl mb-3">📝</div>
              <h4 className="font-bold text-gray-900 mb-2">保持原创</h4>
              <p className="text-sm text-gray-600">原创内容更容易获得用户青睐和平台推荐</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-3">🎨</div>
              <h4 className="font-bold text-gray-900 mb-2">图文并茂</h4>
              <p className="text-sm text-gray-600">优质配图能提升阅读体验和传播效果</p>
            </div>
            <div className="text-center p-4">
              <div className="text-4xl mb-3">⏰</div>
              <h4 className="font-bold text-gray-900 mb-2">规律发布</h4>
              <p className="text-sm text-gray-600">固定的发布节奏有助于培养用户阅读习惯</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
