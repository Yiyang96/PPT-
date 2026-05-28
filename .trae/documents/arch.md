
## 1. 架构设计

```mermaid
graph TB
  Frontend[React 前端]
  State[Zustand 状态管理]
  Charts[Recharts 图表库]
  MockData[模拟数据]
  Router[React Router 路由]
  WeChatAPI[微信公众号API]
  OAuth[OAuth 认证]
  DataSync[数据同步服务]
  LocalStorage[本地存储]

  Frontend --&gt; State
  Frontend --&gt; Charts
  Frontend --&gt; Router
  State --&gt; MockData
  State --&gt; DataSync
  DataSync --&gt; WeChatAPI
  DataSync --&gt; OAuth
  DataSync --&gt; LocalStorage
```

## 2. 技术描述
- 前端：React@18 + TypeScript + Tailwind CSS@3 + Vite
- 初始化工具：vite-init
- 状态管理：Zustand
- 图表库：Recharts
- 路由：React Router DOM
- 后端：无（纯前端应用）
- 数据源：支持模拟数据和微信公众号API集成
- 认证：OAuth 2.0 认证流程
- 存储：LocalStorage 用于持久化用户数据和API凭证

## 3. 路由定义
| 路由 | 用途 |
|-------|---------|
| / | 仪表板 - 数据概览 |
| /articles | 文章分析 - 文章数据列表 |
| /suggestions | 内容建议 - 创作方向推荐 |
| /settings | 设置 - 账户连接和数据同步配置 |

## 6. 微信公众号API集成设计

### 6.1 OAuth 认证流程
```mermaid
sequenceDiagram
    participant User as 用户
    participant Frontend as 前端应用
    participant WeChat as 微信开放平台
    participant LocalStorage as 本地存储

    User-&gt;&gt;Frontend: 点击"连接公众号"
    Frontend-&gt;&gt;WeChat: 重定向到微信授权页面
    WeChat-&gt;&gt;User: 用户授权
    User-&gt;&gt;WeChat: 同意授权
    WeChat-&gt;&gt;Frontend: 返回授权码
    Frontend-&gt;&gt;WeChat: 授权码换取 access_token
    WeChat-&gt;&gt;Frontend: 返回 access_token
    Frontend-&gt;&gt;LocalStorage: 存储 access_token
    Frontend-&gt;&gt;User: 显示连接成功
```

### 6.2 数据同步流程
1. **认证检查**：应用启动时检查 LocalStorage 中是否存在有效凭证
2. **数据获取**：通过微信公众号API获取用户文章数据
3. **数据转换**：将微信API返回的数据格式转换为应用内部数据格式
4. **数据存储**：将转换后的数据存储到 LocalStorage 和应用状态中
5. **增量更新**：支持定期或手动触发数据同步

### 6.3 数据模型扩展
```typescript
// API集成相关数据类型
interface WeChatAuth {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  userId: string;
}

interface SyncStatus {
  isSyncing: boolean;
  lastSyncTime: string | null;
  syncError: string | null;
}
```

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

