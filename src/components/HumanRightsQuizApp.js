/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Download, Camera, ChevronRight, Calendar, Heart, Star, RefreshCw, MessageCircle, Bookmark, Send } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

// Firebase配置
const firebaseConfig = {
  apiKey: "AIzaSyBollsBjbUKsNtgKVEyyHYPxUxSZ5UuK34",
  authDomain: "student-welfare-5c104.firebaseapp.com", 
  projectId: "student-welfare-5c104",
  storageBucket: "student-welfare-5c104.firebasestorage.app",
  messagingSenderId: "1062729448140",
  appId: "1:1062729448140:web:f9b73a66161645490f6069",
  measurementId: "G-VLEN2BESP6"
};

// 初始化Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const quizQuestions = [
  {
    id: 1,
    question: "當你發現社會上存在不公平的制度時，你會：",
    options: [
      { text: "積極站出來發聲抗議", scores: { "正義勇氣型": 3, "理想主義型": 1, "突破傳統型": 1, "民主改革型": 0, "社會參與型": 2, "平等包容型": 0 } },
      { text: "尋找合法途徑改變它", scores: { "正義勇氣型": 1, "理想主義型": 1, "突破傳統型": 1, "民主改革型": 3, "社會參與型": 1, "平等包容型": 1 } },
      { text: "默默支持改革但不主動參與", scores: { "正義勇氣型": 0, "理想主義型": 1, "突破傳統型": 1, "民主改革型": 1, "社會參與型": 0, "平等包容型": 3 } },
      { text: "觀察情勢再決定行動", scores: { "正義勇氣型": 0, "理想主義型": 1, "突破傳統型": 3, "民主改革型": 1, "社會參與型": 1, "平等包容型": 1 } }
    ]
  },
  {
    id: 2,
    question: "面對權威時，你的態度是：",
    options: [
      { text: "絕對服從，相信權威的判斷", scores: { "正義勇氣型": 0, "理想主義型": 0, "突破傳統型": 1, "民主改革型": 1, "社會參與型": 0, "平等包容型": 1 } },
      { text: "批判性思考，質疑不合理之處", scores: { "正義勇氣型": 2, "理想主義型": 3, "突破傳統型": 2, "民主改革型": 1, "社會參與型": 2, "平等包容型": 1 } },
      { text: "適度尊重，但保持獨立思考", scores: { "正義勇氣型": 1, "理想主義型": 1, "突破傳統型": 2, "民主改革型": 2, "社會參與型": 3, "平等包容型": 2 } },
      { text: "根據情況彈性調整", scores: { "正義勇氣型": 1, "理想主義型": 1, "突破傳統型": 1, "民主改革型": 2, "社會參與型": 1, "平等包容型": 2 } }
    ]
  },
  {
    id: 3,
    question: "如果可以改變世界的一件事，你會選擇：",
    options: [
      { text: "消除所有的歧視和偏見", scores: { "正義勇氣型": 1, "理想主義型": 2, "突破傳統型": 1, "民主改革型": 1, "社會參與型": 1, "平等包容型": 3 } },
      { text: "建立完全民主的政治體制", scores: { "正義勇氣型": 1, "理想主義型": 2, "突破傳統型": 1, "民主改革型": 3, "社會參與型": 1, "平等包容型": 1 } },
      { text: "讓每個人都能追求自己的理想", scores: { "正義勇氣型": 1, "理想主義型": 3, "突破傳統型": 2, "民主改革型": 1, "社會參與型": 1, "平等包容型": 1 } },
      { text: "打破傳統觀念的束縛", scores: { "正義勇氣型": 1, "理想主義型": 1, "突破傳統型": 3, "民主改革型": 1, "社會參與型": 1, "平等包容型": 1 } }
    ]
  },
  {
    id: 4,
    question: "當朋友遭遇不公平對待時，你會：",
    options: [
      { text: "立即挺身而出幫助他", scores: { "正義勇氣型": 3, "理想主義型": 1, "突破傳統型": 1, "民主改革型": 1, "社會參與型": 2, "平等包容型": 1 } },
      { text: "陪伴支持，並尋求法律途徑", scores: { "正義勇氣型": 1, "理想主義型": 1, "突破傳統型": 1, "民主改革型": 2, "社會參與型": 3, "平等包容型": 1 } },
      { text: "提供建議讓他自己決定", scores: { "正義勇氣型": 0, "理想主義型": 1, "突破傳統型": 1, "民主改革型": 2, "社會參與型": 1, "平等包容型": 1 } },
      { text: "安慰他並建議他向前看", scores: { "正義勇氣型": 0, "理想主義型": 1, "突破傳統型": 1, "民主改革型": 1, "社會參與型": 0, "平等包容型": 2 } }
    ]
  },
  {
    id: 5,
    question: "你認為改變社會最有效的方式是：",
    options: [
      { text: "群眾運動和抗議", scores: { "正義勇氣型": 2, "理想主義型": 2, "突破傳統型": 1, "民主改革型": 1, "社會參與型": 3, "平等包容型": 1 } },
      { text: "教育和觀念改變", scores: { "正義勇氣型": 1, "理想主義型": 2, "突破傳統型": 3, "民主改革型": 1, "社會參與型": 1, "平等包容型": 2 } },
      { text: "立法和制度改革", scores: { "正義勇氣型": 1, "理想主義型": 1, "突破傳統型": 1, "民主改革型": 3, "社會參與型": 1, "平等包容型": 1 } },
      { text: "每個人從自身做起", scores: { "正義勇氣型": 1, "理想主義型": 1, "突破傳統型": 2, "民主改革型": 1, "社會參與型": 1, "平等包容型": 3 } }
    ]
  }
];

