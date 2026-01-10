export interface Story {
  id: string;
  title: string;
  category: 'message' | 'event' | 'announcement' | 'gallery';
  imageUrl: string;
  videoUrl?: string;
}

export const stories: Story[] = [
  {
    id: '1',
    title: "Başkan'ın Mesajı",
    category: 'message',
    imageUrl: 'https://picsum.photos/400/800?random=1',
  },
  {
    id: '2',
    title: 'Günün Etkinliği',
    category: 'event',
    imageUrl: 'https://picsum.photos/400/800?random=2',
  },
  {
    id: '3',
    title: 'Acil Duyurular',
    category: 'announcement',
    imageUrl: 'https://picsum.photos/400/800?random=3',
  },
  {
    id: '4',
    title: 'Şehirden Kareler',
    category: 'gallery',
    imageUrl: 'https://picsum.photos/400/800?random=4',
  },
];

export interface News {
  id: string;
  title: string;
  summary: string;
  imageUrl: string;
  date: string;
}

export const news: News[] = [
  {
    id: '1',
    title: 'Şanlıurfa\'da Yeni Kültür Merkezi Açıldı',
    summary: 'Modern sanat galerisi ve etkinlik alanları ile hizmet vermeye başladı.',
    imageUrl: 'https://picsum.photos/800/600?random=10',
    date: '2024-01-15',
  },
  {
    id: '2',
    title: 'Göbeklitepe Ziyaretçi Rekoru Kırdı',
    summary: 'Bu yıl 2 milyon ziyaretçi ile tarihi rekor kırıldı.',
    imageUrl: 'https://picsum.photos/800/600?random=11',
    date: '2024-01-14',
  },
  {
    id: '3',
    title: 'Şehir Merkezinde Yeni Park Alanı',
    summary: 'Vatandaşlarımızın hizmetine sunulan modern park alanı büyük ilgi görüyor.',
    imageUrl: 'https://picsum.photos/800/600?random=12',
    date: '2024-01-13',
  },
];

export interface TouristSpot {
  id: string;
  name: {
    tr: string;
    en: string;
    ar: string;
  };
  category: 'historical' | 'religious' | 'natural' | 'cultural';
  description: {
    tr: string;
    en: string;
    ar: string;
  };
  shortDescription: {
    tr: string;
    en: string;
    ar: string;
  };
  imageUrl: string;
  images: string[];
  location: {
    latitude: number;
    longitude: number;
    address: {
      tr: string;
      en: string;
    };
  };
  openingHours: string;
  ticketPrice?: string;
  rating: number;
  visitDuration: string;
  tags: string[];
}

