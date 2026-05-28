import { Search, Filter } from 'lucide-react';
import { ArticleCard } from '../components/ArticleCard';
import { useStore } from '../store/useStore';

export const Articles = () => {
  const { searchTerm, sortBy, setSearchTerm, setSortBy, getFilteredArticles } = useStore();
  const filteredArticles = getFilteredArticles();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">文章分析</h1>
          <p className="text-gray-600">查看和分析所有文章的数据表现</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索文章标题或分类..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="date">按发布时间</option>
                <option value="views">按阅读量</option>
                <option value="likes">按点赞数</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">没有找到匹配的文章</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
