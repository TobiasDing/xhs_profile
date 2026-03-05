import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, User, Eye, Edit2, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 类型定义
interface Requirement {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'closed';
  priority: 'high' | 'medium' | 'low';
  genre: 'image_text' | 'video';
  req_type: 'cooperation' | 'soft_plant' | 'collection';
  products: string;
  assignee: string;
  created_at: string;
}

// 状态映射
const statusConfig = {
  pending: { label: '待处理', color: '#8c8c8c', bgColor: '#f5f5f5' },
  in_progress: { label: '进行中', color: '#1890ff', bgColor: '#e6f7ff' },
  completed: { label: '已完成', color: '#52c41a', bgColor: '#f6ffed' },
  closed: { label: '已关闭', color: '#ff4d4f', bgColor: '#fff2f0' },
};

const priorityConfig = {
  high: { label: '高', color: '#ff4d4f', bgColor: '#fff2f0' },
  medium: { label: '中', color: '#faad14', bgColor: '#fffbe6' },
  low: { label: '低', color: '#52c41a', bgColor: '#f6ffed' },
};

const genreConfig = {
  image_text: { label: '图文', color: '#1890ff', bgColor: '#e6f7ff' },
  video: { label: '视频', color: '#722ed1', bgColor: '#f9f0ff' },
};

const typeLabels: Record<string, string> = {
  cooperation: '合作',
  soft_plant: '软植',
  collection: '合集',
};

// 模拟数据
const mockRequirements: Requirement[] = [
  {
    id: 'REQ-001',
    title: '客厅改造内容创作',
    description: '拍摄客厅改造前后对比视频',
    status: 'in_progress',
    priority: 'high',
    genre: 'video',
    req_type: 'cooperation',
    products: '沙发,茶几,地毯',
    assignee: '车车Home',
    created_at: '2024-01-15',
  },
  {
    id: 'REQ-002',
    title: '卧室软装分享图文',
    description: '分享卧室软装搭配心得',
    status: 'pending',
    priority: 'medium',
    genre: 'image_text',
    req_type: 'soft_plant',
    products: '床品,窗帘,装饰画',
    assignee: '',
    created_at: '2024-01-16',
  },
];

