import { Suggestion } from '../utils/mockData';
import { TrendingUp, Clock, FileText, Zap } from 'lucide-react';

interface SuggestionCardProps {
  suggestion: Suggestion;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'topic':
      return TrendingUp;
    case 'time':
      return Clock;
    case 'type':
      return FileText;
    default:
      return Zap;
  }
};

const getColor = (type: string) => {
  switch (type) {
    case 'topic':
      return 'from-blue-500 to-cyan-500';
    case 'time':
      return 'from-amber-500 to-orange-500';
    case 'type':
      return 'from-green-500 to-emerald-500';
    default:
      return 'from-purple-500 to-pink-500';
  }
};

export const SuggestionCard = ({ suggestion }: SuggestionCardProps) => {
  const Icon = getIcon(suggestion.type);

  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${getColor(suggestion.type)}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-gray-400">#{suggestion.priority}</span>
            <h3 className="text-lg font-bold text-gray-900">{suggestion.title}</h3>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">{suggestion.description}</p>
        </div>
      </div>
    </div>
  );
};
