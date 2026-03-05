import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Copy, Phone, Mail, MessageCircle, X, Plus, Check } from 'lucide-react';
import { useParams } from 'react-router-dom';

// 批注类型
interface Annotation {
  id: string;
  targetId: string;
  targetType: 'title' | 'content' | 'hashtag' | 'image';
  content: string;
  createdAt: string;
}

// 图片类型
interface OutlineImage {
  id: string;
  url: string;
  comment?: string;
  annotation?: string;
}

// 大纲数据类型
interface OutlineData {
  title: string;
  alternativeTitles: string[];
  content: string;
  hashtags: string[];
  images: OutlineImage[];
}

export default function OutlineDetail() {
  const { id } = useParams<{ id: string }>();
  const [showBloggerCard, setShowBloggerCard] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [showAnnotationInput, setShowAnnotationInput] = useState<{ targetId: string; targetType: string } | null>(null);
  const [annotationInput, setAnnotationInput] = useState('');
  const [editingAnnotation, setEditingAnnotation] = useState<string | null>(null);
  const [editInput, setEditInput] = useState('');
  const [highlightedImage, setHighlightedImage] = useState<string | null>(null);
  const [newHashtagInput, setNewHashtagInput] = useState('');
  const [showNewHashtagInput, setShowNewHashtagInput] = useState(false);
  
  // 大纲数据
  const [outline, setOutline] = useState<OutlineData>({
    title: '用审美点亮每一个日常：120㎡轻复古风小屋改造全记录',
    alternativeTitles: [
      '自装120㎡轻复古风，我把日子过成了诗',
      '从毛坯到 dream house，我的装修避坑指南',
    ],
    content: `大家好，我是车车Home！

今天想和大家分享我的120㎡轻复古风小屋改造全过程。

🏠 关于房子
- 面积：建面120㎡，套内98㎡
- 户型：三室两厅两卫
- 风格：轻复古法式风

🎨 设计理念
我一直相信，家不只是一个居住的空间，更是生活态度的体现。轻复古风格既有法式的优雅浪漫，又不会过于繁复，非常适合现代都市生活。

📸 改造亮点
1. 客厅：奶油色墙面搭配复古家具，营造温馨氛围
2. 卧室：暖色调软装，打造舒适睡眠空间
3. 厨房：开放式设计，增加空间通透感

💡 软装心得
- 色彩搭配：以奶油色、棕色为主，点缀金色元素
- 家具选择：复古造型+现代舒适度
- 灯光设计：多层次照明，营造氛围感

希望我的分享能给正在装修的你一些灵感！`,
    hashtags: ['装修', '复古风', '家居', '软装', '客厅改造', '卧室设计'],
    images: [
      { id: 'img1', url: '/客厅.jpg', comment: '客厅全景' },
      { id: 'img2', url: '/餐边柜.jpg', comment: '餐边柜细节' },
      { id: 'img3', url: '/厨房.jpg' },
      { id: 'img4', url: '/卫生间.jpg', comment: '卫生间干湿分离' },
      { id: 'img5', url: '/卧室.jpg' },
      { id: 'img6', url: '/书房.jpg', comment: '书房一角' },
    ],
  });

  const [originalHashtagCount] = useState(outline.hashtags.length);

  const copyContact = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`已复制: ${text}`);
  };

  const handleTitleClick = (index: number) => {
    if (index === 0) return; // 主标题不处理
    const newAlternativeTitles = [...outline.alternativeTitles];
    const clickedTitle = newAlternativeTitles[index - 1];
    newAlternativeTitles[index - 1] = outline.title;
    setOutline({ ...outline, title: clickedTitle, alternativeTitles: newAlternativeTitles });
    // 清空标题相关的批注
    setAnnotations(annotations.filter(a => a.targetType !== 'title'));
  };

  const handleTextSelection = (targetId: string, targetType: 'title' | 'content') => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      setShowAnnotationInput({ targetId, targetType });
      setSelectedAnnotation(null);
    }
  };

  const addAnnotation = () => {
    if (!annotationInput.trim() || !showAnnotationInput) return;
    
    const newAnnotation: Annotation = {
      id: Date.now().toString(),
      targetId: showAnnotationInput.targetId,
      targetType: showAnnotationInput.targetType as any,
      content: annotationInput,
      createdAt: new Date().toISOString(),
    };
    
    setAnnotations([...annotations, newAnnotation]);
    setAnnotationInput('');
    setShowAnnotationInput(null);
    setSelectedAnnotation(newAnnotation.id);
  };

  const startEditAnnotation = (annotation: Annotation) => {
    setEditingAnnotation(annotation.id);
    setEditInput(annotation.content);
  };

  const saveEditAnnotation = () => {
    if (!editInput.trim()) return;
    setAnnotations(annotations.map(a => 
      a.id === editingAnnotation ? { ...a, content: editInput } : a
    ));
    setEditingAnnotation(null);
    setEditInput('');
  };

  const deleteAnnotation = (id: string) => {
    setAnnotations(annotations.filter(a => a.id !== id));
    if (selectedAnnotation === id) setSelectedAnnotation(null);
  };

  const handlePageClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.annotation-panel') || 
        (e.target as HTMLElement).closest('.annotated-text') ||
        (e.target as HTMLElement).closest('.annotation-input-modal')) return;
    setSelectedAnnotation(null);
    setShowAnnotationInput(null);
    setHighlightedImage(null);
  };

  const addHashtag = () => {
    if (!newHashtagInput.trim()) return;
    const tag = newHashtagInput.startsWith('#') ? newHashtagInput : `#${newHashtagInput}`;
    setOutline({ ...outline, hashtags: [...outline.hashtags, tag] });
    setNewHashtagInput('');
    setShowNewHashtagInput(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f5f5' }} onClick={handlePageClick}>
      {/* 页面标头 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ 
          backgroundColor: 'rgba(245, 245, 220, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(75, 54, 33, 0.1)',
          height: '80px',
        }}
      >
        {/* 左侧博主信息 */}
        <div 
          className="relative"
          onMouseEnter={() => setShowBloggerCard(true)}
          onMouseLeave={() => setShowBloggerCard(false)}
        >
          <a 
            href="https://www.xiaohongshu.com/user/profile/682b5d95000000000e01e2eb"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src="/avata.webp" 
              alt="车车Home" 
              className="w-10 h-10 rounded-full object-cover"
              style={{ border: '2px solid #4B3621' }}
            />
            <span className="font-medium" style={{ color: '#4B3621', fontFamily: 'Noto Serif SC, serif' }}>
              车车Home
            </span>
          </a>

          {/* 博主信息卡片 */}
          <AnimatePresence>
            {showBloggerCard && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-80 rounded-xl overflow-hidden shadow-2xl"
                style={{ backgroundColor: '#fff' }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* 头部 */}
                <div className="p-5 flex gap-4" style={{ backgroundColor: '#F5F5DC' }}>
                  <img 
                    src="/avata.webp" 
                    alt="车车Home" 
                    className="w-16 h-16 rounded-full object-cover"
                    style={{ border: '3px solid #4B3621' }}
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg" style={{ color: '#4B3621', fontFamily: 'Noto Serif SC, serif' }}>
                      车车Home
                    </h3>
                    <p className="text-sm mt-1" style={{ color: '#8B7355' }}>家居博主 · 分享美好生活</p>
                    <div className="flex gap-3 mt-3">
                      <a 
                        href="https://www.xiaohongshu.com/user/profile/682b5d95000000000e01e2eb"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded flex items-center justify-center transition-transform hover:scale-110"
                        style={{ backgroundColor: '#ff2442' }}
                      >
                        <img src="/xiaohongshu.png" alt="小红书" className="w-4 h-4" />
                      </a>
                      <a 
                        href="https://www.douyin.com/user/MS4wLjABAAAAMxZyvrW3HPElgbQcJArwcH_K5osAEQxhLGng2F-TgMKx-S550GX5TK0B7cvTP5tX"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded flex items-center justify-center transition-transform hover:scale-110"
                        style={{ backgroundColor: '#000' }}
                      >
                        <img src="/douyin.png" alt="抖音" className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* 标签 */}
                <div className="p-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: '#F5F5DC', color: '#4B3621' }}>
                    🏠 120㎡轻复古风
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: '#F5F5DC', color: '#4B3621' }}>
                    🎨 软装分享
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: '#F5F5DC', color: '#4B3621' }}>
                    🛋️ 家居好物
                  </span>
                </div>

                {/* 联系方式 */}
                <div className="px-4 pb-4 space-y-2">
                  <div 
                    onClick={() => copyContact('nice2meet26677')}
                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    style={{ backgroundColor: '#f9f9f9' }}
                  >
                    <MessageCircle size={18} style={{ color: '#4B3621' }} />
                    <span className="flex-1 text-sm" style={{ color: '#4B3621' }}>nice2meet26677</span>
                    <Copy size={14} style={{ color: '#8B7355' }} />
                  </div>
                  <div 
                    onClick={() => copyContact('13188880405')}
                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    style={{ backgroundColor: '#f9f9f9' }}
                  >
                    <Phone size={18} style={{ color: '#4B3621' }} />
                    <span className="flex-1 text-sm" style={{ color: '#4B3621' }}>13188880405</span>
                    <Copy size={14} style={{ color: '#8B7355' }} />
                  </div>
                  <div 
                    onClick={() => copyContact('chechehome@qq.com')}
                    className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    style={{ backgroundColor: '#f9f9f9' }}
                  >
                    <Mail size={18} style={{ color: '#4B3621' }} />
                    <span className="flex-1 text-sm" style={{ color: '#4B3621' }}>chechehome@qq.com</span>
                    <Copy size={14} style={{ color: '#8B7355' }} />
                  </div>
                </div>

                {/* 合作指南 */}
                <a 
                  href="/profile"
                  className="block p-4 text-center text-sm font-medium border-t transition-colors hover:bg-gray-50"
                  style={{ color: '#4B3621', borderColor: '#f0f0f0' }}
                >
                  合作指南 <ArrowRight size={14} className="inline ml-1" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 中间标题 */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
          <span className="text-lg" style={{ color: '#4B3621', fontFamily: 'Noto Serif SC, serif' }}>
            客厅改造内容创作 x 车车Home 视频脚本
          </span>
        </div>

        {/* 右侧占位 */}
        <div className="w-24"></div>
      </motion.div>

      {/* 主内容区 */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto flex gap-8">
          {/* 左侧内容 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            {/* 标题区域 */}
            <div className="mb-8">
              <h1 
                className="text-2xl font-bold mb-4 leading-relaxed annotated-text"
                style={{ color: '#4B3621', fontFamily: 'Noto Serif SC, serif' }}
                onMouseUp={() => handleTextSelection('main-title', 'title')}
                title="选中内容以批注"
              >
                {outline.title}
              </h1>
              
              {/* 备选标题 */}
              <div className="space-y-2 mt-4">
                {outline.alternativeTitles.map((title, index) => (
                  <button
                    key={index}
                    onClick={() => handleTitleClick(index + 1)}
                    className="block text-left w-full p-3 rounded-lg border border-dashed transition-all hover:bg-gray-50"
                    style={{ borderColor: '#d9d9d9', color: '#8B7355' }}
                  >
                    <span className="text-xs mr-2" style={{ color: '#8c8c8c' }}>备选标题{index + 1}:</span>
                    {title}
                  </button>
                ))}
              </div>
            </div>

            {/* 正文 */}
            <div 
              className="mb-8 annotated-text"
              onMouseUp={() => handleTextSelection('main-content', 'content')}
            >
              <h2 className="text-lg font-bold mb-4" style={{ color: '#4B3621', fontFamily: 'Noto Serif SC, serif' }}>
                正文
              </h2>
              <div 
                className="whitespace-pre-wrap leading-relaxed"
                style={{ color: '#4B3621', lineHeight: '1.8' }}
                title="选中内容以批注"
              >
                {outline.content}
              </div>
            </div>

            {/* 标签 */}
            <div className="mb-8">
              <h2 className="text-lg font-bold mb-4" style={{ color: '#4B3621', fontFamily: 'Noto Serif SC, serif' }}>
                标签
              </h2>
              <div className="flex flex-wrap gap-2">
                {outline.hashtags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full text-sm cursor-pointer transition-all hover:opacity-80"
                    style={{ 
                      backgroundColor: index >= originalHashtagCount ? '#f0f0f0' : '#F5F5DC',
                      color: '#4B3621',
                      border: index >= originalHashtagCount ? '1px dashed #8B7355' : 'none',
                      textDecoration: index >= originalHashtagCount ? 'underline dashed #8B7355' : 'none',
                    }}
                    onClick={() => {
                      setSelectedAnnotation(null);
                      setShowAnnotationInput({ targetId: `hashtag-${index}`, targetType: 'hashtag' });
                    }}
                    title="点击添加批注"
                  >
                    {tag}
                  </span>
                ))}
                <button
                  onClick={() => setShowNewHashtagInput(true)}
                  className="px-3 py-1.5 rounded-full text-sm border border-dashed transition-all hover:bg-gray-50"
                  style={{ borderColor: '#8B7355', color: '#8B7355' }}
                >
                  <Plus size={14} className="inline mr-1" />
                  添加标签
                </button>
              </div>
              
              {showNewHashtagInput && (
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={newHashtagInput}
                    onChange={(e) => setNewHashtagInput(e.target.value)}
                    placeholder="输入标签（自动添加#）"
                    className="px-3 py-2 rounded border text-sm"
                    style={{ borderColor: '#d9d9d9' }}
                    onKeyPress={(e) => e.key === 'Enter' && addHashtag()}
                  />
                  <button
                    onClick={addHashtag}
                    className="px-3 py-2 rounded text-white text-sm"
                    style={{ backgroundColor: '#4B3621' }}
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={() => setShowNewHashtagInput(false)}
                    className="px-3 py-2 rounded border text-sm"
                    style={{ borderColor: '#d9d9d9', color: '#4B3621' }}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* 图片 */}
            <div>
              <h2 className="text-lg font-bold mb-4" style={{ color: '#4B3621', fontFamily: 'Noto Serif SC, serif' }}>
                配图
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {outline.images.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative group cursor-pointer rounded-lg overflow-hidden ${
                      highlightedImage === image.id ? 'ring-2 ring-yellow-400' : ''
                    } ${annotations.some(a => a.targetId === image.id) ? 'ring-2 ring-yellow-400 ring-dashed' : ''}`}
                    onClick={() => {
                      setHighlightedImage(image.id);
                      setSelectedAnnotation(null);
                      setShowAnnotationInput({ targetId: image.id, targetType: 'image' });
                    }}
                  >
                    <img
                      src={image.url}
                      alt={`图片${index + 1}`}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all" />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                      <p className="text-white text-sm">
                        图片{index + 1}{image.comment ? `：${image.comment}` : ''}
                      </p>
                    </div>
                    {annotations.some(a => a.targetId === image.id) && (
                      <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-yellow-400" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 右侧批注面板 */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-80 annotation-panel"
          >
            <div 
              className="sticky top-24 rounded-lg p-4"
              style={{ backgroundColor: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: '#4B3621', fontFamily: 'Noto Serif SC, serif' }}>
                批注
              </h3>
              
              {annotations.length === 0 ? (
                <p className="text-sm" style={{ color: '#8c8c8c' }}>
                  暂无批注，选中文本或点击图片添加批注
                </p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {annotations.map((annotation) => (
                    <motion.div
                      key={annotation.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedAnnotation === annotation.id 
                          ? 'ring-2' 
                          : 'hover:bg-gray-50'
                      }`}
                      style={{ 
                        backgroundColor: selectedAnnotation === annotation.id ? '#fffbe6' : '#f9f9f9',
                        borderLeft: '3px solid #faad14',
                      }}
                      onClick={() => setSelectedAnnotation(annotation.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs" style={{ color: '#8c8c8c' }}>
                          {annotation.targetType === 'title' ? '标题' :
                           annotation.targetType === 'content' ? '正文' :
                           annotation.targetType === 'hashtag' ? '标签' : '图片'}
                        </span>
                        <div className="flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditAnnotation(annotation);
                            }}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <Edit2 size={12} style={{ color: '#8c8c8c' }} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteAnnotation(annotation.id);
                            }}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <X size={12} style={{ color: '#8c8c8c' }} />
                          </button>
                        </div>
                      </div>
                      
                      {editingAnnotation === annotation.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={editInput}
                            onChange={(e) => setEditInput(e.target.value)}
                            className="w-full px-2 py-1 rounded border text-sm"
                            style={{ borderColor: '#d9d9d9' }}
                            rows={3}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                saveEditAnnotation();
                              }}
                              className="px-2 py-1 rounded text-xs text-white"
                              style={{ backgroundColor: '#4B3621' }}
                            >
                              保存
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingAnnotation(null);
                              }}
                              className="px-2 py-1 rounded text-xs border"
                              style={{ borderColor: '#d9d9d9' }}
                            >
                              取消
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm" style={{ color: '#4B3621' }}>{annotation.content}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 批注输入弹窗 */}
      {showAnnotationInput && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 annotation-input-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-lg p-6 w-full max-w-md"
            style={{ backgroundColor: '#fff' }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: '#4B3621' }}>
              添加批注
            </h3>
            <textarea
              value={annotationInput}
              onChange={(e) => setAnnotationInput(e.target.value)}
              placeholder="请输入批注内容..."
              rows={4}
              className="w-full px-3 py-2 rounded border resize-none"
              style={{ borderColor: '#d9d9d9' }}
              autoFocus
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setShowAnnotationInput(null);
                  setAnnotationInput('');
                }}
                className="px-4 py-2 rounded border transition-all hover:bg-gray-50"
                style={{ borderColor: '#d9d9d9', color: '#4B3621' }}
              >
                取消
              </button>
              <button
                onClick={addAnnotation}
                disabled={!annotationInput.trim()}
                className="px-4 py-2 rounded text-white transition-all disabled:opacity-50"
                style={{ backgroundColor: '#4B3621' }}
              >
                添加
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