export default function Requirements() {
  const navigate = useNavigate();
  const [requirements, setRequirements] = useState<Requirement[]>(mockRequirements);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  // 筛选状态
  const [filterKeyword, setFilterKeyword] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterPriority, setFilterPriority] = useState<string>('');
  
  // 表单状态
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: 'image_text' as const,
    req_type: 'cooperation' as const,
    priority: 'medium' as const,
    products: '',
    assignee: '',
  });

  // 筛选后的数据
  const filteredRequirements = useMemo(() => {
    return requirements.filter(item => {
      const matchKeyword = !filterKeyword || 
        item.title.toLowerCase().includes(filterKeyword.toLowerCase()) ||
        item.id.toLowerCase().includes(filterKeyword.toLowerCase());
      const matchStatus = !filterStatus || item.status === filterStatus;
      const matchPriority = !filterPriority || item.priority === filterPriority;
      return matchKeyword && matchStatus && matchPriority;
    });
  }, [requirements, filterKeyword, filterStatus, filterPriority]);

  const handleSearch = () => {
    // 筛选已在 useMemo 中自动处理
  };

  const handleReset = () => {
    setFilterKeyword('');
    setFilterStatus('');
    setFilterPriority('');
  };

  const handleCreate = () => {
    if (!formData.title) return;
    
    const newRequirement: Requirement = {
      id: `REQ-${String(requirements.length + 1).padStart(3, '0')}`,
      ...formData,
      status: 'pending',
      created_at: new Date().toISOString().split('T')[0],
    };
    
    setRequirements([...requirements, newRequirement]);
    setShowCreateModal(false);
    setFormData({
      title: '',
      description: '',
      genre: 'image_text',
      req_type: 'cooperation',
      priority: 'medium',
      products: '',
      assignee: '',
    });
  };

  const handleDelete = (id: string) => {
    setRequirements(requirements.filter(item => item.id !== id));
    setShowDeleteConfirm(null);
  };

  const goToDetail = (id: string) => {
    navigate(`/requirement/${id}`);
  };

  const formatDate = (date: string) => {
    return date;
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#f5f5f5' }}>
      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: '#4B3621', fontFamily: 'Noto Serif SC, serif' }}>
              需求列表
            </h1>
            <p className="text-sm mt-1" style={{ color: '#8B7355' }}>管理所有需求</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#4B3621' }}
          >
            <Plus size={18} />
            新建需求
          </button>
        </div>
      </motion.div>

      {/* 筛选栏 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-4 rounded-lg mb-6"
        style={{ backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
      >
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm mb-1" style={{ color: '#4B3621' }}>搜索</label>
            <input
              type="text"
              value={filterKeyword}
              onChange={(e) => setFilterKeyword(e.target.value)}
              placeholder="搜索标题或ID"
              className="px-3 py-2 rounded border outline-none focus:ring-2"
              style={{ borderColor: '#d9d9d9', width: '200px' }}
            />
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: '#4B3621' }}>状态</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded border outline-none focus:ring-2"
              style={{ borderColor: '#d9d9d9', width: '120px' }}
            >
              <option value="">全部状态</option>
              <option value="pending">待处理</option>
              <option value="in_progress">进行中</option>
              <option value="completed">已完成</option>
              <option value="closed">已关闭</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1" style={{ color: '#4B3621' }}>优先级</label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 rounded border outline-none focus:ring-2"
              style={{ borderColor: '#d9d9d9', width: '120px' }}
            >
              <option value="">全部优先级</option>
              <option value="high">高</option>
              <option value="medium">中</option>
              <option value="low">低</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="flex items-center gap-1 px-4 py-2 rounded text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#4B3621' }}
            >
              <Search size={16} />
              搜索
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded border transition-all hover:bg-gray-50"
              style={{ borderColor: '#d9d9d9', color: '#4B3621' }}
            >
              重置
            </button>
          </div>
        </div>
      </motion.div>

      {/* 需求列表 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-lg overflow-hidden"
        style={{ backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: '#fafafa' }}>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#4B3621' }}>ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#4B3621' }}>标题</th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#4B3621' }}>状态</th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#4B3621' }}>优先级</th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#4B3621' }}>体裁</th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#4B3621' }}>类型</th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#4B3621' }}>绑定产品</th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#4B3621' }}>负责人</th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#4B3621' }}>创建时间</th>
                <th className="px-4 py-3 text-left text-sm font-medium" style={{ color: '#4B3621' }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequirements.map((record, index) => (
                <motion.tr
                  key={record.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="border-t hover:bg-gray-50 transition-colors"
                  style={{ borderColor: '#f0f0f0' }}
                >
                  <td className="px-4 py-3">
                    <code className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#f5f5f5', color: '#4B3621' }}>
                      {record.id}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => goToDetail(record.id)}
                      className="text-left hover:underline transition-all"
                      style={{ color: '#1890ff' }}
                    >
                      {record.title}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        color: statusConfig[record.status].color,
                        backgroundColor: statusConfig[record.status].bgColor,
                      }}
                    >
                      {statusConfig[record.status].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        color: priorityConfig[record.priority].color,
                        backgroundColor: priorityConfig[record.priority].bgColor,
                      }}
                    >
                      {priorityConfig[record.priority].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        color: genreConfig[record.genre].color,
                        backgroundColor: genreConfig[record.genre].bgColor,
                      }}
                    >
                      {genreConfig[record.genre].label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: '#4B3621' }}>
                    {typeLabels[record.req_type]}
                  </td>
                  <td className="px-4 py-3 text-sm truncate max-w-xs" style={{ color: '#4B3621' }}>
                    {record.products || '-'}
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: '#4B3621' }}>
                    {record.assignee ? (
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {record.assignee}
                      </span>
                    ) : (
                      <span style={{ color: '#8c8c8c' }}>未分配</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm" style={{ color: '#4B3621' }}>
                    {formatDate(record.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => goToDetail(record.id)}
                        className="flex items-center gap-1 text-sm hover:opacity-80 transition-opacity"
                        style={{ color: '#1890ff' }}
                      >
                        <Eye size={14} />
                        详情
                      </button>
                      <button
                        className="flex items-center gap-1 text-sm hover:opacity-80 transition-opacity"
                        style={{ color: '#1890ff' }}
                      >
                        <Edit2 size={14} />
                        编辑
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(record.id)}
                        className="flex items-center gap-1 text-sm hover:opacity-80 transition-opacity"
                        style={{ color: '#ff4d4f' }}
                      >
                        <Trash2 size={14} />
                        删除
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredRequirements.length === 0 && (
          <div className="py-12 text-center" style={{ color: '#8c8c8c' }}>
            暂无数据
          </div>
        )}
      </motion.div>

      {/* 新建需求弹窗 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: '#fff' }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold" style={{ color: '#4B3621', fontFamily: 'Noto Serif SC, serif' }}>
                新建需求
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X size={20} style={{ color: '#8c8c8c' }} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: '#4B3621' }}>
                  标题 <span style={{ color: '#ff4d4f' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="请输入需求标题"
                  className="w-full px-3 py-2 rounded border outline-none focus:ring-2"
                  style={{ borderColor: '#d9d9d9' }}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1" style={{ color: '#4B3621' }}>体裁</label>
                  <select
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value as any })}
                    className="w-full px-3 py-2 rounded border outline-none focus:ring-2"
                    style={{ borderColor: '#d9d9d9' }}
                  >
                    <option value="image_text">图文</option>
                    <option value="video">视频</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: '#4B3621' }}>类型</label>
                  <select
                    value={formData.req_type}
                    onChange={(e) => setFormData({ ...formData, req_type: e.target.value as any })}
                    className="w-full px-3 py-2 rounded border outline-none focus:ring-2"
                    style={{ borderColor: '#d9d9d9' }}
                  >
                    <option value="cooperation">合作</option>
                    <option value="soft_plant">软植</option>
                    <option value="collection">合集</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1" style={{ color: '#4B3621' }}>优先级</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-3 py-2 rounded border outline-none focus:ring-2"
                    style={{ borderColor: '#d9d9d9' }}
                  >
                    <option value="high">高</option>
                    <option value="medium">中</option>
                    <option value="low">低</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm mb-1" style={{ color: '#4B3621' }}>负责人</label>
                  <input
                    type="text"
                    value={formData.assignee}
                    onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                    placeholder="负责人姓名"
                    className="w-full px-3 py-2 rounded border outline-none focus:ring-2"
                    style={{ borderColor: '#d9d9d9' }}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-1" style={{ color: '#4B3621' }}>绑定产品</label>
                <input
                  type="text"
                  value={formData.products}
                  onChange={(e) => setFormData({ ...formData, products: e.target.value })}
                  placeholder="多个产品用逗号分隔"
                  className="w-full px-3 py-2 rounded border outline-none focus:ring-2"
                  style={{ borderColor: '#d9d9d9' }}
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1" style={{ color: '#4B3621' }}>描述</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="请输入需求描述"
                  rows={4}
                  className="w-full px-3 py-2 rounded border outline-none focus:ring-2 resize-none"
                  style={{ borderColor: '#d9d9d9' }}
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded border transition-all hover:bg-gray-50"
                style={{ borderColor: '#d9d9d9', color: '#4B3621' }}
              >
                取消
              </button>
              <button
                onClick={handleCreate}
                disabled={!formData.title}
                className="px-4 py-2 rounded text-white transition-all hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: '#4B3621' }}
              >
                创建
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* 删除确认弹窗 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg p-6 w-full max-w-sm"
            style={{ backgroundColor: '#fff' }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: '#4B3621' }}>
              确认删除
            </h3>
            <p className="mb-6" style={{ color: '#8c8c8c' }}>
              确定要删除这个需求吗？此操作不可撤销。
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 rounded border transition-all hover:bg-gray-50"
                style={{ borderColor: '#d9d9d9', color: '#4B3621' }}
              >
                取消
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-4 py-2 rounded text-white transition-all hover:opacity-90"
                style={{ backgroundColor: '#ff4d4f' }}
              >
                删除
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
