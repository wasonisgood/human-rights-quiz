// 常態人權題庫資料庫：涵蓋兩公約、UNCAT、CEDAW、憲法法庭判決與人權法學
export const QUESTION_BANK = [
  {
    id: 'iccpr-1',
    category: '公民與政治權利 (ICCPR)',
    level: '基礎',
    question: '依據公民與政治權利國際公約（ICCPR）第6條，關於「生命權」之保障，下列敘述何者最正確？',
    options: [
      { text: '任何人的生命均得由國家公權力依行政命令任意剝奪', isCorrect: false },
      { text: '生命權為不可剝奪之固有權利，受法律保障，非依法不得任意剝奪', isCorrect: true },
      { text: '公約締約國在任何緊急危難狀態下，皆可宣告停止生命權之保障', isCorrect: false },
      { text: '生命權僅保障本國公民，外國籍與無國籍人不受公約保障', isCorrect: false }
    ],
    explanation: '依據 ICCPR 第6條第1項，人人有固有的生命權。這個權利應受法律保障。任何人的生命不得任意剝奪。此外，依公約第4條第2項，生命權屬於「絕對不得克減之權利」（Non-derogable Rights），即使在國家緊急狀態下亦不得宣告暫停。',
    reference: 'ICCPR 第6條、一般性意見書第36號'
  },
  {
    id: 'iccpr-2',
    category: '公民與政治權利 (ICCPR)',
    level: '進階',
    question: '關於 ICCPR 第14條保障之「受公平審判權」（Fair Trial），下列何者為其核心內涵？',
    options: [
      { text: '只要法院作成裁判即可，不論審理期日是否公開', isCorrect: false },
      { text: '受無罪推定、獲得充分時間準備防禦、受迅速公正之獨立法庭審理', isCorrect: true },
      { text: '被告自白即可作為唯一有罪證據，無須其他佐證', isCorrect: false },
      { text: '刑事被告無權獲得通譯協助或免費辯護律師', isCorrect: false }
    ],
    explanation: '受公平審判權包括受無罪推定原則（Presumption of Innocence）、受獨立公正無偏倚法庭即時審理、享有足夠時間與便利準備辯護、得與選任律師秘密溝通，以及不被強迫自證己罪（Privilege against self-incrimination）等。',
    reference: 'ICCPR 第14條、一般性意見書第32號'
  },
  {
    id: 'uncat-1',
    category: '禁止酷刑公約 (UNCAT)',
    level: '核心',
    question: '禁止酷刑和其他殘忍、不人道或有辱人格的待遇或處罰公約（UNCAT）第3條確立的「不遣返原則」（Non-refoulement），其具體意義為何？',
    options: [
      { text: '凡非法入境之外國人，國家一律得隨時無條件遣返出境', isCorrect: false },
      { text: '如有實質理由相信引渡或遣返後有遭受酷刑之危險，締約國不得將其驅逐、遣返或引渡', isCorrect: true },
      { text: '只要接收國出具外交保證（Diplomatic Assurances），即可免除不遣返責任', isCorrect: false },
      { text: '不遣返原則僅適用於已合法取得難民身分者', isCorrect: false }
    ],
    explanation: 'UNCAT 第3條確立絕對之「不遣返原則」：如有相當理由相信任何人在另一國有遭受酷刑危險，不得將該人驅逐、遣返（refouler）或引渡至該國。此原則在國際人權法上已具備國際習慣法乃至強行法（Jus Cogens）之地位。',
    reference: 'UNCAT 第3條、聯合國禁止酷刑委員會第4號一般性意見'
  },
  {
    id: 'icescr-1',
    category: '經濟社會文化權利 (ICESCR)',
    level: '進階',
    question: '關於經濟社會與文化權利國際公約（ICESCR）所稱之「逐步實現」（Progressive Realization）原則，下列敘述何者正確？',
    options: [
      { text: '國家可以資源匱乏為由無限期推遲履行公約義務', isCorrect: false },
      { text: '國家有義務運用其所能獲得的最大資源，採取一切適當措施以逐步達成各項權利的充分實現', isCorrect: true },
      { text: '逐步實現僅限於立法機關之方針，不具任何司法拘束力', isCorrect: false },
      { text: '即使國家採取倒退性措施（Retrogressive measures），亦無須承擔嚴格之舉證說明責任', isCorrect: false }
    ],
    explanation: 'ICESCR 第2條第1項規定，締約國承擔義務，個別及通過國際協助和合作，特別是在經濟和技術方面的援助，採取步驟，特別是立法措施，最大程度地利用其可獲得資源，以逐步達成完全實現本公約所承認之權利。倒退性措施在原則上受嚴格禁止，除非能證明已充分考慮所有替代方案並具客觀正當性。',
    reference: 'ICESCR 第2條第1項、第3號一般性意見'
  },
  {
    id: 'cedaw-1',
    category: '性別平等與 CEDAW',
    level: '實務',
    question: '依消除對婦女一切形式歧視公約（CEDAW）第4條，締約國為加速實現男女事實上的平等而採取的「暫行特別措施」（Affirmative Action / Temporary Special Measures），性質為何？',
    options: [
      { text: '構成對男性的反向性別歧視，原則上受禁止', isCorrect: false },
      { text: '不得被視為歧視，但該措施在男女平等待遇目標達成後即應停止', isCorrect: true },
      { text: '必須永久存在，不得因客觀指標改善而取消', isCorrect: false },
      { text: '僅能適用於私營企業，政府公職選舉不得採取性別保障名額', isCorrect: false }
    ],
    explanation: 'CEDAW 第4條第1項明確規範：為加速實現男女事實上的平等而採取的暫行特別措施，不得視為本公約所指的歧視；但這些措施絕不得導致維持不平等的或單獨的標準，並在男女機會和待遇平等的目標達成後，應予終止。我國憲法增修條文之婦女當選保障名額亦本於此精神。',
    reference: 'CEDAW 第4條、第25號一般性建議'
  },
  {
    id: 'const-1',
    category: '台灣憲政判決與正當法律程序',
    level: '實務案例',
    question: '司法院釋字第708號及第710號解釋，針對外國人收容（行政收容）制度宣告違憲，其核心理由為違反下列哪項原則？',
    options: [
      { text: '違反租稅法定主義', isCorrect: false },
      { text: '行政機關逕行收容而未即時提供受收容人受「法官審查」及司法救濟之正當法律程序', isCorrect: true },
      { text: '外國人依法享有完全不具居留事由即可永久居留之特權', isCorrect: false },
      { text: '違反罪刑法定主義之從新從輕原則', isCorrect: false }
    ],
    explanation: '大法官在釋字第708號及第710號解釋中闡明：人身自由為保障一切自由權利之基礎，凡受公權力拘束人身自由之外國人或受收容人，皆應享有受憲法第8條及正當法律程序保障之權利，行政機關收容決定須於法定期限內由公正獨立之法官審查其必要性。',
    reference: '司法院釋字第708號、第710號解釋'
  }
];

export const TOPIC_CATEGORIES = [
  '全部題目',
  '公民與政治權利 (ICCPR)',
  '經濟社會文化權利 (ICESCR)',
  '禁止酷刑公約 (UNCAT)',
  '性別平等與 CEDAW',
  '台灣憲政判決與正當法律程序'
];
