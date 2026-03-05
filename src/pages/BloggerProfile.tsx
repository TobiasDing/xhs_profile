import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Phone, Mail, MessageCircle, X, Users, Heart, ArrowDown } from 'lucide-react';

const navItems = [
  { key: 'hero', label: '首页' },
  { key: 'about', label: '关于' },
  { key: 'cabinet', label: '餐边柜' },
  { key: 'kitchen', label: '厨房' },
  { key: 'bathroom', label: '卫生间' },
  { key: 'contact', label: '联系' },
];

const tags = ['#法式复古', '#智能家居', '#咖啡美食', '#软装分享', '#生活美学'];

// 作品集数据
const portfolioItems = [
  { key: 'cabinet', src: '/餐边柜 .jpg', alt: '餐边柜', title: '复古餐边柜', desc: '法式复古风格的收纳美学' },
  { key: 'bathroom', src: '/卫生间.jpg', alt: '卫生间', title: '轻复古卫生间', desc: '奶油色调的私密空间' },
  { key: 'living', src: '/客厅.jpg', alt: '客厅', title: '奶油风客厅', desc: '120㎡轻复古风小屋的核心' },
];

export default function BloggerProfile() {
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredNav, setHoveredNav] = useState('');
  const [pageLoaded, setPageLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // 检测当前所在区域
      const sections = navItems.map(item => item.key);
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    setTimeout(() => setPageLoaded(true), 100);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (key: string) => {
    const element = document.getElementById(key);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(key);
      setShowMobileMenu(false);
    }
  };

  // 联系方式组件
  const ContactInfo = ({ variant = 'dark', showText = true }: { variant?: 'dark' | 'light', showText?: boolean }) => {
    const isDark = variant === 'dark';
    return (
      <div className={`flex ${showText ? 'flex-col gap-2.5' : 'flex-row gap-4'}`}>
        <div 
          className="flex items-center gap-2 text-xs"
          style={{ color: isDark ? 'rgba(245, 245, 220, 0.7)' : '#8B7355' }}
        >
          <Phone size={13} />
          {showText && <span>131-8888-0405</span>}
        </div>
        <div 
          className="flex items-center gap-2 text-xs"
          style={{ color: isDark ? 'rgba(245, 245, 220, 0.7)' : '#8B7355' }}
        >
          <Mail size={13} />
          {showText && <span>chechehome@qq.com</span>}
        </div>
        <div 
          className="flex items-center gap-2 text-xs"
          style={{ color: isDark ? 'rgba(245, 245, 220, 0.7)' : '#8B7355' }}
        >
          <MessageCircle size={13} />
          {showText && <span>nice2meet26677</span>}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F5DC' }}>
      {/* Mobile Header */}
      {isMobile && (
        <motion.div
          initial={{ y: -56 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 h-14 z-50 flex items-center justify-between px-5"
          style={{ 
            backgroundColor: scrollY > 50 ? 'rgba(245, 245, 220, 0.95)' : '#F5F5DC',
            backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none',
            borderBottom: '1px solid rgba(75, 54, 33, 0.06)'
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border flex-shrink-0" style={{ borderColor: 'rgba(75, 54, 33, 0.1)' }}>
              <img src="/avata.webp" alt="车车Home" className="w-full h-full object-cover" />
            </div>
            <span style={{ color: '#4B3621', fontFamily: "'Noto Serif SC', serif" }} className="font-medium text-sm">车车Home</span>
          </div>
          <button
            onClick={() => setShowMobileMenu(true)}
            className="w-10 h-10 flex items-center justify-center"
            style={{ color: '#4B3621' }}
          >
            <Menu size={22} />
          </button>
        </motion.div>
      )}

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {showMobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileMenu(false)}
              className="fixed inset-0 bg-black/20 z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 z-50 p-8"
              style={{ backgroundColor: '#F5F5DC' }}
            >
              <button
                onClick={() => setShowMobileMenu(false)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center"
                style={{ color: '#4B3621' }}
              >
                <X size={22} />
              </button>
              
              <div className="flex items-center gap-4 mb-10 mt-4">
                <div className="w-14 h-14 rounded-full overflow-hidden">
                  <img src="/avata.webp" alt="车车Home" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div style={{ color: '#4B3621', fontFamily: "'Noto Serif SC', serif" }} className="font-semibold">车车Home</div>
                  <div style={{ color: '#8B7355' }} className="text-sm">家居博主</div>
                </div>
              </div>

              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => scrollToSection(item.key)}
                    className="text-left py-3 text-base transition-colors"
                    style={{ 
                      color: activeSection === item.key ? '#8B7355' : '#4B3621',
                      fontFamily: "'Noto Serif SC', serif"
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="mt-10 pt-6" style={{ borderTop: '1px solid rgba(75, 54, 33, 0.08)' }}>
                <ContactInfo variant="light" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* PC Layout - Scrollable */}
      {!isMobile && (
        <>
          {/* Fixed Left Sidebar */}
          <motion.aside
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed left-0 top-0 bottom-0 w-[10%] min-w-[100px] flex flex-col items-center py-8 z-40"
            style={{ 
              backgroundColor: scrollY > 100 ? 'rgba(245, 245, 220, 0.95)' : '#F5F5DC',
              backdropFilter: scrollY > 100 ? 'blur(10px)' : 'none',
              borderRight: '1px solid rgba(75, 54, 33, 0.04)'
            }}
          >
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-11 h-11 rounded-full overflow-hidden mb-10 cursor-pointer"
              style={{ boxShadow: '0 2px 8px rgba(75, 54, 33, 0.08)' }}
              onClick={() => scrollToSection('hero')}
            >
              <img src="/avata.webp" alt="车车Home" className="w-full h-full object-cover" />
            </motion.div>

            {/* Vertical Navigation */}
            <nav className="flex flex-col gap-5 flex-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  onClick={() => scrollToSection(item.key)}
                  className="group relative py-2"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                >
                  <span 
                    className="text-xs tracking-[0.3em] transition-colors duration-300"
                    style={{ 
                      color: (activeSection === item.key) ? '#8B7355' : '#4B3621',
                      fontFamily: "'Noto Serif SC', serif"
                    }}
                  >
                    {item.label}
                  </span>
                  <span 
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-px transition-all duration-300"
                    style={{ 
                      backgroundColor: '#8B7355',
                      height: (activeSection === item.key) ? '16px' : '0px'
                    }}
                  />
                </motion.button>
              ))}
            </nav>

            {/* Contact Info - Bottom Icons Only */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-auto pt-6 flex flex-col gap-3"
              style={{ borderTop: '1px solid rgba(75, 54, 33, 0.06)' }}
            >
              <Phone size={14} style={{ color: '#8B7355' }} />
              <Mail size={14} style={{ color: '#8B7355' }} />
              <MessageCircle size={14} style={{ color: '#8B7355' }} />
            </motion.div>
          </motion.aside>

          {/* Main Content - Scrollable */}
          <main className="ml-[10%]">
            {/* Hero Section */}
            <section 
              id="hero"
              className="min-h-screen flex"
              style={{ backgroundColor: '#F5F5DC' }}
            >
              {/* Left: Profile Info - 35% */}
              <div className="w-[35%] flex flex-col" style={{ backgroundColor: '#4B3621' }}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="flex-1 flex flex-col p-10 lg:p-12"
                >
                  {/* Name */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl lg:text-5xl mb-6"
                    style={{ 
                      color: '#F5F5DC',
                      fontFamily: "'Noto Serif SC', 'Playfair Display', serif",
                      letterSpacing: '0.06em'
                    }}
                  >
                    车车Home
                  </motion.h1>

                  {/* Bio */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2 mb-6"
                  >
                    <p style={{ color: 'rgba(245, 245, 220, 0.6)' }} className="text-sm tracking-wider">
                      Home | 自装120㎡的轻复古风小屋
                    </p>
                    <p style={{ color: 'rgba(245, 245, 220, 0.6)' }} className="text-sm tracking-wider">
                      Share | 装修设计·软装分享·家居好物
                    </p>
                  </motion.div>

                  {/* Quote */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-base leading-relaxed mb-8 italic"
                    style={{ color: 'rgba(245, 245, 220, 0.7)' }}
                  >
                    不只是装修，是在庸常的生活里，构筑理想的乌托邦。
                  </motion.p>

                  {/* Stats Cards - Glassmorphism */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-4 mb-8"
                  >
                    {/* Xiaohongshu */}
                    <div 
                      className="flex items-center gap-4 p-4 rounded-xl"
                      style={{ 
                        backgroundColor: 'rgba(245, 245, 220, 0.03)',
                        border: '1px solid rgba(245, 245, 220, 0.08)',
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#ff2442' }}
                      >
                        <img src="/xiaohongshu.png" alt="小红书" className="w-5 h-5 object-contain" />
                      </div>
                      <div className="flex-1 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Users size={14} style={{ color: 'rgba(245, 245, 220, 0.4)' }} />
                          <span style={{ color: '#F5F5DC', fontFamily: "'Noto Serif SC', serif" }} className="text-xl">5,547</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart size={14} style={{ color: 'rgba(245, 245, 220, 0.4)' }} />
                          <span style={{ color: '#F5F5DC', fontFamily: "'Noto Serif SC', serif" }} className="text-xl">14.5万</span>
                        </div>
                      </div>
                    </div>

                    {/* Douyin */}
                    <div 
                      className="flex items-center gap-4 p-4 rounded-xl"
                      style={{ 
                        backgroundColor: 'rgba(245, 245, 220, 0.03)',
                        border: '1px solid rgba(245, 245, 220, 0.08)',
                        backdropFilter: 'blur(4px)'
                      }}
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#000' }}
                      >
                        <img src="/douyin.png" alt="抖音" className="w-5 h-5 object-contain" />
                      </div>
                      <div className="flex-1 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Users size={14} style={{ color: 'rgba(245, 245, 220, 0.4)' }} />
                          <span style={{ color: '#F5F5DC', fontFamily: "'Noto Serif SC', serif" }} className="text-xl">9,000</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Heart size={14} style={{ color: 'rgba(245, 245, 220, 0.4)' }} />
                          <span style={{ color: '#F5F5DC', fontFamily: "'Noto Serif SC', serif" }} className="text-xl">10.9万</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Audience Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 w-fit"
                    style={{ 
                      backgroundColor: 'rgba(212, 165, 116, 0.1)',
                      border: '1px solid rgba(212, 165, 116, 0.2)'
                    }}
                  >
                    <span style={{ color: '#D4A574' }} className="text-sm">✦</span>
                    <span style={{ color: '#D4A574' }} className="text-sm tracking-wide">95% 女性受众</span>
                  </motion.div>

                  {/* Tags */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-wrap gap-2 mb-auto"
                  >
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full text-xs"
                        style={{ 
                          backgroundColor: 'rgba(245, 245, 220, 0.06)',
                          color: 'rgba(245, 245, 220, 0.8)',
                          border: '1px solid rgba(245, 245, 220, 0.1)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  {/* Contact Info */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="mt-8 pt-6"
                    style={{ borderTop: '1px solid rgba(245, 245, 220, 0.08)' }}
                  >
                    <ContactInfo variant="dark" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Right: Hero Image - 55% */}
              <div 
                className="flex-1 relative flex items-center justify-center p-12 lg:p-16"
                style={{ backgroundColor: '#EDE5D8' }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <img
                    src="/客厅.jpg"
                    alt="客厅"
                    className="max-w-full max-h-[70vh] object-contain"
                    style={{ 
                      filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.12))'
                    }}
                  />
                </motion.div>

                {/* Staircase Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: pageLoaded ? 1 : 0, y: pageLoaded ? 0 : 30 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="absolute bottom-12 right-12"
                >
                  <div className="flex flex-col items-start">
                    <div 
                      className="text-lg mb-1"
                      style={{ 
                        color: '#4B3621',
                        fontFamily: "'Noto Serif SC', 'Playfair Display', serif",
                        letterSpacing: '0.2em',
                        opacity: 0.8
                      }}
                    >
                      用审美
                    </div>
                    <div 
                      className="text-2xl"
                      style={{ 
                        color: '#4B3621',
                        fontFamily: "'Noto Serif SC', 'Playfair Display', serif",
                        letterSpacing: '0.25em',
                        fontWeight: 400
                      }}
                    >
                      点亮每一个日常
                    </div>
                  </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
                  onClick={() => scrollToSection('about')}
                >
                  <span className="text-xs" style={{ color: '#8B7355' }}>向下滚动</span>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowDown size={20} style={{ color: '#8B7355' }} />
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* About Section */}
            <section 
              id="about"
              className="min-h-screen flex items-center py-20 px-12 lg:px-20"
              style={{ backgroundColor: '#F5F5DC' }}
            >
              <div className="max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 
                    className="text-3xl lg:text-4xl mb-8"
                    style={{ 
                      color: '#4B3621',
                      fontFamily: "'Noto Serif SC', serif",
                      letterSpacing: '0.1em'
                    }}
                  >
                    关于我
                  </h2>
                  <div className="space-y-6 text-base leading-relaxed" style={{ color: '#4B3621' }}>
                    <p>
                      嗨，我是车车Home，一个热爱生活的家居博主。用两年时间，我将一套毛坯房打造成了梦想中的轻复古风小屋。
                    </p>
                    <p>
                      在这里，我分享装修设计的灵感、软装搭配的心得，以及那些让生活更美好的家居好物。我相信，美好的居住环境能够滋养身心，让每一天都充满期待。
                    </p>
                    <p style={{ color: '#8B7355' }}>
                      95% 的女性受众，精准触达追求生活美学的核心人群。
                    </p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Portfolio Section */}
            <section 
              id="portfolio"
              className="py-20 px-12 lg:px-20"
              style={{ backgroundColor: '#EDE5D8' }}
            >
              <div className="max-w-6xl mx-auto">
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl lg:text-4xl mb-12 text-center"
                  style={{ 
                    color: '#4B3621',
                    fontFamily: "'Noto Serif SC', serif",
                    letterSpacing: '0.1em'
                  }}
                >
                  作品展示
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {portfolioItems.map((item, index) => (
                    <motion.div
                      key={item.key}
                      id={item.key}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 }}
                      className="group cursor-pointer"
                      onClick={() => scrollToSection(item.key)}
                    >
                      <div 
                        className="relative overflow-hidden rounded-2xl mb-4 p-4 flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(75, 54, 33, 0.03)', minHeight: '280px' }}
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="max-w-full max-h-[300px] object-contain transition-transform duration-700 group-hover:scale-105"
                          style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.08))' }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </div>
                      <h3 
                        className="text-xl mb-2"
                        style={{ 
                          color: '#4B3621',
                          fontFamily: "'Noto Serif SC', serif"
                        }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-sm" style={{ color: '#8B7355' }}>
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Individual Sections */}
            {portfolioItems.map((item, index) => (
              <section 
                key={item.key}
                id={item.key}
                className="min-h-screen flex items-center py-20 px-12 lg:px-20"
                style={{ 
                  backgroundColor: index % 2 === 0 ? '#F5F5DC' : '#EDE5D8'
                }}
              >
                <div className="max-w-6xl mx-auto w-full">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                    {/* Image */}
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="w-full lg:w-1/2"
                    >
                      <div 
                        className="relative overflow-hidden rounded-2xl p-6 flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(75, 54, 33, 0.02)', minHeight: '400px' }}
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="max-w-full max-h-[450px] object-contain"
                          style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))' }}
                        />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="w-full lg:w-1/2"
                    >
                      <h2 
                        className="text-3xl lg:text-4xl mb-6"
                        style={{ 
                          color: '#4B3621',
                          fontFamily: "'Noto Serif SC', serif",
                          letterSpacing: '0.08em'
                        }}
                      >
                        {item.title}
                      </h2>
                      <p 
                        className="text-lg leading-relaxed mb-6"
                        style={{ color: '#4B3621' }}
                      >
                        {item.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-xs"
                            style={{ 
                              backgroundColor: 'rgba(75, 54, 33, 0.06)',
                              color: '#4B3621'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>
            ))}

            {/* Contact Section */}
            <section 
              id="contact"
              className="min-h-[60vh] flex items-center py-20 px-12 lg:px-20"
              style={{ backgroundColor: '#4B3621' }}
            >
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 
                    className="text-3xl lg:text-4xl mb-8"
                    style={{ 
                      color: '#F5F5DC',
                      fontFamily: "'Noto Serif SC', serif",
                      letterSpacing: '0.1em'
                    }}
                  >
                    合作联系
                  </h2>
                  <p 
                    className="text-lg mb-12"
                    style={{ color: 'rgba(245, 245, 220, 0.7)' }}
                  >
                    精致生活提案，深度触达具有生活美学的核心受众
                  </p>

                  <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
                    <div className="flex items-center justify-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(245, 245, 220, 0.1)' }}
                      >
                        <Phone size={20} style={{ color: '#F5F5DC' }} />
                      </div>
                      <div className="text-left">
                        <div className="text-xs mb-1" style={{ color: 'rgba(245, 245, 220, 0.5)' }}>电话</div>
                        <div style={{ color: '#F5F5DC' }}>131-8888-0405</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(245, 245, 220, 0.1)' }}
                      >
                        <Mail size={20} style={{ color: '#F5F5DC' }} />
                      </div>
                      <div className="text-left">
                        <div className="text-xs mb-1" style={{ color: 'rgba(245, 245, 220, 0.5)' }}>邮箱</div>
                        <div style={{ color: '#F5F5DC' }}>chechehome@qq.com</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(245, 245, 220, 0.1)' }}
                      >
                        <MessageCircle size={20} style={{ color: '#F5F5DC' }} />
                      </div>
                      <div className="text-left">
                        <div className="text-xs mb-1" style={{ color: 'rgba(245, 245, 220, 0.5)' }}>微信</div>
                        <div style={{ color: '#F5F5DC' }}>nice2meet26677</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Footer */}
            <footer 
              className="py-8 px-10 text-center"
              style={{ 
                backgroundColor: '#F5F5DC',
                borderTop: '1px solid rgba(75, 54, 33, 0.04)'
              }}
            >
              <p 
                className="text-sm italic"
                style={{ color: '#8B7355' }}
              >
                © 2024 车车Home · 用审美点亮每一个日常
              </p>
            </footer>
          </main>
        </>
      )}

      {/* Mobile Layout */}
      {isMobile && (
        <main className="pt-14">
          {/* Hero Section */}
          <section 
            id="hero"
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: '#4B3621' }}
          >
            {/* Hero Image */}
            <div 
              className="w-full flex items-center justify-center p-6"
              style={{ backgroundColor: '#EDE5D8', height: '50vh' }}
            >
              <img
                src="/客厅.jpg"
                alt="客厅"
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 px-6 py-8">
              <h1 
                className="text-3xl mb-4"
                style={{ 
                  color: '#F5F5DC',
                  fontFamily: "'Noto Serif SC', serif",
                  letterSpacing: '0.05em'
                }}
              >
                车车Home
              </h1>

              <div className="space-y-1 mb-4">
                <p style={{ color: 'rgba(245, 245, 220, 0.6)' }} className="text-xs tracking-wider">
                  Home | 自装120㎡的轻复古风小屋
                </p>
                <p style={{ color: 'rgba(245, 245, 220, 0.6)' }} className="text-xs tracking-wider">
                  Share | 装修设计·软装分享·家居好物
                </p>
              </div>

              <p 
                className="text-sm leading-relaxed mb-6 italic"
                style={{ color: 'rgba(245, 245, 220, 0.7)' }}
              >
                不只是装修，是在庸常的生活里，构筑理想的乌托邦。
              </p>

              {/* Stats */}
              <div className="flex gap-3 mb-6">
                <div 
                  className="flex-1 flex items-center gap-2 p-3 rounded-lg"
                  style={{ 
                    backgroundColor: 'rgba(245, 245, 220, 0.03)',
                    border: '1px solid rgba(245, 245, 220, 0.08)'
                  }}
                >
                  <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#ff2442' }}>
                    <img src="/xiaohongshu.png" alt="小红书" className="w-4 h-4 object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span style={{ color: 'rgba(245, 245, 220, 0.5)' }} className="text-xs">粉丝</span>
                      <span style={{ color: '#F5F5DC', fontFamily: "'Noto Serif SC', serif" }} className="text-base">5,547</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: 'rgba(245, 245, 220, 0.5)' }} className="text-xs">获赞</span>
                      <span style={{ color: '#F5F5DC', fontFamily: "'Noto Serif SC', serif" }} className="text-sm">14.5万</span>
                    </div>
                  </div>
                </div>
                <div 
                  className="flex-1 flex items-center gap-2 p-3 rounded-lg"
                  style={{ 
                    backgroundColor: 'rgba(245, 245, 220, 0.03)',
                    border: '1px solid rgba(245, 245, 220, 0.08)'
                  }}
                >
                  <div className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#000' }}>
                    <img src="/douyin.png" alt="抖音" className="w-4 h-4 object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span style={{ color: 'rgba(245, 245, 220, 0.5)' }} className="text-xs">粉丝</span>
                      <span style={{ color: '#F5F5DC', fontFamily: "'Noto Serif SC', serif" }} className="text-base">9,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: 'rgba(245, 245, 220, 0.5)' }} className="text-xs">获赞</span>
                      <span style={{ color: '#F5F5DC', fontFamily: "'Noto Serif SC', serif" }} className="text-sm">10.9万</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audience */}
              <div 
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
                style={{ 
                  backgroundColor: 'rgba(212, 165, 116, 0.1)',
                  border: '1px solid rgba(212, 165, 116, 0.2)'
                }}
              >
                <span style={{ color: '#D4A574' }} className="text-xs">✦</span>
                <span style={{ color: '#D4A574' }} className="text-xs">95% 女性受众</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-xs"
                    style={{ 
                      backgroundColor: 'rgba(245, 245, 220, 0.06)',
                      color: 'rgba(245, 245, 220, 0.8)',
                      border: '1px solid rgba(245, 245, 220, 0.1)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section 
            id="about"
            className="py-16 px-6"
            style={{ backgroundColor: '#F5F5DC' }}
          >
            <h2 
              className="text-2xl mb-6"
              style={{ 
                color: '#4B3621',
                fontFamily: "'Noto Serif SC', serif",
                letterSpacing: '0.08em'
              }}
            >
              关于我
            </h2>
            <div className="space-y-4 text-sm leading-relaxed" style={{ color: '#4B3621' }}>
              <p>
                嗨，我是车车Home，一个热爱生活的家居博主。用两年时间，我将一套毛坯房打造成了梦想中的轻复古风小屋。
              </p>
              <p>
                在这里，我分享装修设计的灵感、软装搭配的心得，以及那些让生活更美好的家居好物。
              </p>
            </div>
          </section>

          {/* Portfolio Grid */}
          <section 
            id="portfolio"
            className="py-16 px-6"
            style={{ backgroundColor: '#EDE5D8' }}
          >
            <h2 
              className="text-2xl mb-8 text-center"
              style={{ 
                color: '#4B3621',
                fontFamily: "'Noto Serif SC', serif",
                letterSpacing: '0.08em'
              }}
            >
              作品展示
            </h2>

            <div className="space-y-6">
              {portfolioItems.map((item) => (
                <div
                  key={item.key}
                  id={item.key}
                  className="group cursor-pointer"
                  onClick={() => scrollToSection(item.key)}
                >
                  <div 
                    className="relative overflow-hidden rounded-xl mb-3 p-4 flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(75, 54, 33, 0.03)', minHeight: '250px' }}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="max-w-full max-h-[280px] object-contain transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.08))' }}
                    />
                  </div>
                  <h3 
                    className="text-lg mb-1"
                    style={{ 
                      color: '#4B3621',
                      fontFamily: "'Noto Serif SC', serif"
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs" style={{ color: '#8B7355' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section 
            id="contact"
            className="py-16 px-6"
            style={{ backgroundColor: '#4B3621' }}
          >
            <h2 
              className="text-2xl mb-8 text-center"
              style={{ 
                color: '#F5F5DC',
                fontFamily: "'Noto Serif SC', serif",
                letterSpacing: '0.08em'
              }}
            >
              合作联系
            </h2>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(245, 245, 220, 0.1)' }}
                >
                  <Phone size={18} style={{ color: '#F5F5DC' }} />
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: 'rgba(245, 245, 220, 0.5)' }}>电话</div>
                  <div className="text-sm" style={{ color: '#F5F5DC' }}>131-8888-0405</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(245, 245, 220, 0.1)' }}
                >
                  <Mail size={18} style={{ color: '#F5F5DC' }} />
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: 'rgba(245, 245, 220, 0.5)' }}>邮箱</div>
                  <div className="text-sm" style={{ color: '#F5F5DC' }}>chechehome@qq.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(245, 245, 220, 0.1)' }}
                >
                  <MessageCircle size={18} style={{ color: '#F5F5DC' }} />
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: 'rgba(245, 245, 220, 0.5)' }}>微信</div>
                  <div className="text-sm" style={{ color: '#F5F5DC' }}>nice2meet26677</div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer 
            className="py-6 px-6 text-center"
            style={{ 
              backgroundColor: '#F5F5DC',
              borderTop: '1px solid rgba(75, 54, 33, 0.04)'
            }}
          >
            <p 
              className="text-xs italic"
              style={{ color: '#8B7355' }}
            >
              © 2024 车车Home · 用审美点亮每一个日常
            </p>
          </footer>

          {/* Fixed Bottom Contact Bar */}
          <div 
            className="fixed bottom-0 left-0 right-0 px-4 py-3 z-40"
            style={{ 
              backgroundColor: '#F5F5DC',
              borderTop: '1px solid rgba(75, 54, 33, 0.08)'
            }}
          >
            <div className="flex justify-around items-center">
              <div className="flex items-center gap-2" style={{ color: '#4B3621' }}>
                <Phone size={14} />
                <span className="text-xs">131-8888-0405</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: '#4B3621' }}>
                <Mail size={14} />
                <span className="text-xs">chechehome@qq.com</span>
              </div>
            </div>
          </div>

          {/* Spacer for fixed bottom bar */}
          <div className="h-12" />
        </main>
      )}
    </div>
  );
}
