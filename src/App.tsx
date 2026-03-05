import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BloggerProfile from './pages/BloggerProfile';
import Requirements from './pages/Requirements';
import RequirementDetail from './pages/RequirementDetail';
import OutlineDetail from './pages/OutlineDetail';

function App() {
  return (
    <Router>
      <Routes>
        {/* 主页 - Media Kit 个人主页 */}
        <Route path="/" element={<BloggerProfile />} />
        
        {/* 合作指南页面 */}
        <Route path="/profile" element={<BloggerProfile />} />
        
        {/* 需求管理 */}
        <Route path="/requirements" element={<Requirements />} />
        <Route path="/requirement/:id" element={<RequirementDetail />} />
        
        {/* 大纲详情 */}
        <Route path="/outline/:id" element={<OutlineDetail />} />
        
        {/* 404 重定向到首页 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
