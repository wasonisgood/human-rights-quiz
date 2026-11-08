/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, Download, Camera, ChevronRight, Calendar, Heart, Star, 
  RefreshCw, MessageCircle, Bookmark, Send, BookOpen, Award, CheckCircle2, 
  XCircle, Search, HelpCircle, ArrowLeft, History, Shield, Scale, Sparkles
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { QUESTION_BANK, TOPIC_CATEGORIES } from '../data/questionBank';
import { CORE_CONVENTIONS, LEGAL_GLOSSARY } from '../data/conventionsGlossary';

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
    traits: ["勇敢無懼", "捍衛正義", "果斷行事", "關懷弱勢"]
  },
  "理想主義型": {
    description: "你是一位充滿理想與熱情的人，對於社會正義有著堅定的信念。你相信透過堅持可以改變世界，願意為了理想付出努力。",
    traits: ["理想遠大", "熱情執著", "堅毅不拔", "洞察社會"]
  },
  "突破傳統型": {
    description: "你是一位勇於創新的開拓者，不畏懼挑戰既成觀念。你相信改變才能帶來實質進步，願意突破舊有框架。",
    traits: ["思想開放", "批判獨立", "勇於突破", "開拓創新"]
  },
  "民主改革型": {
    description: "你是一位理性的改革者，深信法治與制度的力量。你善於在體制內推動改變，透過民主正當程序實現公平。",
    traits: ["理性嚴謹", "制度思維", "善於協商", "法治信念"]
  },
  "社會參與型": {
    description: "你是一位積極的行動者，重視公民參與的力量。你善用各種管道發聲，深信群眾團結足以推動社會前進。",
    traits: ["團結大眾", "積極倡議", "熱忱參與", "行動實踐"]
  },
  "平等包容型": {
    description: "你是一位包容的和平使者，真誠尊重每個人的差異。你相信理解與同理可以化解歧見，追求一個沒有歧視的平等社會。",
    traits: ["多元包容", "同理心強", "促進和諧", "消除偏見"]
  }
};

const DEFAULT_EVENTS = {
  "正義勇氣型": [
    {
      id: 'default-justice-courage-1',
      title: '二二八事件與民權追尋',
      date: '1947-02-28',
      description: '查緝私菸事件引發全島性抗爭，人民挺身反抗體制不義，奠定台灣民主法治轉型的重要歷史起點。',
      tags: ['歷史事件', '民權覺醒', '轉型正義'],
      category: '正義勇氣型'
    },
    {
      id: 'default-justice-courage-2',
      title: '四六事件與學術自由抗爭',
      date: '1949-04-06',
      description: '大專學生因抗議軍警進入校園逮捕同學展開爭取大學自治與思想自由之運動。',
      tags: ['學生運動', '學術自由', '人權捍衛'],
      category: '正義勇氣型'
    }
  ],
  "理想主義型": [
    {
      id: 'default-idealism-1',
      title: '美麗島事件與民主先行者的審判',
      date: '1979-12-10',
      description: '世界人權日大會遭受戒嚴軍警大規模逮捕與軍法審判，促發民間對解除戒嚴與政治自由的廣泛爭取。',
      tags: ['世界人權日', '政治自由', '軍法審判'],
      category: '理想主義型'
    }
  ],
  "突破傳統型": [
    {
      id: 'default-breakthrough-1',
      title: '鄭南榕爭取百分之百言論自由',
      date: '1989-04-07',
      description: '堅持刊印台灣新憲法草案，以生命捍衛言論與思想自由，催生後續廢除刑法第一百條的民主改革。',
      tags: ['言論自由', '思想自主', '憲法改革'],
      category: '突破傳統型'
    }
  ],
  "民主改革型": [
    {
      id: 'default-reform-1',
      title: '野百合學運與國會全面改選',
      date: '1990-03-16',
      description: '學生在中正紀念堂靜坐提出「解散國民大會、廢除臨時條款、召開國是會議」，推動台灣走向全面普選。',
      tags: ['民主轉型', '國會改革', '公民運動'],
      category: '民主改革型'
    }
  ],
  "社會參與型": [
    {
      id: 'default-participation-1',
      title: '五二〇農民運動與社會弱勢權益',
      date: '1988-05-20',
      description: '農民北上爭取農民保險與公平貿易待遇，彰顯公民透過社會運動保障經濟社會權利的力量。',
      tags: ['社會權利', '農民權益', '公民行動'],
      category: '社會參與型'
    }
  ],
  "平等包容型": [
    {
      id: 'default-equality-1',
      title: '婚姻平權法案通過與釋字第748號',
      date: '2019-05-17',
      description: '司法院釋字第748號解釋確立同性婚姻受憲法保障，立法院三讀通過施行法，成為亞洲性別人權里程碑。',
      tags: ['婚姻平權', '憲法審查', '性別平等'],
      category: '平等包容型'
    }
  ]
};

