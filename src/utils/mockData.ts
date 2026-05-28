export interface Article {
  id: string;
  title: string;
  date: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  category: string;
  wordCount: number;
  readTime: number;
}

export interface DashboardStats {
  totalViews: number;
  totalInteractions: number;
  totalArticles: number;
  avgViews: number;
  viewsTrend: { date: string; views: number; interactions: number }[];
  topArticles: Article[];
}

export interface Suggestion {
  type: 'topic' | 'time' | 'type';
  title: string;
  description: string;
  priority: number;
}

export const mockArticles: Article[] = [
  {
    id: '1',
    title: '深入理解React Hooks的工作原理',
    date: '2024-05-15',
    views: 12580,
    likes: 856,
    comments: 132,
    shares: 245,
    category: '技术',
    wordCount: 3200,
    readTime: 8,
  },
  {
    id: '2',
    title: '2024年最值得关注的前端技术趋势',
    date: '2024-05-10',
    views: 15620,
    likes: 1024,
    comments: 201,
    shares: 312,
    category: '趋势',
    wordCount: 2800,
    readTime: 7,
  },
  {
    id: '3',
    title: 'TypeScript高级技巧：类型体操实战',
    date: '2024-05-05',
    views: 8950,
    likes: 678,
    comments: 95,
    shares: 189,
    category: '技术',
    wordCount: 4500,
    readTime: 11,
  },
  {
    id: '4',
    title: '从零搭建高性能React应用架构',
    date: '2024-04-28',
    views: 11230,
    likes: 789,
    comments: 156,
    shares: 223,
    category: '架构',
    wordCount: 5200,
    readTime: 13,
  },
  {
    id: '5',
    title: 'CSS Grid布局完全指南',
    date: '2024-04-20',
    views: 9870,
    likes: 567,
    comments: 89,
    shares: 167,
    category: 'CSS',
    wordCount: 3600,
    readTime: 9,
  },
  {
    id: '6',
    title: 'Node.js性能优化最佳实践',
    date: '2024-04-15',
    views: 7850,
    likes: 456,
    comments: 78,
    shares: 134,
    category: '后端',
    wordCount: 3100,
    readTime: 8,
  },
  {
    id: '7',
    title: '如何写出可维护的代码',
    date: '2024-04-08',
    views: 14200,
    likes: 923,
    comments: 178,
    shares: 278,
    category: '软技能',
    wordCount: 2500,
    readTime: 6,
  },
  {
    id: '8',
    title: 'Tailwind CSS 3.0 新特性详解',
    date: '2024-04-01',
    views: 6890,
    likes: 389,
    comments: 56,
    shares: 98,
    category: 'CSS',
    wordCount: 2200,
    readTime: 5,
  },
];

export const viewsTrendData = [
  { date: '2024-04-01', views: 8500, interactions: 1200 },
  { date: '2024-04-07', views: 10200, interactions: 1500 },
  { date: '2024-04-14', views: 8900, interactions: 1300 },
  { date: '2024-04-21', views: 12500, interactions: 1800 },
  { date: '2024-04-28', views: 11000, interactions: 1600 },
  { date: '2024-05-05', views: 13200, interactions: 1900 },
  { date: '2024-05-12', views: 15800, interactions: 2200 },
];

export const suggestions: Suggestion[] = [
  {
    type: 'topic',
    title: 'AI在前端开发中的应用',
    description: '近期技术类文章阅读量增长35%，AI相关话题是热门方向',
    priority: 1,
  },
  {
    type: 'time',
    title: '最佳发布时间：周三晚上8-10点',
    description: '数据显示此时段发布的文章互动量比其他时间高42%',
    priority: 2,
  },
  {
    type: 'type',
    title: '教程类内容表现最佳',
    description: '教程类文章平均阅读量比资讯类高28%，建议增加实操内容',
    priority: 3,
  },
  {
    type: 'topic',
    title: 'Web性能优化',
    description: '性能相关文章分享率最高，用户关注度持续上升',
    priority: 4,
  },
];

export const getDashboardStats = (): DashboardStats => {
  const totalViews = mockArticles.reduce((sum, a) => sum + a.views, 0);
  const totalInteractions = mockArticles.reduce(
    (sum, a) => sum + a.likes + a.comments + a.shares,
    0
  );
  const totalArticles = mockArticles.length;
  const avgViews = Math.round(totalViews / totalArticles);
  const topArticles = [...mockArticles].sort((a, b) => b.views - a.views).slice(0, 5);

  return {
    totalViews,
    totalInteractions,
    totalArticles,
    avgViews,
    viewsTrend: viewsTrendData,
    topArticles,
  };
};
