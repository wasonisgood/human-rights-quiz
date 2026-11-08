// 國際人權公約體系與法學辭典
export const CORE_CONVENTIONS = [
  {
    id: 'iccpr',
    abbr: 'ICCPR',
    name: '公民與政治權利國際公約',
    enName: 'International Covenant on Civil and Political Rights',
    year: '1966年通過 / 台灣2009年施行法通過',
    desc: '確立生命權、禁止酷刑、人身自由、受公平審判權、言論與結社自由、隱私權以及投票參政權等核心第一代人權。在台灣透過《公民與政治權利國際公約及經濟社會文化權利國際公約施行法》具備國內法律位階與優先適用力。',
    articles: [
      { num: '第6條', title: '固有生命權', summary: '生命權為最高價值，非依法定正當程序不得剝奪，緊急狀態下亦不得克減。' },
      { num: '第7條', title: '禁止酷刑與不人道待遇', summary: '任何人均不得施以酷刑，或殘忍、不人道或侮辱之處遇或懲罰。' },
      { num: '第9條', title: '人身自由與人身安全', summary: '任何人不得遭受任意逮捕或拘禁，遭剝奪自由者有權受法院迅速決定其羈押合法性（提審權）。' },
      { num: '第14條', title: '法庭平等與公平審判', summary: '受獨立無偏倚審判、無罪推定、受律師協助、不自證己罪。' },
      { num: '第19條', title: '意見與言論自由', summary: '尋求、接受及傳播各種資訊及思想之自由，限制須符法律保留與合比例原則。' }
    ]
  },
  {
    id: 'icescr',
    abbr: 'ICESCR',
    name: '經濟社會文化權利國際公約',
    enName: 'International Covenant on Economic, Social and Cultural Rights',
    year: '1966年通過 / 台灣2009年施行法通過',
    desc: '保障工作權、公正良好之工作條件、組織工會權、社會保障、適足生活水準（含食物與居住權）、身心健康權及受教育權等第二代實質人權，國家負有「最大可利用資源逐步實現」與「禁止倒退」之法定義務。',
    articles: [
      { num: '第6條', title: '工作權', summary: '人人享有自由選擇或接受其所願從事工作以謀生之權利。' },
      { num: '第11條', title: '適足生活水準與居住權', summary: '人人有權享受其本人及家屬之適當食物、衣著與住房，嚴格禁止任意強制驅離。' },
      { num: '第12條', title: '身心健康最高標準', summary: '人人享有能達到之最高身心健康標準，國家應保障醫療衛生服務之可及性。' }
    ]
  },
  {
    id: 'uncat',
    abbr: 'UNCAT',
    name: '禁止酷刑和其他殘忍、不人道或有辱人格的待遇或處罰公約',
    enName: 'Convention against Torture',
    year: '1984年通過 / 國際強行法（Jus Cogens）位階',
    desc: '全面性禁止國家公權力或其指使之任何人施加身體或精神酷刑，確立著名的「不遣返原則」（第3條）及「酷刑自白排除原則」（第15條），明定任何緊急狀態或上級命令皆不得作為抗辯事由。',
    articles: [
      { num: '第1條', title: '酷刑之法律定義', summary: '公職人員為取得口供、懲罰或脅迫所蓄意造成劇烈身心痛苦之行為。' },
      { num: '第3條', title: '不遣返原則', summary: '若有實質理由確信將面臨酷刑危險，締約國絕對不得驅逐或引渡該人。' },
      { num: '第15條', title: '自白證據排除', summary: '經由酷刑取得之陳述，於任何程序中皆不得採為證據。' }
    ]
  },
  {
    id: 'cedaw',
    abbr: 'CEDAW',
    name: '消除對婦女一切形式歧視公約',
    enName: 'Convention on the Elimination of All Forms of Discrimination against Women',
    year: '1979年通過 / 台灣2011年通過施行法',
    desc: '被譽為「婦女人權憲章」，致力於消除在政治、經濟、社會、文化、公民家庭生活各領域對婦女的差別待遇，推動實質平等與暫行特別措施（Affirmative Action）。',
    articles: [
      { num: '第1條', title: '歧視之定義', summary: '基於性別所作之任何區別、排斥或限制，具有損害或妨礙婦女人權與基本自由享有之目的或後果。' },
      { num: '第4條', title: '暫行特別措施', summary: '為加速實質平等採取的積極平權措施不構成歧視，目標達成後終止。' },
      { num: '第11條', title: '就業領域之平權', summary: '消除同工不同酬、產假歧視及招募過程中的性別門檻。' }
    ]
  }
];

export const LEGAL_GLOSSARY = [
  {
    term: '不遣返原則 (Non-refoulement)',
    category: '國際難民法與酷刑防杜',
    def: '國際人權法的核心基石。禁止將任何人驅逐、遣返或引渡至其生命、自由可能受到威脅或可能遭受酷刑、殘忍虐待的國家或領地。具有國際強行法（Jus Cogens）地位。'
  },
  {
    term: '比例原則 (Principle of Proportionality)',
    category: '公法審查與人權限制',
    def: '公權力限制人民基本權利時必須遵守的憲法審查基準，包含三個位階：適當性（手段有助目的達成）、必要性（採取侵害最小之手段）、衡平性（所獲公益與所損私益間不得顯失均衡）。'
  },
  {
    term: '法律保留原則 (Vorbehalt des Gesetzes)',
    category: '法治國原則',
    def: '國家公權力限制人民身體自由、言論、財產或課予實體義務時，必須有國會正式制定的法律作為依據；法律若授權法規命令補充，授權之目的、內容及範圍必須具體明確。'
  },
  {
    term: '實質正當法律程序 (Substantive Due Process)',
    category: '憲政司法審查',
    def: '公權力之行使不僅在程序上須具備聽證、通知、送達等手續，其立法目的與內容實質上亦必須公平、理性且合乎實質正義，不得制定殘酷、專斷或恣意侵害人性尊嚴之法律。'
  },
  {
    term: '轉型正義四本柱 (Four Pillars of Transitional Justice)',
    category: '轉型正義',
    def: '依聯合國轉型正義特別報告員之權威定義，包括：真相調查（Truth）、司法追訴與不法平復（Justice）、名譽權利回復與賠償（Reparations），以及制度改革以保證不再發生（Guarantees of Non-recurrence）。'
  }
];
