import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, MoreHorizontal, X, Check, ChevronDown, Eye, Clock } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

// 工作流节点类型
interface WorkflowNode {
  node_id: string;
  node_name: string;
  status: 'pending' | 'in_progress' | 'completed';
  completed_at?: string;
  assignee?: string;
  worktime?: number;
}

// 需求类型
interface Requirement {
  id: string;
  title: string;
  description: string;
  status: string;
  genre: 'image_text' | 'video';
  brand?: string;
  price?: number;
  rebate?: number;
  need_invoice?: boolean;
  need_gift?: boolean;
  need_soft_plant?: boolean;
  submission_date?: string;
}

// 工作流节点定义
const getWorkflowNodes = (genre: 'image_text' | 'video'): WorkflowNode[] => {
  const commonNodes = [
    { node_id: 'submission', node_name: '提报', status: 'completed' as const, completed_at: '2024-01-15' },
    { node_id: 'submission_review', node_name: '提报审批', status: 'completed' as const, completed_at: '2024-01-16' },
    { node_id: 'brand_order', node_name: '品牌下单', status: 'pending' as const },
    { node_id: 'confirm_order', node_name: '确认接单', status: 'pending' as const },
    { node_id: 'initial_review', node_name: '初稿审核', status: 'pending' as const },
    { node_id: 'upload', node_name: '上传平台', status: 'pending' as const },
    { node_id: 'publish', node_name: '正式发布', status: 'pending' as const },
  ];

  if (genre === 'image_text') {
    return [
      ...commonNodes.slice(0, 4),
      { node_id: 'outline_writing', node_name: '大纲撰写', status: 'in_progress' as const, worktime: 0 },
      { node_id: 'outline_review', node_name: '大纲审核', status: 'pending' as const },
      { node_id: 'shooting', node_name: '素材拍摄', status: 'pending' as const, worktime: 0 },
      { node_id: 'post_processing', node_name: '后期处理', status: 'pending' as const, worktime: 0 },
      ...commonNodes.slice(4),
    ];
  } else {
    return [
      ...commonNodes.slice(0, 4),
      { node_id: 'script_writing', node_name: '脚本编写', status: 'in_progress' as const, worktime: 0 },
      { node_id: 'script_review', node_name: '脚本审核', status: 'pending' as const },
      { node_id: 'shooting', node_name: '素材拍摄', status: 'pending' as const, worktime: 0 },
      { node_id: 'video_editing', node_name: '视频剪辑', status: 'pending' as const, worktime: 0 },
      ...commonNodes.slice(4),
    ];
  }
};

const statusColors: Record<string, { color: string; bgColor: string; label: string }> = {
  pending: { color: '#8c8c8c', bgColor: '#f5f5f5', label: '待处理' },
  in_progress: { color: '#faad14', bgColor: '#fffbe6', label: '进行中' },
  completed: { color: '#52c41a', bgColor: '#f6ffed', label: '已完成' },
};