export default function HumanRightsQuizApp() {
  // 頂層分頁：'practice'（常態題庫）, 'conventions'（公約辭典）, 'event_quiz'（速測活動）, 'records'（答題本）
  const [activeTab, setActiveTab] = useState('practice');

  // 活動速測狀態 (經典流程)
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
  const [result, setResult] = useState("正義勇氣型");
  const [selectedEvent, setSelectedEvent] = useState(DEFAULT_EVENTS["正義勇氣型"][0]);
  const shareRef = useRef(null);

  // 常態題庫練習狀態
  const [selectedCategory, setSelectedCategory] = useState('全部題目');
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: { selectedIdx, isCorrect } }
  const [showExplanation, setShowExplanation] = useState(false);

  // 公約與辭典搜尋
  const [glossarySearch, setGlossarySearch] = useState('');

  // 讀取/儲存答題紀錄
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('hr_quiz_history');
      if (saved) setQuizHistory(JSON.parse(saved));
    } catch (_) {}
  }, []);

  const saveHistory = (record) => {
    try {
      const updated = [record, ...quizHistory.slice(0, 49)];
      setQuizHistory(updated);
      localStorage.setItem('hr_quiz_history', JSON.stringify(updated));
    } catch (_) {}
  };

  // 篩選常態題庫
  const filteredQuestions = selectedCategory === '全部題目' 
    ? QUESTION_BANK 
    : QUESTION_BANK.filter(q => q.category === selectedCategory);
  
  const currentPracticeQ = filteredQuestions[practiceIndex] || filteredQuestions[0];

  // 常態題庫答題
  const handleSelectPracticeOption = (optionIdx) => {
    if (userAnswers[currentPracticeQ.id] !== undefined) return; // 已作答過
    const isCorrect = currentPracticeQ.options[optionIdx].isCorrect;
    const ansData = { selectedIdx: optionIdx, isCorrect, timestamp: new Date().toLocaleString() };
    
    const nextAnswers = { ...userAnswers, [currentPracticeQ.id]: ansData };
    setUserAnswers(nextAnswers);
    setShowExplanation(true);

    saveHistory({
      id: `${currentPracticeQ.id}-${Date.now()}`,
      question: currentPracticeQ.question,
      category: currentPracticeQ.category,
      isCorrect,
      date: new Date().toLocaleDateString()
    });
  };

  // 經典活動答題邏輯
  const handleAnswer = (optionScores) => {
    const newScores = { ...scores };
    Object.keys(optionScores).forEach(key => {
      newScores[key] = (newScores[key] || 0) + optionScores[key];
    });
    setScores(newScores);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStage('calculating');
      setTimeout(() => {
        // 計算結果
        let maxVal = -1;
        let bestKey = "正義勇氣型";
        Object.entries(newScores).forEach(([k, v]) => {
          if (v > maxVal) {
            maxVal = v;
            bestKey = k;
          }
        });
        setResult(bestKey);
        const evList = DEFAULT_EVENTS[bestKey] || DEFAULT_EVENTS["正義勇氣型"];
        setSelectedEvent(evList[Math.floor(Math.random() * evList.length)]);
        setStage('result');
      }, 1000);
    }
  };

  const restartEventQuiz = () => {
    setCurrentQuestion(0);
    setScores({
      "正義勇氣型": 0,
      "理想主義型": 0,
      "突破傳統型": 0,
      "民主改革型": 0,
      "社會參與型": 0,
      "平等包容型": 0
    });
    setStage('intro');
  };

  // 截圖下載功能 (邊界正常化，確保內距與文字不貼邊)
  const downloadImage = async () => {
    try {
      const domtoimage = (await import('dom-to-image')).default;
      const element = shareRef.current;
      if (!element) return;

      const dataUrl = await domtoimage.toPng(element, {
        bgcolor: '#ffffff',
        quality: 1,
        width: element.offsetWidth * 2,
        height: element.offsetHeight * 2,
        style: {
          transform: 'scale(2)',
          transformOrigin: 'top left'
        }
      });

      const link = document.createElement('a');
      link.download = `human-rights-card-${result}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('截圖下載失敗', error);
      alert('圖片生成失敗，建議使用手機內建截圖或稍後重試。');
    }
  };

  const shareImage = async () => {
    try {
      const domtoimage = (await import('dom-to-image')).default;
      const element = shareRef.current;
      if (!element) return;

      const dataUrl = await domtoimage.toPng(element, {
        bgcolor: '#ffffff',
        quality: 1,
        width: element.offsetWidth * 2,
        height: element.offsetHeight * 2,
        style: {
          transform: 'scale(2)',
          transformOrigin: 'top left'
        }
      });

      const blob = await fetch(dataUrl).then(res => res.blob());
      const file = new File([blob], `human-rights-${result}.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `我的人權史上的一天：${result}`,
          text: `我在清大人權知識平台測出「${result}」！快來測測你的歷史定位。`
        });
      } else {
        downloadImage();
      }
    } catch (e) {
      downloadImage();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* 頂部專業機構導航門戶列 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-700 text-white flex items-center justify-center font-serif font-bold text-xl shadow">
              權
            </div>
            <div>
              <div className="font-bold text-base text-slate-900 tracking-tight flex items-center gap-2">
                人權知識互動問答與法學智庫
                <span className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-mono">清大學生會人權部</span>
              </div>
              <div className="text-xs text-slate-500 font-mono">Human Rights Jurisprudence & Practice System</div>
            </div>
          </div>

          {/* 模組分頁按鈕 */}
          <nav className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs sm:text-sm font-medium">
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-3 py-1.5 rounded-md transition-all ${activeTab === 'practice' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              常態題庫實戰
            </button>
            <button
              onClick={() => setActiveTab('conventions')}
              className={`px-3 py-1.5 rounded-md transition-all ${activeTab === 'conventions' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              公約與法學辭典
            </button>
            <button
              onClick={() => setActiveTab('event_quiz')}
              className={`px-3 py-1.5 rounded-md transition-all ${activeTab === 'event_quiz' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              經典活動速測
            </button>
            <button
              onClick={() => setActiveTab('records')}
              className={`px-3 py-1.5 rounded-md transition-all ${activeTab === 'records' ? 'bg-white text-slate-900 shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              練習紀錄 ({quizHistory.length})
            </button>
          </nav>
        </div>
      </header>

      {/* 主內容區 */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6">
        {/* =========================================================
            分頁 1：常態題庫實戰
           ========================================================= */}
        {activeTab === 'practice' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 左側主題分類 */}
            <div className="lg:col-span-1 space-y-2">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  測驗法學範疇
                </h3>
                <div className="space-y-1">
                  {TOPIC_CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setPracticeIndex(0);
                        setShowExplanation(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        selectedCategory === cat 
                          ? 'bg-amber-700 text-white font-medium' 
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="truncate">{cat}</span>
                      <span className="font-mono text-xs opacity-75">
                        {cat === '全部題目' ? QUESTION_BANK.length : QUESTION_BANK.filter(q => q.category === cat).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 答題進度小卡 */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-xs space-y-2">
                <div className="flex justify-between text-slate-500 font-mono">
                  <span>本組完成進度</span>
                  <span>{practiceIndex + 1} / {filteredQuestions.length}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-amber-700 h-full transition-all duration-300"
                    style={{ width: `${((practiceIndex + 1) / filteredQuestions.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 右側題庫卡片 */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold rounded">
                      {currentPracticeQ.category}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded font-mono">
                      難度：{currentPracticeQ.level}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    題號 #{currentPracticeQ.id}
                  </span>
                </div>

                {/* 題目主體 */}
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
                  {currentPracticeQ.question}
                </h2>

                {/* 選項列表 */}
                <div className="space-y-3">
                  {currentPracticeQ.options.map((opt, oIdx) => {
                    const ans = userAnswers[currentPracticeQ.id];
                    let btnStyle = "border-slate-200 hover:border-slate-300 bg-white text-slate-800";
                    if (ans !== undefined) {
                      if (opt.isCorrect) {
                        btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
                      } else if (ans.selectedIdx === oIdx && !opt.isCorrect) {
                        btnStyle = "border-rose-500 bg-rose-50 text-rose-900 line-through opacity-80";
                      } else {
                        btnStyle = "border-slate-200 bg-slate-50 text-slate-400";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={ans !== undefined}
                        onClick={() => handleSelectPracticeOption(oIdx)}
                        className={`w-full p-4 rounded-xl border text-left text-sm leading-relaxed transition-all flex items-start gap-3 ${btnStyle}`}
                      >
                        <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-mono flex-shrink-0 mt-0.5">
                          {['A', 'B', 'C', 'D'][oIdx]}
                        </span>
                        <span className="flex-1">{opt.text}</span>
                        {ans !== undefined && opt.isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        )}
                        {ans !== undefined && ans.selectedIdx === oIdx && !opt.isCorrect && (
                          <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* 解析與法條依據 */}
                {(showExplanation || userAnswers[currentPracticeQ.id] !== undefined) && (
                  <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-5 space-y-3 text-sm">
                    <div className="font-bold text-amber-900 flex items-center gap-2">
                      <Scale className="w-4 h-4 text-amber-800" />
                      法學解析與公約參照
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {currentPracticeQ.explanation}
                    </p>
                    <div className="pt-2 border-t border-amber-200/60 text-xs font-mono text-amber-800">
                      依據文獻：{currentPracticeQ.reference}
                    </div>
                  </div>
                )}

                {/* 題庫上一題/下一題翻頁 */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    disabled={practiceIndex === 0}
                    onClick={() => {
                      setPracticeIndex(Math.max(0, practiceIndex - 1));
                      setShowExplanation(false);
                    }}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 disabled:opacity-30 hover:bg-slate-50 transition-colors"
                  >
                    ← 上一題
                  </button>
                  <button
                    disabled={practiceIndex >= filteredQuestions.length - 1}
                    onClick={() => {
                      setPracticeIndex(Math.min(filteredQuestions.length - 1, practiceIndex + 1));
                      setShowExplanation(false);
                    }}
                    className="px-5 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold disabled:opacity-30 transition-colors"
                  >
                    下一題 →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            分頁 2：公約體系與法學辭典
           ========================================================= */}
        {activeTab === 'conventions' && (
          <div className="space-y-6">
            {/* 搜尋條 */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="搜尋公約條文、法學名詞（如：不遣返原則、審判權、酷刑定義、比例原則）..."
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                className="w-full text-sm outline-none bg-transparent text-slate-800 placeholder-slate-400"
              />
            </div>

            {/* 四大核心公約卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CORE_CONVENTIONS.filter(c => 
                c.name.includes(glossarySearch) || 
                c.abbr.toLowerCase().includes(glossarySearch.toLowerCase()) ||
                c.desc.includes(glossarySearch)
              ).map(c => (
                <div key={c.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                        {c.abbr}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">{c.name}</h3>
                      <div className="text-xs text-slate-400 font-mono">{c.enName}</div>
                    </div>
                    <span className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200 font-mono">
                      {c.year}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-800">代表性條文精要：</div>
                    {c.articles.map((art, aIdx) => (
                      <div key={aIdx} className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                        <span className="font-bold text-amber-800 mr-2">{art.num}【{art.title}】</span>
                        <span className="text-slate-600">{art.summary}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 核心法學名詞專區 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-700" />
                憲政公法與國際人權核心辭典
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {LEGAL_GLOSSARY.filter(g => 
                  g.term.includes(glossarySearch) || g.def.includes(glossarySearch)
                ).map((g, gIdx) => (
                  <div key={gIdx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <span className="text-xs font-mono text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded">
                      {g.category}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">{g.term}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{g.def}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            分頁 3：經典活動速測（人權史上的一天）
           ========================================================= */}
        {activeTab === 'event_quiz' && (
          <div className="max-w-2xl mx-auto">
            {stage === 'intro' && (
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center font-serif text-2xl font-black shadow-inner">
                  史
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">台灣人權史上的一天</h2>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    透過 5 道情境測驗，探索你的公民性格與正義特質，並為你配對專屬於你的歷史抗爭時刻。
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs text-slate-500 font-mono">
                  活動特別企劃 · 清華大學學生會人權部
                </div>
                <button
                  onClick={() => setStage('quiz')}
                  className="px-8 py-3.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold shadow transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
                >
                  開始速測 <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {stage === 'quiz' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex justify-between items-center text-xs font-mono text-slate-500 border-b border-slate-100 pb-3">
                  <span>問題 {currentQuestion + 1} / {quizQuestions.length}</span>
                  <span>人權性格分析</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-relaxed">
                  {quizQuestions[currentQuestion].question}
                </h3>
                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(opt.scores)}
                      className="w-full p-4 rounded-xl border border-slate-200 hover:border-amber-700 hover:bg-amber-50/50 text-left text-sm text-slate-800 transition-all leading-relaxed"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {stage === 'calculating' && (
              <div className="bg-white rounded-2xl p-12 border border-slate-200 shadow-sm text-center space-y-4">
                <div className="w-12 h-12 border-3 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-semibold text-slate-700">正在分析你的人權性格特質與歷史時刻...</p>
              </div>
            )}

            {stage === 'result' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                      測驗結果
                    </span>
                    <span className="text-xs text-slate-400 font-mono">人權歷史角色</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    你是【{result}】
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {personalityTypes[result]?.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {personalityTypes[result]?.traits.map((t, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded text-xs font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedEvent && (
                  <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-amber-800">
                      <Calendar className="w-4 h-4" />
                      歷史時刻：{selectedEvent.date}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">{selectedEvent.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{selectedEvent.description}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => setStage('share')}
                    className="flex-1 bg-amber-700 hover:bg-amber-800 text-white px-6 py-3.5 rounded-xl font-bold shadow flex items-center justify-center gap-2 transition-all"
                  >
                    <Camera className="w-4 h-4" /> 預覽並生成分享卡片
                  </button>
                  <button
                    onClick={restartEventQuiz}
                    className="px-5 py-3.5 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* 分享卡片畫面（徹底修復邊界與間距，保證精緻優雅不貼邊） */}
            {stage === 'share' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setStage('result')}
                    className="text-xs font-mono text-slate-500 hover:text-slate-900 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> 返回結果
                  </button>
                  <span className="text-xs font-mono text-slate-400">社群圖片生成器</span>
                </div>

                {/* 截圖目標元素：維持固定寬度 420px、充足優雅內距 (28px)、無緊貼邊界 */}
                <div className="flex justify-center p-2 bg-slate-100 rounded-2xl overflow-x-auto">
                  <div
                    ref={shareRef}
                    style={{ width: '400px', margin: '0 auto', boxSizing: 'border-box' }}
                    className="bg-white rounded-2xl shadow-xl border border-slate-200 p-7 text-slate-900 flex flex-col gap-5"
                  >
                    {/* 卡片頂部官方識別 */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-amber-800 text-white flex items-center justify-center font-serif font-bold text-base shadow">
                          權
                        </div>
                        <div>
                          <div className="font-bold text-xs text-slate-900 tracking-tight">國立清華大學學生會人權部</div>
                          <div className="text-[10px] text-slate-400 font-mono">HUMAN RIGHTS ADVOCACY</div>
                        </div>
                      </div>
                      <div className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-mono font-semibold">
                        人權史上的一天
                      </div>
                    </div>

                    {/* 卡片核心特質展示區 */}
                    <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-5 text-center space-y-3">
                      <div className="text-[11px] font-mono text-amber-800 tracking-widest uppercase">
                        — 專屬公民性格判定 —
                      </div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-wide font-serif">
                        【{result}】
                      </h2>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {personalityTypes[result]?.traits.map((tr, i) => (
                          <span key={i} className="text-[11px] bg-white text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                            #{tr}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed pt-1 max-w-xs mx-auto">
                        {personalityTypes[result]?.description}
                      </p>
                    </div>

                    {/* 配對之歷史時刻 */}
                    <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>歷史共鳴時刻</span>
                        <span>{selectedEvent?.date}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">{selectedEvent?.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {selectedEvent?.description}
                      </p>
                    </div>

                    {/* 卡片頁腳 */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>NTHU HUMAN RIGHTS PORTAL</span>
                      <span>DECEMBER 10 · 人權日紀念</span>
                    </div>
                  </div>
                </div>

                {/* 下載與分享按鈕 */}
                <div className="flex gap-3">
                  <button
                    onClick={downloadImage}
                    className="flex-1 bg-amber-700 hover:bg-amber-800 text-white px-6 py-3.5 rounded-xl font-bold shadow flex items-center justify-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" /> 下載高解析分享圖
                  </button>
                  <button
                    onClick={shareImage}
                    className="px-6 py-3.5 border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 transition-all"
                  >
                    <Share2 className="w-4 h-4" /> 呼叫系統分享
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            分頁 4：練習紀錄與錯題本
           ========================================================= */}
        {activeTab === 'records' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                <div className="text-2xl font-bold text-slate-900 font-mono">{quizHistory.length}</div>
                <div className="text-xs text-slate-500 mt-1">累計練習題數</div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                <div className="text-2xl font-bold text-emerald-600 font-mono">
                  {quizHistory.length > 0 
                    ? Math.round((quizHistory.filter(h => h.isCorrect).length / quizHistory.length) * 100)
                    : 0}%
                </div>
                <div className="text-xs text-slate-500 mt-1">整體正確率</div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center col-span-2 sm:col-span-1">
                <div className="text-2xl font-bold text-amber-700 font-mono">
                  {quizHistory.filter(h => !h.isCorrect).length}
                </div>
                <div className="text-xs text-slate-500 mt-1">需複習錯題</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <History className="w-4 h-4 text-amber-700" />
                  答題紀錄明細
                </h3>
                {quizHistory.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm('確定要清空本地練習紀錄嗎？')) {
                        setQuizHistory([]);
                        localStorage.removeItem('hr_quiz_history');
                      }
                    }}
                    className="text-xs font-mono text-rose-600 hover:underline"
                  >
                    清空紀錄
                  </button>
                )}
              </div>

              {quizHistory.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  尚無練習紀錄。請至「常態題庫實戰」進行公約與法學題庫練習。
                </div>
              ) : (
                <div className="space-y-2">
                  {quizHistory.map(item => (
                    <div key={item.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-start justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded font-mono font-semibold ${item.isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                            {item.isCorrect ? '答對' : '答錯'}
                          </span>
                          <span className="text-slate-500 font-mono">{item.category}</span>
                        </div>
                        <p className="font-medium text-slate-800 text-sm">{item.question}</p>
                      </div>
                      <span className="text-slate-400 font-mono whitespace-nowrap">{item.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* 底部頁腳 */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 font-mono">
        國立清華大學學生會人權部 · 憲政人權法學常態化智庫專案
      </footer>
    </div>
  );
}
