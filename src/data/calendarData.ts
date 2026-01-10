export interface CultureEvent {
  id: string;
  title: {
    tr: string;
    en: string;
  };
  description: {
    tr: string;
    en: string;
  };
  shortDescription: {
    tr: string;
    en: string;
  };
  category: 'music' | 'theater' | 'exhibition' | 'festival' | 'workshop';
  imageUrl: string;
  date: string;
  time: string;
  location: {
    name: string;
    address: {
      tr: string;
      en: string;
    };
    latitude?: number;
    longitude?: number;
  };
  price: string;
  organizer: string;
  tags: string[];
  featured?: boolean;
}

export const cultureEvents: CultureEvent[] = [
  {
    id: '1',
    title: {
      tr: 'Şanlıurfa Müzik Festivali',
      en: 'Şanlıurfa Music Festival',
    },
    description: {
      tr: 'Geleneksel ve modern müziğin buluştuğu 3 günlük müzik festivali. Yerli ve yabancı sanatçıların katılımıyla gerçekleşecek unutulmaz bir etkinlik.',
      en: 'A 3-day music festival where traditional and modern music meet. An unforgettable event with participation of local and international artists.',
    },
    shortDescription: {
      tr: '3 günlük müzik festivali, yerli ve yabancı sanatçılar',
      en: '3-day music festival, local and international artists',
    },
    category: 'music',
    imageUrl: 'https://picsum.photos/800/600?random=60',
    date: '2024-02-15',
    time: '19:00',
    location: {
      name: 'Şanlıurfa Kültür Merkezi',
      address: {
        tr: 'Kültür Park, Şanlıurfa Merkez',
        en: 'Culture Park, Şanlıurfa Center',
      },
      latitude: 37.1650,
      longitude: 38.8000,
    },
    price: '150 TL',
    organizer: 'Şanlıurfa Büyükşehir Belediyesi',
    tags: ['Müzik', 'Festival', 'Konser'],
    featured: true,
  },
  {
    id: '2',
    title: {
      tr: 'Göbeklitepe Fotoğraf Sergisi',
      en: 'Gobekli Tepe Photography Exhibition',
    },
    description: {
      tr: 'Ünlü fotoğrafçıların Göbeklitepe\'yi objektifine yansıttığı özel sergi. 2 ay boyunca ziyaretçilere açık olacak.',
      en: 'A special exhibition where famous photographers capture Gobekli Tepe through their lenses. Open to visitors for 2 months.',
    },
    shortDescription: {
      tr: 'Göbeklitepe\'yi objektifine yansıtan özel fotoğraf sergisi',
      en: 'Special photography exhibition capturing Gobekli Tepe',
    },
    category: 'exhibition',
    imageUrl: 'https://picsum.photos/800/600?random=61',
    date: '2024-01-20',
    time: '10:00',
    location: {
      name: 'Şanlıurfa Sanat Galerisi',
      address: {
        tr: 'Balıklıgöl, Şanlıurfa Merkez',
        en: 'Balıklıgöl, Şanlıurfa Center',
      },
      latitude: 37.1583,
      longitude: 38.7953,
    },
    price: 'Ücretsiz',
    organizer: 'Şanlıurfa Kültür ve Turizm Müdürlüğü',
    tags: ['Fotoğraf', 'Sergi', 'Göbeklitepe'],
    featured: true,
  },
  {
    id: '3',
    title: {
      tr: 'Geleneksel Türk Tiyatrosu: Meddah',
      en: 'Traditional Turkish Theater: Meddah',
    },
    description: {
      tr: 'Geleneksel Türk tiyatrosunun önemli bir türü olan Meddah gösterisi. Ünlü Meddah sanatçısı tarafından sahnelenecek.',
      en: 'A Meddah show, an important genre of traditional Turkish theater. Performed by a famous Meddah artist.',
    },
    shortDescription: {
      tr: 'Geleneksel Türk tiyatrosu Meddah gösterisi',
      en: 'Traditional Turkish theater Meddah show',
    },
    category: 'theater',
    imageUrl: 'https://picsum.photos/800/600?random=62',
    date: '2024-01-25',
    time: '20:00',
    location: {
      name: 'Şehir Tiyatrosu',
      address: {
        tr: 'Şehir Merkezi, Şanlıurfa',
        en: 'City Center, Şanlıurfa',
      },
    },
    price: '75 TL',
    organizer: 'Şanlıurfa Şehir Tiyatrosu',
    tags: ['Tiyatro', 'Geleneksel', 'Meddah'],
  },
  {
    id: '4',
    title: {
      tr: 'Müzik Atölyesi: Bağlama Çalmayı Öğren',
      en: 'Music Workshop: Learn to Play Bağlama',
    },
    description: {
      tr: 'Bağlama çalmayı öğrenmek isteyenler için başlangıç seviyesi atölye. Deneyimli müzisyenler eşliğinde temel teknikleri öğreneceksiniz.',
      en: 'A beginner-level workshop for those who want to learn to play bağlama. You will learn basic techniques with experienced musicians.',
    },
    shortDescription: {
      tr: 'Bağlama çalmayı öğrenmek için başlangıç atölyesi',
      en: 'Beginner workshop to learn playing bağlama',
    },
    category: 'workshop',
    imageUrl: 'https://picsum.photos/800/600?random=63',
    date: '2024-01-28',
    time: '14:00',
    location: {
      name: 'Kültür Merkezi Atölye Salonu',
      address: {
        tr: 'Kültür Merkezi, Şanlıurfa',
        en: 'Culture Center, Şanlıurfa',
      },
    },
    price: '200 TL',
    organizer: 'Şanlıurfa Müzik Derneği',
    tags: ['Atölye', 'Müzik', 'Bağlama'],
  },
  {
    id: '5',
    title: {
      tr: 'Şanlıurfa Bahar Festivali',
      en: 'Şanlıurfa Spring Festival',
    },
    description: {
      tr: 'Şanlıurfa\'nın en büyük kültürel etkinliği. 5 gün boyunca müzik, dans, tiyatro ve sergilerle dolu dopdolu bir program.',
      en: 'Şanlıurfa\'s biggest cultural event. A full program with music, dance, theater and exhibitions for 5 days.',
    },
    shortDescription: {
      tr: '5 günlük kapsamlı kültür ve sanat festivali',
      en: '5-day comprehensive culture and arts festival',
    },
    category: 'festival',
    imageUrl: 'https://picsum.photos/800/600?random=64',
    date: '2024-03-10',
    time: '10:00',
    location: {
      name: 'Kültür Park',
      address: {
        tr: 'Kültür Park, Şanlıurfa Merkez',
        en: 'Culture Park, Şanlıurfa Center',
      },
    },
    price: 'Festival: 300 TL',
    organizer: 'Şanlıurfa Büyükşehir Belediyesi',
    tags: ['Festival', 'Müzik', 'Dans', 'Tiyatro'],
    featured: true,
  },
];
