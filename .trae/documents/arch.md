
## 1. 架构设计

```mermaid
graph TB
  Frontend[React 前端]
  State[Zustand 状态管理]
  Charts[Recharts 图表库]
  MockData[模拟数据]
  Router[React Router 路由]

  Frontend --&gt; State
  Frontend --&gt; Charts
  Frontend --&gt; Router
  State --&gt; MockData
```

## 2. 技术描述
- 前端：React@18 + TypeScript + Tailwind CSS@3 + Vite
- 初始化工具：vite-init
- 状态管理：Zustand
- 图表库：Recharts
- 路由：React Router DOM
- 后端：无（纯前端应用，使用模拟数据）

## 3. 路由定义
| 路由 | 用途 |
|-------|---------|
| / | 仪表板 - 数据概览 |
| /articles | 文章分析 - 文章数据列表 |
| /suggestions | 内容建议 - 创作方向推荐 |

## 4. 数据模型

### 4.1 文章数据类型
```typescript
interface Article {
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

interface DashboardStats {
  totalViews: number;
  totalInteractions: number;
  totalArticles: number;
  avgViews: number;
  viewsTrend: { date: string; views: number; interactions: number }[];
  topArticles: Article[];
}

interface Suggestion {
  type: 'topic' | 'time' | 'type';
  title: string;
  description: string;
  priority: number;
}
```

## 5. 项目结构
```
/workspace
├── src/
│   ├── components/        # 可复用组件
│   │   ├── StatCard.tsx
│   │   ├── ArticleCard.tsx
│   │   └── SuggestionCard.tsx
│   ├── pages/            # 页面组件
│   │   ├── Dashboard.tsx
│   │   ├── Articles.tsx
│   │   └── Suggestions.tsx
│   ├── hooks/            # 自定义hooks
│   │   └── useData.ts
│   ├── store/            # Zustand状态管理
│   │   └── useStore.ts
│   ├── utils/            # 工具函数
│   │   └── mockData.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

