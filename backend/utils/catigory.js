const genreMap = {
  romantic: [
    "حب", "رومانسية", "قصة حب", "علاقات", "رومانسية معاصرة", "رومانسية عاطفية", "دراما رومانسية",
    "Love", "Romance", "Love Story", "Relationships", "Contemporary Romance", "Emotional Romance", "Romantic Drama",
    "Amour", "Romance", "Histoire d’amour", "Relations", "Romance contemporaine", "Romance émotionnelle", "Drame romantique",
    "Amor", "Romance", "Historia de amor", "Relaciones", "Romance contemporáneo", "Romance emocional", "Drama romántico",
    "Liebe", "Romantik", "Liebesgeschichte", "Beziehungen", "Zeitgenössische Romantik", "Emotionale Romantik", "Romantisches Drama",
    "Amore", "Romanzo", "Storia d’amore", "Relazioni", "Romanzo contemporaneo", "Romanzo emotivo", "Dramma romantico",
    "Aşk", "Romantik", "Aşk Hikayesi", "İlişkiler", "Çağdaş Romantik", "Duygusal Romantik", "Romantik Drama",
    "爱情", "浪漫", "爱情故事", "关系", "当代浪漫", "情感浪漫", "浪漫剧情",
    "恋愛", "ロマンス", "ラブストーリー", "関係", "現代ロマンス", "感情ロマンス", "ロマンチックドラマ",
    "사랑", "로맨스", "러브스토리", "관계", "현대 로맨스", "감정 로맨스", "로맨틱 드라마",
    "Любовь", "Романтика", "История любви", "Отношения", "Современная романтика", "Эмоциональная романтика", "Романтическая драма"
  ],

comedy: [
    "كوميديا", "مرح", "فكاهة", "سخرية", "محاكاة ساخرة", "كوميديا خفيفة", "كوميديا المواقف", "دراما كوميدية",
    "Comedy", "Humor", "Funny", "Satire", "Parody", "Light Comedy", "Situational Comedy", "Comedy Drama",
    "Comédie", "Humour", "Drôle", "Satire", "Parodie", "Comédie légère", "Comédie de situation", "Drame comique",
    "Comedia", "Humor", "Divertido", "Sátira", "Parodia", "Comedia ligera", "Comedia situacional", "Drama cómico",
    "Komödie", "Humor", "Witzig", "Satire", "Parodie", "Leichte Komödie", "Situationskomödie", "Komödiendrama",
    "Commedia", "Umorismo", "Divertente", "Satira", "Parodia", "Commedia leggera", "Commedia situazionale", "Dramma comico",
    "Komedi", "Mizah", "Eğlenceli", "Hiciv", "Parodi", "Hafif Komedi", "Durum Komedisi", "Komedi Drama",
    "喜剧", "幽默", "有趣", "讽刺", "模仿", "轻喜剧", "情景喜剧", "喜剧剧情",
    "コメディ", "ユーモア", "面白い", "風刺", "パロディ", "軽いコメディ", "シチュエーションコメディ", "コメディドラマ",
    "코미디", "유머", "웃긴", "풍자", "패러디", "라이트 코미디", "상황 코미디", "코미디 드라마",
    "Комедия", "Юмор", "Смешной", "Сатира", "Пародия", "Лёгкая комедия", "Ситуационная комедия", "Комедийная драма"
  ],

  action: [
    "أكشن", "قتال", "معارك", "حروب", "فن قتالي", "أكشن عسكري", "أكشن عالي الشدة", "إثارة أكشن",
    "Action", "Fighting", "Combat", "Battles", "Martial Action", "Military Action", "High Intensity Action", "Action Thriller",
    "Action", "Combat", "Batailles", "Guerre", "Arts martiaux", "Action militaire", "Action intense", "Thriller d’action",
    "Acción", "Lucha", "Combate", "Batallas", "Artes marciales", "Acción militar", "Alta intensidad", "Thriller de acción",
    "Action", "Kampf", "Gefechte", "Schlachten", "Kampfsport", "Militäraktion", "Hochintensive Action", "Action-Thriller",
    "Azione", "Combattimento", "Battaglie", "Guerra", "Arti marziali", "Azione militare", "Alta intensità", "Thriller d’azione",
    "Aksiyon", "Dövüş", "Savaş", "Muharebe", "Dövüş sanatları", "Askeri aksiyon", "Yüksek tempolu aksiyon", "Aksiyon gerilim",
    "动作", "格斗", "战斗", "战争", "武术动作", "军事动作", "高强度动作", "动作惊悚",
    "アクション", "戦闘", "バトル", "戦争", "武術アクション", "軍事アクション", "高強度アクション", "アクションスリラー",
    "액션", "전투", "전쟁", "격투", "무술 액션", "군사 액션", "고강도 액션", "액션 스릴러",
    "Экшен", "Бои", "Сражения", "Война", "Боевые искусства", "Военный экшен", "Высокая интенсивность", "Экшен-триллер"
  ],
  drama: [
    "دراما", "دراما عاطفية", "تراجيديا", "قصص حياة", "دراما نفسية", "واقعية", "دراما عائلية",
    "Drama", "Emotional Drama", "Tragedy", "Life Stories", "Psychological Drama", "Realistic Fiction", "Family Drama",
    "Drame", "Drame émotionnel", "Tragédie", "Histoires de vie", "Drame psychologique", "Fiction réaliste", "Drame familial",
"Drama", "Drama emocional", "Tragedia", "Historias de vida", "Drama psicológico", "Ficción realista", "Drama familiar",
    "Drama", "Emotionales Drama", "Tragödie", "Lebensgeschichten", "Psychologisches Drama", "Realistische Fiktion", "Familiendrama",
    "Dramma", "Dramma emotivo", "Tragedia", "Storie di vita", "Dramma psicologico", "Fiction realistica", "Dramma familiare",
    "Drama", "Duygusal Drama", "Trajedi", "Yaşam hikayeleri", "Psikolojik drama", "Gerçekçi kurgu", "Aile draması",
    "剧情", "情感剧", "悲剧", "人生故事", "心理剧", "现实主义", "家庭剧",
    "ドラマ", "感情ドラマ", "悲劇", "人生物語", "心理ドラマ", "リアルフィクション", "家族ドラマ",
    "드라마", "감정 드라마", "비극", "인생 이야기", "심리 드라마", "리얼리즘", "가족 드라마",
    "Драма", "Эмоциональная драма", "Трагедия", "Истории жизни", "Психологическая драма", "Реализм", "Семейная драма"
  ],

  anime: [
    "أنمي", "رسوم متحركة", "أنمي للأطفال", "أنمي عائلي", "أنمي مراهقين", "أنمي بالغين", "أنمي نفسي", "أنمي مظلم", "أنمي أكشن", "أنمي كوميدي",
    "Anime", "Cartoon", "Kids Animation", "Family Animation", "Teen Anime", "Adult Anime", "Psychological Anime", "Dark Anime", "Action Anime", "Comedy Anime",
    "Animation", "Dessins animés", "Animation enfants", "Animation familiale", "Anime adolescent", "Anime adulte", "Anime psychologique", "Anime sombre", "Anime action", "Anime comédie",
    "Animación", "Dibujos animados", "Animación infantil", "Animación familiar", "Anime juvenil", "Anime adulto", "Anime psicológico", "Anime oscuro", "Anime acción", "Anime comedia",
    "Animation", "Cartoon", "Kinderanimation", "Familienanimation", "Teen Anime", "Erwachsenen Anime", "Psychologischer Anime", "Dunkler Anime", "Action Anime", "Comedy Anime",
    "Animazione", "Cartoni", "Animazione bambini", "Animazione familiare", "Anime teen", "Anime adulto", "Anime psicologico", "Anime oscuro", "Anime azione", "Anime commedia",
    "Anime", "Çizgi film", "Çocuk animasyonu", "Aile animasyonu", "Genç anime", "Yetişkin anime", "Psikolojik anime", "Karanlık anime", "Aksiyon anime", "Komedi anime",
    "动漫", "卡通", "儿童动画", "家庭动画", "少年动漫", "成人动漫", "心理动漫", "黑暗动漫", "动作动漫", "喜剧动漫",
    "アニメ", "アニメーション", "子供向け", "ファミリーアニメ", "少年アニメ", "青年アニメ", "心理アニメ", "ダークアニメ", "アクションアニメ", "コメディアニメ",
    "애니메이션", "만화", "어린이 애니", "가족 애니", "청소년 애니", "성인 애니", "심리 애니", "다크 애니", "액션 애니", "코미디 애니",
    "Аниме", "Мультфильм", "Детская анимация", "Семейная анимация", "Подростковое аниме", "Аниме для взрослых", "Психологическое аниме", "Тёмное аниме", "Экшен аниме", "Комедийное аниме"
  ],

  horror: [
    "رعب", "مرعب", "رعب نفسي", "رعب خارق", "رعب دموي", "خيال مظلم", "إثارة رعب",
    "Horror", "Scary", "Psychological Horror", "Supernatural Horror", "Gore Horror", "Dark Fiction", "Thriller Horror",
    "Horreur", "Effrayant", "Horreur psychologique", "Horreur surnaturelle", "Horreur gore", "Fiction sombre", "Thriller horrifique",
    "Terror", "Aterrador", "Horror psicológico", "Horror sobrenatural", "Horror sangriento", "Ficción oscura", "Thriller de terror",
    "Horror", "Gruselig", "Psychologischer Horror", "Übernatürlicher Horror", "Gore Horror", "Dunkle Fiktion", "Horror Thriller",
    "Horror", "Spaventoso", "Horror psicologico", "Soprannaturale", "Gore Horror", "Fiction oscura", "Thriller horror",
    "Korku", "Korkunç", "Psikolojik korku", "Doğaüstü korku", "Kanlı korku", "Karanlık kurgu", "Korku gerilim",
    "恐怖", "惊悚", "心理恐怖", "超自然恐怖", "血腥恐怖", "黑暗小说", "恐怖惊悚",
    "ホラー", "怖い", "心理ホラー", "超自然ホラー", "ゴアホラー", "ダークフィクション", "ホラースリラー",
    "공포", "무서운", "심리 공포", "초자연 공포", "고어 공포", "다크 픽션", "호러 스릴러",
    "Ужасы", "Страшный", "Психологический ужас", "Сверхъестественный ужас", "Горрор", "Тёмная фантастика", "Ужасы триллер"
  ],
  geography: [
    "جغرافيا", "خرائط", "استكشاف", "بيئة", "علوم الأرض", "جيوسياسة", "علوم مكانية",
    "Geography", "Maps", "Exploration", "Environment Studies", "Earth Science", "Geopolitics", "Spatial Science",
    "Géographie", "Cartes", "Exploration", "Études environnementales", "Sciences de la Terre", "Géopolitique", "Science spatiale",
    "Geografía", "Mapas", "Exploración", "Medio ambiente", "Ciencias de la tierra", "Geopolítica", "Ciencia espacial",
    "Geographie", "Karten", "Erkundung", "Umweltwissenschaft", "Erdwissenschaft", "Geopolitik", "Raumwissenschaft",
    "Geografia", "Mappe", "Esplorazione", "Ambiente", "Scienze della terra", "Geopolitica", "Scienza spaziale",
    "Coğrafya", "Haritalar", "Keşif", "Çevre", "Yer bilimi", "Jeopolitik", "Mekânsal bilim",
    "地理", "地图", "探索", "环境研究", "地球科学", "地缘政治", "空间科学",
    "地理学", "地図", "探検", "環境科学", "地球科学", "地政学", "空間科学",
    "지리", "지도", "탐험", "환경학", "지구과학", "지정학", "공간과학",
    "География", "Карты", "Исследование", "Экология", "Науки о Земле", "Геополитика", "Пространственные науки"
  ],

philosophy: [
    "فلسفة", "أخلاق", "منطق", "وجودية", "ميتافيزيقا", "تفكير نقدي", "فلسفة الحياة",
    "Philosophy", "Ethics", "Logic", "Existentialism", "Metaphysics", "Critical Thinking", "Life Philosophy",
    "Philosophie", "Éthique", "Logique", "Existentialisme", "Métaphysique", "Pensée critique", "Philosophie de vie",
    "Filosofía", "Ética", "Lógica", "Existencialismo", "Metafísica", "Pensamiento crítico", "Filosofía de vida",
    "Philosophie", "Ethik", "Logik", "Existentialismus", "Metaphysik", "Kritisches Denken", "Lebensphilosophie",
    "Filosofia", "Etica", "Logica", "Esistenzialismo", "Metafisica", "Pensiero critico", "Filosofia della vita",
    "Felsefe", "Etik", "Mantık", "Varoluşçuluk", "Metafizik", "Eleştirel düşünce", "Yaşam felsefesi",
    "哲学", "伦理", "逻辑", "存在主义", "形而上学", "批判性思维", "人生哲学",
    "哲学", "倫理", "論理", "実存主義", "形而上学", "批判的思考", "人生哲学",
    "철학", "윤리", "논리", "실존주의", "형이상학", "비판적 사고", "인생 철학",
    "Философия", "Этика", "Логика", "Экзистенциализм", "Метафизика", "Критическое мышление", "Философия жизни"
  ]
};

module.exports={genreMap}