export const touristSpots: TouristSpot[] = [
  {
    id: '1',
    name: {
      tr: 'Göbeklitepe',
      en: 'Gobekli Tepe',
      ar: 'غوبيكلي تبه',
    },
    category: 'historical',
    description: {
      tr: 'Göbeklitepe, dünyanın bilinen en eski tapınak kompleksi. MÖ 9600-8200 yıllarına tarihlenen bu arkeolojik site, insanlık tarihinin en önemli keşiflerinden biri. UNESCO Dünya Mirası Listesi\'nde yer alan Göbeklitepe, Şanlıurfa\'nın 15 km kuzeydoğusunda bulunmaktadır.',
      en: 'Gobekli Tepe is the world\'s oldest known temple complex, dating back to 9600-8200 BC. This archaeological site is one of the most important discoveries in human history. Located 15 km northeast of Şanlıurfa, Gobekli Tepe is on the UNESCO World Heritage List.',
      ar: 'غوبيكلي تبه هو أقدم مجمع معابد معروف في العالم، يعود تاريخه إلى 9600-8200 قبل الميلاد. هذا الموقع الأثري هو واحد من أهم الاكتشافات في تاريخ البشرية.',
    },
    shortDescription: {
      tr: 'Dünyanın en eski tapınak kompleksi, UNESCO Dünya Mirası',
      en: 'World\'s oldest temple complex, UNESCO World Heritage',
      ar: 'أقدم مجمع معابد في العالم، تراث عالمي لليونسكو',
    },
    imageUrl: 'https://picsum.photos/800/600?random=20',
    images: [
      'https://picsum.photos/800/600?random=20',
      'https://picsum.photos/800/600?random=21',
      'https://picsum.photos/800/600?random=22',
    ],
    location: {
      latitude: 37.2233,
      longitude: 38.9224,
      address: {
        tr: 'Örencik, Şanlıurfa Merkez, Şanlıurfa',
        en: 'Örencik, Şanlıurfa Center, Şanlıurfa',
      },
    },
    openingHours: '08:00 - 19:00 (Yaz), 08:00 - 17:00 (Kış)',
    ticketPrice: '150 TL',
    rating: 4.9,
    visitDuration: '2-3 saat',
    tags: ['UNESCO', 'Tarih', 'Arkeoloji', 'Tapınak'],
  },
  {
    id: '2',
    name: {
      tr: 'Balıklıgöl',
      en: 'Fish Lake (Balıklıgöl)',
      ar: 'بركة إبراهيم',
    },
    category: 'religious',
    description: {
      tr: 'Balıklıgöl, İbrahim Peygamber\'in ateşe atıldığına inanılan kutsal mekan. Gölde yaşayan balıkların kutsal olduğuna inanılır ve yenilmezler. Şanlıurfa\'nın en önemli turistik ve dini merkezlerinden biridir.',
      en: 'Balıklıgöl is the sacred site where Prophet Abraham is believed to have been thrown into the fire. The fish in the lake are considered sacred and are not eaten. It is one of Şanlıurfa\'s most important tourist and religious centers.',
      ar: 'بركة إبراهيم هو المكان المقدس حيث يُعتقد أن النبي إبراهيم أُلقي في النار. تعتبر الأسماك في البحيرة مقدسة ولا تؤكل.',
    },
    shortDescription: {
      tr: 'İbrahim Peygamber\'in kutsal mekanı, tarihi göl',
      en: 'Sacred site of Prophet Abraham, historic lake',
      ar: 'المكان المقدس للنبي إبراهيم، بحيرة تاريخية',
    },
    imageUrl: 'https://picsum.photos/800/600?random=30',
    images: [
      'https://picsum.photos/800/600?random=30',
      'https://picsum.photos/800/600?random=31',
      'https://picsum.photos/800/600?random=32',
    ],
    location: {
      latitude: 37.1583,
      longitude: 38.7953,
      address: {
        tr: 'Balıklıgöl, Şanlıurfa Merkez, Şanlıurfa',
        en: 'Balıklıgöl, Şanlıurfa Center, Şanlıurfa',
      },
    },
    openingHours: '24 saat açık',
    ticketPrice: 'Ücretsiz',
    rating: 4.8,
    visitDuration: '1 saat',
    tags: ['Dini', 'Kutsal', 'Doğa', 'Tarih'],
  },
  {
    id: '3',
    name: {
      tr: 'Şanlıurfa Kalesi',
      en: 'Şanlıurfa Castle',
      ar: 'قلعة أورفا',
    },
    category: 'historical',
    description: {
      tr: 'Şanlıurfa Kalesi, şehrin en yüksek noktasında konumlanmış tarihi bir yapı. Efsaneye göre İbrahim Peygamber\'in doğduğu mağara bu kalede yer alır. Kaleden şehrin panoramik manzarasını görebilirsiniz.',
      en: 'Şanlıurfa Castle is a historic structure located at the highest point of the city. According to legend, the cave where Prophet Abraham was born is located in this castle. You can see the panoramic view of the city from the castle.',
      ar: 'قلعة أورفا هي هيكل تاريخي يقع في أعلى نقطة في المدينة. وفقًا للأسطورة، الكهف حيث ولد النبي إبراهيم يقع في هذه القلعة.',
    },
    shortDescription: {
      tr: 'Tarihi kale, panoramik manzara',
      en: 'Historic castle, panoramic view',
      ar: 'قلعة تاريخية، منظر بانورامي',
    },
    imageUrl: 'https://picsum.photos/800/600?random=40',
    images: [
      'https://picsum.photos/800/600?random=40',
      'https://picsum.photos/800/600?random=41',
    ],
    location: {
      latitude: 37.1589,
      longitude: 38.7964,
      address: {
        tr: 'Kale Mahallesi, Şanlıurfa Merkez, Şanlıurfa',
        en: 'Kale Neighborhood, Şanlıurfa Center, Şanlıurfa',
      },
    },
    openingHours: '09:00 - 19:00',
    ticketPrice: '50 TL',
    rating: 4.6,
    visitDuration: '1-2 saat',
    tags: ['Tarih', 'Manzara', 'Kale', 'Arkeoloji'],
  },
  {
    id: '4',
    name: {
      tr: 'Halfeti',
      en: 'Halfeti',
      ar: 'نصفطى',
    },
    category: 'natural',
    description: {
      tr: 'Halfeti, Birecik Barajı\'nın suları altında kalan tarihi bir kasaba. Siyah gülü ile ünlü Halfeti, tekne turları ve su sporları ile ziyaretçilerini büyülüyor. Yarım ada şeklindeki konumu ile benzersiz bir doğal güzelliğe sahip.',
      en: 'Halfeti is a historic town submerged by the waters of Birecik Dam. Famous for its black roses, Halfeti enchants visitors with boat tours and water sports. With its peninsula-like location, it has a unique natural beauty.',
      ar: 'نصفطى هي بلدة تاريخية غمرتها مياه سد بيرجيك. تشتهر بالورود السوداء، نصفطى تسحر الزوار بجولات القوارب والرياضات المائية.',
    },
    shortDescription: {
      tr: 'Siyah gül diyarı, tekne turu, doğal güzellik',
      en: 'Land of black roses, boat tours, natural beauty',
      ar: 'أرض الورود السوداء، جولات بالقوارب، جمال طبيعي',
    },
    imageUrl: 'https://picsum.photos/800/600?random=50',
    images: [
      'https://picsum.photos/800/600?random=50',
      'https://picsum.photos/800/600?random=51',
      'https://picsum.photos/800/600?random=52',
    ],
    location: {
      latitude: 37.2453,
      longitude: 37.8686,
      address: {
        tr: 'Halfeti, Şanlıurfa',
        en: 'Halfeti, Şanlıurfa',
      },
    },
    openingHours: '08:00 - 20:00',
    ticketPrice: 'Tekne turu: 100 TL',
    rating: 4.7,
    visitDuration: 'Yarım gün',
    tags: ['Doğa', 'Tekne Turu', 'Fotoğraf', 'Dinlenme'],
  },
];