const personalityTypes = {
  "正義勇氣型": {
    description: "你是一位充滿正義感的勇者，面對不公不義總是第一個站出來。你相信真理和正義，願意為了保護弱者而奮鬥。",
    traits: ["勇敢", "正義", "果斷", "無畏"]
  },
  "理想主義型": {
    description: "你是一位充滿理想與熱情的人，對於社會正義有著堅定的信念。你相信透過行動可以改變世界，願意為了理想付出努力。",
    traits: ["理想", "熱情", "堅持", "信念"]
  },
  "突破傳統型": {
    description: "你是一位勇於創新的開拓者，不畏懼挑戰傳統觀念。你相信改變才能帶來進步，願意突破舊有框架。",
    traits: ["創新", "突破", "開放", "進取"]
  },
  "民主改革型": {
    description: "你是一位理性的改革者，相信制度的力量。你善於在體制內推動改變，透過民主程序實現理想。",
    traits: ["理性", "改革", "制度", "協調"]
  },
  "社會參與型": {
    description: "你是一位積極的行動者，重視公民參與的力量。你善用各種管道發聲，相信群眾的力量可以改變社會。",
    traits: ["參與", "行動", "團結", "發聲"]
  },
  "平等包容型": {
    description: "你是一位包容的和平使者，尊重每個人的差異。你相信愛與理解可以化解歧見，追求一個更平等的社會。",
    traits: ["包容", "平等", "尊重", "和諧"]
  }
};

