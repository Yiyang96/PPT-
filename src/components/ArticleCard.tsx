import { Article } from '../utils/mockData';
import { Eye, Heart, MessageCircle, Share2, Calendar, Tag } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export const ArticleCard = ({ article, index }: ArticleCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {index !== undefined && (
            <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 text-white text-sm font-bold rounded-full mb-2">
              {index + 1}
            </span>
          )}
          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{article.title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              {article.category}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-gray-600">
          <Eye className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-xs text-gray-400">阅读</p>
            <p className="font-semibold text-gray-900">{article.views.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Heart className="w-5 h-5 text-pink-500" />
          <div>
            <p className="text-xs text-gray-400">点赞</p>
            <p className="font-semibold text-gray-900">{article.likes.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MessageCircle className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-xs text-gray-400">评论</p>
            <p className="font-semibold text-gray-900">{article.comments.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Share2 className="w-5 h-5 text-purple-500" />
          <div>
            <p className="text-xs text-gray-400">分享</p>
            <p className="font-semibold text-gray-900">{article.shares.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
        <span>{article.wordCount.toLocaleString()} 字</span>
        <span>·</span>
        <span>{article.readTime} 分钟阅读</span>
      </div>
    </div>
  );
};
