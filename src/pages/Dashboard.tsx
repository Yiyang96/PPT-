import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Eye, MessageSquare, FileText, TrendingUp } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { ArticleCard } from '../components/ArticleCard';
import { useStore } from '../store/useStore';

export const Dashboard = () => {
  const { dashboardStats } = useStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">数据概览</h1>
          <p className="text-gray-600">查看您公众号的关键指标和数据趋势</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="总阅读量"
            value={dashboardStats.totalViews.toLocaleString()}
            icon={Eye}
            color="bg-gradient-to-br from-blue-500 to-cyan-500"
            change="12.5%"
            positive={true}
          />
          <StatCard
            title="总互动量"
            value={dashboardStats.totalInteractions.toLocaleString()}
            icon={MessageSquare}
            color="bg-gradient-to-br from-purple-500 to-pink-500"
            change="8.3%"
            positive={true}
          />
          <StatCard
            title="文章总数"
            value={dashboardStats.totalArticles}
            icon={FileText}
            color="bg-gradient-to-br from-green-500 to-emerald-500"
            change="25%"
            positive={true}
          />
          <StatCard
            title="平均阅读量"
            value={dashboardStats.avgViews.toLocaleString()}
            icon={TrendingUp}
            color="bg-gradient-to-br from-amber-500 to-orange-500"
            change="5.2%"
            positive={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">阅读趋势</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardStats.viewsTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="interactions"
                    stroke="#ec4899"
                    strokeWidth={3}
                    dot={{ fill: '#ec4899', r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">热门文章 TOP5</h2>
            <div className="space-y-4">
              {dashboardStats.topArticles.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