export default function RequirementDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [requirement, setRequirement] = useState<Requirement | null>(null);
  const [workflowNodes, setWorkflowNodes] = useState<WorkflowNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [completingNode, setCompletingNode] = useState(false);
  const [cancelingNode, setCancelingNode] = useState(false);

  useEffect(() => {
    // 模拟加载需求数据
    const mockRequirement: Requirement = {
      id: id || 'REQ-001',
      title: '客厅改造内容创作',
      description: '拍摄客厅改造前后对比视频',
      status: 'in_progress',
      genre: 'video',
      brand: '某家居品牌',
      price: 5000,
      rebate: 10,
      need_invoice: true,
      need_gift: false,
      need_soft_plant: true,
      submission_date: '2024-01-15',
    };
    setRequirement(mockRequirement);
    setWorkflowNodes(getWorkflowNodes(mockRequirement.genre));
  }, [id]);

  const handleNodeClick = (node: WorkflowNode) => {
    setSelectedNode(node);
  };

  const canCompleteNode = (node: WorkflowNode): boolean => {
    const nodeIndex = workflowNodes.findIndex(n => n.node_id === node.node_id);
    // 检查所有前置节点是否已完成
    for (let i = 0; i < nodeIndex; i++) {
      if (workflowNodes[i].status !== 'completed') {
        return false;
      }
    }
    return true;
  };

  const getCannotCompleteReason = (node: WorkflowNode): string => {
    const nodeIndex = workflowNodes.findIndex(n => n.node_id === node.node_id);
    for (let i = 0; i < nodeIndex; i++) {
      if (workflowNodes[i].status !== 'completed') {
        return `请先完成前置节点: ${workflowNodes[i].node_name}`;
      }
    }
    return '';
  };

  const canCancelComplete = (node: WorkflowNode): boolean => {
    const nodeIndex = workflowNodes.findIndex(n => n.node_id === node.node_id);
    // 检查后续节点是否有已完成的
    for (let i = nodeIndex + 1; i < workflowNodes.length; i++) {
      if (workflowNodes[i].status === 'completed') {
        return false;
      }
    }
    return true;
  };

  const completeNode = async () => {
    if (!selectedNode) return;
    setCompletingNode(true);
    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedNodes = workflowNodes.map(node => {
      if (node.node_id === selectedNode.node_id) {
        return { ...node, status: 'completed' as const, completed_at: new Date().toISOString() };
      }
      // 设置下一个节点为进行中
      const nodeIndex = workflowNodes.findIndex(n => n.node_id === selectedNode.node_id);
      const currentIndex = workflowNodes.findIndex(n => n.node_id === node.node_id);
      if (currentIndex === nodeIndex + 1) {
        return { ...node, status: 'in_progress' as const };
      }
      return node;
    });
    
    setWorkflowNodes(updatedNodes);
    setSelectedNode({ ...selectedNode, status: 'completed', completed_at: new Date().toISOString() });
    setCompletingNode(false);
  };

  const cancelCompleteNode = async () => {
    if (!selectedNode) return;
    setCancelingNode(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedNodes = workflowNodes.map(node => {
      if (node.node_id === selectedNode.node_id) {
        return { ...node, status: 'in_progress' as const, completed_at: undefined };
      }
      // 将所有后续节点重置为pending
      const nodeIndex = workflowNodes.findIndex(n => n.node_id === selectedNode.node_id);
      const currentIndex = workflowNodes.findIndex(n => n.node_id === node.node_id);
      if (currentIndex > nodeIndex) {
        return { ...node, status: 'pending' as const };
      }
      return node;
    });
    
    setWorkflowNodes(updatedNodes);
    setSelectedNode({ ...selectedNode, status: 'in_progress', completed_at: undefined };
    setCancelingNode(false);
  };

  const viewOutlineDetail = () => {
    navigate(`/outline/${id}`);
  };

  const formatDate = (date?: string) => {
    if (!date) return '-';
    return date.split('T')[0];
  };

  if (!requirement) {
    return <div className="p-6">加载中...</div>;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f5' }}>
      {/* 顶部导航栏 */}
      <div className="px-6 py-4 flex justify-between items-center" style={{ backgroundColor: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <div className="flex items-center gap-4">
          <div 
            className="w-10 h-10 rounded flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: '#4B3621' }}
          >
            P0
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium" style={{ color: '#4B3621' }}>精准营销推荐引擎</span>
              <span 
                className="px-2 py-0.5 rounded text-xs"
                style={{ 
                  color: statusColors[requirement.status]?.color,
                  backgroundColor: statusColors[requirement.status]?.bgColor 
                }}
              >
                {requirement.title}
              </span>
              <span className="text-xs" style={{ color: '#8c8c8c' }}>已进行 2 小时</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded transition-colors" style={{ color: '#8c8c8c' }}>
            <Copy size={16} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded transition-colors" style={{ color: '#8c8c8c' }}>
            <MoreHorizontal size={16} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded transition-colors" style={{ color: '#8c8c8c' }}>
            <X size={16} />
          </button>
        </div>
      </div>

      {/* 工作流区域 */}
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg p-6 mb-6"
          style={{ backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
        >
          <h3 className="text-lg font-bold mb-4" style={{ color: '#4B3621', fontFamily: 'Noto Serif SC, serif' }}>
            工作流程
          </h3>
          <div className="flex flex-wrap gap-4">
            {workflowNodes.map((node, index) => (
              <motion.div
                key={node.node_id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleNodeClick(node)}
                className="relative cursor-pointer"
              >
                <div
                  className="px-4 py-3 rounded-lg border-2 transition-all hover:shadow-md"
                  style={{
                    backgroundColor: node.status === 'completed' ? '#f6ffed' : 
                                    node.status === 'in_progress' ? '#fffbe6' : '#f5f5f5',
                    borderColor: node.status === 'completed' ? '#52c41a' : 
                                 node.status === 'in_progress' ? '#faad14' : '#d9d9d9',
                    minWidth: '120px',
                  }}
                >
                  <div className="text-sm font-medium" style={{ color: '#4B3621' }}>
                    {node.node_name}
                  </div>
                  <div className="text-xs mt-1" style={{ color: '#8c8c8c' }}>
                    {statusColors[node.status].label}
                  </div>
                  {node.completed_at && (
                    <div className="text-xs mt-1" style={{ color: '#8c8c8c' }}>
                      {formatDate(node.completed_at)}
                    </div>
                  )}
                </div>
                {index < workflowNodes.length - 1 && (
                  <div 
                    className="absolute top-1/2 -right-3 w-4 h-0.5"
                    style={{ backgroundColor: '#d9d9d9' }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 节点详情面板 */}
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg overflow-hidden"
            style={{ backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            {/* 面板头部 */}
            <div className="px-6 py-4 flex justify-between items-center" style={{ backgroundColor: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
              <div className="flex items-center gap-2">
                <ChevronDown size={18} style={{ color: '#8c8c8c' }} />
                <span className="font-medium" style={{ color: '#4B3621' }}>{selectedNode.node_name}</span>
                <span
                  className="px-2 py-0.5 rounded text-xs"
                  style={{
                    color: statusColors[selectedNode.status].color,
                    backgroundColor: statusColors[selectedNode.status].bgColor,
                  }}
                >
                  {statusColors[selectedNode.status].label}
                </span>
              </div>
              <div className="flex gap-2">
                {selectedNode.status === 'completed' && (
                  <button
                    onClick={cancelCompleteNode}
                    disabled={!canCancelComplete(selectedNode) || cancelingNode}
                    className="px-3 py-1.5 rounded text-sm border transition-all disabled:opacity-50"
                    style={{ borderColor: '#d9d9d9', color: '#4B3621' }}
                    title={!canCancelComplete(selectedNode) ? '后续节点已完成，无法取消' : ''}
                  >
                    {cancelingNode ? '取消中...' : '取消完成'}
                  </button>
                )}
                <button
                  onClick={completeNode}
                  disabled={!canCompleteNode(selectedNode) || selectedNode.status === 'completed' || completingNode}
                  className="px-3 py-1.5 rounded text-sm text-white transition-all disabled:opacity-50"
                  style={{ backgroundColor: '#4B3621' }}
                  title={getCannotCompleteReason(selectedNode)}
                >
                  {completingNode ? '完成中...' : selectedNode.status === 'completed' ? '已完成' : '完成节点'}
                </button>
              </div>
            </div>

            {/* 大纲审核节点 - 查看大纲详情按钮 */}
            {selectedNode.node_id === 'outline_review' && (
              <div className="p-6 border-b" style={{ borderColor: '#f0f0f0' }}>
                <div className="flex items-center gap-2 mb-4">
                  <ChevronDown size={18} style={{ color: '#8c8c8c' }} />
                  <span className="font-medium" style={{ color: '#4B3621' }}>大纲审核</span>
                </div>
                <button
                  onClick={viewOutlineDetail}
                  className="flex items-center gap-2 px-4 py-2 rounded text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: '#4B3621' }}
                >
                  <Eye size={16} />
                  查看大纲详情
                </button>
              </div>
            )}

            {/* 提报节点表单 */}
            {selectedNode.node_id === 'submission' && (
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1" style={{ color: '#4B3621' }}>合作品牌</label>
                    <input
                      type="text"
                      defaultValue={requirement.brand}
                      className="w-full px-3 py-2 rounded border"
                      style={{ borderColor: '#d9d9d9' }}
                      placeholder="请输入合作品牌"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" style={{ color: '#4B3621' }}>价格</label>
                    <input
                      type="number"
                      defaultValue={requirement.price}
                      className="w-full px-3 py-2 rounded border"
                      style={{ borderColor: '#d9d9d9' }}
                      placeholder="请输入价格"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" style={{ color: '#4B3621' }}>返点 (%)</label>
                    <input
                      type="number"
                      defaultValue={requirement.rebate}
                      className="w-full px-3 py-2 rounded border"
                      style={{ borderColor: '#d9d9d9' }}
                      placeholder="请输入返点比例"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" style={{ color: '#4B3621' }}>提报时间</label>
                    <input
                      type="date"
                      defaultValue={requirement.submission_date}
                      className="w-full px-3 py-2 rounded border"
                      style={{ borderColor: '#d9d9d9' }}
                    />
                  </div>
                </div>
                <div className="flex gap-6 mt-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked={requirement.need_invoice} />
                    <span className="text-sm" style={{ color: '#4B3621' }}>是否开票</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked={requirement.need_gift} />
                    <span className="text-sm" style={{ color: '#4B3621' }}>是否送品</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked={requirement.need_soft_plant} />
                    <span className="text-sm" style={{ color: '#4B3621' }}>是否需要赠送软植</span>
                  </label>
                </div>
              </div>
            )}

            {/* 工时模块 - 仅特定节点显示 */}
            {['outline_writing', 'script_writing', 'shooting', 'post_processing', 'video_editing'].includes(selectedNode.node_id) && (
              <div className="p-6 border-t" style={{ borderColor: '#f0f0f0' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} style={{ color: '#8c8c8c' }} />
                  <span className="font-medium" style={{ color: '#4B3621' }}>工时记录</span>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <label className="block text-sm mb-1" style={{ color: '#4B3621' }}>工时 (小时)</label>
                    <input
                      type="number"
                      defaultValue={selectedNode.worktime || 0}
                      className="px-3 py-2 rounded border"
                      style={{ borderColor: '#d9d9d9', width: '120px' }}
                      placeholder="0"
                    />
                  </div>
                  <button
                    className="px-4 py-2 rounded text-white transition-all hover:opacity-90 mt-6"
                    style={{ backgroundColor: '#4B3621' }}
                  >
                    保存工时
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