export default function HumanRightsQuizApp() {
  const [stage, setStage] = useState('intro'); // intro, quiz, calculating, result, share
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    "正義勇氣型": 0,
    "理想主義型": 0,
    "突破傳統型": 0,
    "民主改革型": 0,
    "社會參與型": 0,
    "平等包容型": 0
  });
  const [result, setResult] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [firebaseEvents, setFirebaseEvents] = useState({});
  const [loading, setLoading] = useState(true);
  const shareRef = useRef(null);

  // 從Firebase載入事件資料
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const eventsCollection = collection(db, 'humanRightsEvents');
        const eventsSnapshot = await getDocs(eventsCollection);
        
        const eventsByCategory = {
          "正義勇氣型": [],
          "理想主義型": [],
          "突破傳統型": [],
          "民主改革型": [],
          "社會參與型": [],
          "平等包容型": []
        };

        eventsSnapshot.forEach((doc) => {
          const data = doc.data();
          const category = data.category;
          if (category && eventsByCategory[category]) {
            eventsByCategory[category].push({
              id: doc.id,
              ...data
            });
          }
        });

        // 確保每個類型都有事件
        Object.keys(eventsByCategory).forEach(key => {
          if (eventsByCategory[key].length === 0) {
            // 提供預設事件以防沒有資料
            eventsByCategory[key].push({
              id: 'default-' + key,
              title: '重要人權里程碑',
              date: '2024年12月10日',
              description: '這是一個關於人權發展的重要時刻，象徵著我們持續為更美好的世界努力。',
              tags: ['人權', '自由', '平等'],
              ig_caption: '每一天都是爭取人權的日子 #人權 #自由 #平等',
              category: key
            });
          }
        });

        setFirebaseEvents(eventsByCategory);
        setLoading(false);
      } catch (error) {
        console.error("載入Firebase資料失敗:", error);
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // 計算結果
  const calculateResult = () => {
    const maxScore = Math.max(...Object.values(scores));
    const resultType = Object.keys(scores).find(key => scores[key] === maxScore);
    
    const events = firebaseEvents[resultType] || [];
    if (events.length === 0) {
      console.error("沒有找到該類型的事件");
      return;
    }
    
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    
    setResult(resultType);
    setSelectedEvent(randomEvent);
    setStage('result');
  };

  // 處理答案選擇
  const handleAnswer = (option) => {
    const newScores = { ...scores };
    Object.keys(option.scores).forEach(type => {
      newScores[type] += option.scores[type];
    });
    setScores(newScores);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStage('calculating');
      setTimeout(() => {
        calculateResult();
      }, 2000);
    }
  };

  // 重新開始
  const restart = () => {
    setStage('intro');
    setCurrentQuestion(0);
    setScores({
      "正義勇氣型": 0,
      "理想主義型": 0,
      "突破傳統型": 0,
      "民主改革型": 0,
      "社會參與型": 0,
      "平等包容型": 0
    });
    setResult(null);
    setSelectedEvent(null);
  };

  // 下載圖片
  const downloadImage = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const element = shareRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true
      });
      
      const link = document.createElement('a');
      link.download = `my-human-rights-day-${selectedEvent?.date}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Screenshot failed:', error);
    }
  };

  // 分享功能
  const shareImage = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const element = shareRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true
      });
      
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      const file = new File([blob], 'human-rights-day.png', { type: 'image/png' });
      
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: '我的人權史上的一天',
          text: `我是${result}！一起來測測看你的人權史上的一天是哪一天吧！`
        });
      } else {
        downloadImage();
      }
    } catch (error) {
      console.error('Share failed:', error);
      downloadImage();
    }
  };

  // Intro畫面
  const IntroStage = () => (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">台灣人權史上的一天</h1>
        <p className="text-xl text-white/90 mb-4">探索你的人格特質<br/>找到專屬於你的歷史時刻</p>
        
        <div className="mb-8">
          <p className="text-lg text-white/80 mb-2">清大學生會人權部</p>
          <p className="text-lg text-white/80">清音祭特別企劃</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setStage('quiz')}
          className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg flex items-center gap-2 transition-colors duration-200 hover:bg-blue-50"
          disabled={loading}
        >
          {loading ? '載入中...' : '開始測驗'} <ChevronRight />
        </motion.button>
      </motion.div>
    </motion.div>
  );

  // 測驗畫面
  const QuizStage = () => (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md mx-auto">
        {/* 進度條 */}
        <div className="mb-8">
          <div className="h-2 bg-white/30 rounded-full">
            <motion.div 
              className="h-full bg-white rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-white/80 text-sm mt-2">
            問題 {currentQuestion + 1} / {quizQuestions.length}
          </p>
        </div>

        {/* 問題 */}
        <motion.div
          key={currentQuestion}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl p-6 mb-6 shadow-xl"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {quizQuestions[currentQuestion].question}
          </h2>
        </motion.div>

        {/* 選項 */}
        <div className="space-y-3">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(option)}
              className="w-full bg-white/90 hover:bg-white text-gray-800 p-4 rounded-xl text-left shadow-md transition-all duration-200"
            >
              {option.text}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );

  // 計算中畫面
  const CalculatingStage = () => (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
        />
        <p className="text-white text-xl">正在分析你的人格特質...</p>
      </div>
    </motion.div>
  );

  // 結果畫面
  const ResultStage = () => (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl p-6 mb-6 shadow-xl"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            你是 {result}
          </h2>
          <p className="text-gray-600 mb-4">
            {personalityTypes[result]?.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {personalityTypes[result]?.traits.map((trait, index) => (
              <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                {trait}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-2xl p-6 mb-6 shadow-xl"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            你的人權史上的一天
          </h3>
          <div className="mb-4">
            <Calendar className="inline mr-2 text-blue-600" />
            <span className="text-lg font-semibold">{selectedEvent?.date}</span>
          </div>
          <h4 className="font-bold text-gray-800 mb-2">{selectedEvent?.title}</h4>
          <p className="text-gray-600 mb-4">{selectedEvent?.description}</p>
          <div className="flex flex-wrap gap-2">
            {selectedEvent?.tags.map((tag, index) => (
              <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setStage('share')}
            className="flex-1 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all duration-200"
          >
            <Camera /> 分享結果
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={restart}
            className="bg-white/20 text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all duration-200"
          >
            <RefreshCw size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  // 分享畫面 - 優化的IG貼文設計
  const ShareStage = () => (
    <motion.div 
      className="min-h-screen bg-gray-100 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-md mx-auto">
        {/* IG樣式卡片 - 整合設計 */}
        <div ref={shareRef} className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          {/* 完整IG貼文設計 */}
          <div className="relative">
            {/* 主要內容區 */}
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1">
              <div className="bg-white p-6">
                {/* IG風格頭部 */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {result?.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="font-bold text-gray-900">人權史上的一天</div>
                      <div className="text-sm text-gray-500">清大學生會人權部</div>
                    </div>
                  </div>
                  <div className="text-blue-600">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                </div>

                {/* 貼文內容 */}
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 flex flex-col justify-center items-center text-center">
                    <div className="mb-4">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-3xl mb-4">
                        {result?.charAt(0)}
                      </div>
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        {result}
                      </h3>
                    </div>
                    
                    <div className="mb-6">
                      <div className="text-sm text-gray-500 mb-1">人權史上的一天</div>
                      <div className="text-xl font-bold text-gray-900">{selectedEvent?.date}</div>
                      <div className="text-lg font-semibold text-gray-800 mt-2 mb-4">
                        {selectedEvent?.title}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                        {selectedEvent?.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center">
                      {selectedEvent?.tags.map((tag, index) => (
                        <span key={index} className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* IG互動區 */}
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex gap-4">
                      <Heart className="text-gray-800 hover:text-red-500 cursor-pointer transition-colors" />
                      <MessageCircle className="text-gray-800 hover:text-blue-500 cursor-pointer transition-colors" />
                      <Send className="text-gray-800 hover:text-purple-500 cursor-pointer transition-colors" />
                    </div>
                    <Bookmark className="text-gray-800 hover:text-yellow-500 cursor-pointer transition-colors" />
                  </div>
                  <div className="text-sm font-semibold mb-1">1,210 個讚</div>
                  <div className="text-sm">
                    <span className="font-semibold">清大學生會人權部</span>
                    <span className="ml-1 text-gray-600">每個人都有屬於自己的人權故事 ✨</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">DECEMBER 10</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 分享按鈕 */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={shareImage}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all duration-200"
          >
            <Share2 /> 分享
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={downloadImage}
            className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all duration-200"
          >
            <Download /> 下載
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={restart}
          className="w-full mt-4 bg-gray-200 text-gray-600 px-6 py-3 rounded-xl font-bold transition-all duration-200"
        >
          重新測驗
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {stage === 'intro' && <IntroStage key="intro" />}
      {stage === 'quiz' && <QuizStage key="quiz" />}
      {stage === 'calculating' && <CalculatingStage key="calculating" />}
      {stage === 'result' && <ResultStage key="result" />}
      {stage === 'share' && <ShareStage key="share" />}
    </AnimatePresence>
  );
}