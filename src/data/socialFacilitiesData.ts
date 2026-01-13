export type FacilityCategory = 'sport' | 'library' | 'youth' | 'park';

export interface SocialFacility {
  id: string;
  name: {
    tr: string;
    en: string;
    ar: string;
  };
  category: FacilityCategory;
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
  phone?: string;
  website?: string;
  features: string[];
  rating: number;
  isFeatured: boolean;
}

export const socialFacilities: SocialFacility[] = [

  {
    id: 'sport-1',
    name: {
      tr: 'Şanlıurfa Olimpik Yüzme Havuzu',
      en: 'Şanlıurfa Olympic Swimming Pool',
      ar: 'حمام سباحة أولمبي شانلي أورفا',
    },
    category: 'sport',
    description: {
      tr: 'Modern yüzme havuzu ve spor kompleksi. Olimpik standartlarda yüzme havuzu, fitness salonu ve sauna hizmetleri sunmaktadır.',
      en: 'Modern swimming pool and sports complex. Offers Olympic standard swimming pool, fitness center and sauna services.',
      ar: 'مجمع سباحة ورياضة حديث. يقدم مسبح بمعايير أولمبية ومركز لياقة بدنية وخدمات ساونا.',
    },
    shortDescription: {
      tr: 'Olimpik standartlarda yüzme havuzu ve spor kompleksi',
      en: 'Olympic standard swimming pool and sports complex',
      ar: 'مسبح بمعايير أولمبية ومجمع رياضي',
    },
    images: ['https://images.unsplash.com/photo-1571902943202-507ec2618e8f'],
    location: {
      latitude: 37.1674,
      longitude: 38.7955,
      address: {
        tr: 'Merkez, Şanlıurfa',
        en: 'Center, Şanlıurfa',
      },
    },
    openingHours: '06:00 - 22:00',
    phone: '+90 414 123 4567',
    features: ['Olimpik Havuz', 'Fitness Salonu', 'Sauna', 'Jakuzi', 'Park Alanı'],
    rating: 4.8,
    isFeatured: true,
  },
  {
    id: 'library-1',
    name: {
      tr: 'Şanlıurfa Merkez Kütüphanesi',
      en: 'Şanlıurfa Central Library',
      ar: 'مكتبة شانلي أورفا المركزية',
    },
    category: 'library',
    description: {
      tr: 'Geniş kitap koleksiyonu, çalışma salonları ve dijital kaynaklara erişim imkanı sunan modern kütüphane.',
      en: 'Modern library offering extensive book collection, study halls and access to digital resources.',
      ar: 'مكتبة حديثة تقدم مجموعة كتب واسعة وقاعات دراسة ووصول إلى الموارد الرقمية.',
    },
    shortDescription: {
      tr: 'Geniş koleksiyon ve modern çalışma alanları',
      en: 'Extensive collection and modern study areas',
      ar: 'مجموعة واسعة ومناطق دراسة حديثة',
    },
    images: ['https://images.unsplash.com/photo-1481627834876-b7833e8f5570'],
    location: {
      latitude: 37.1594,
      longitude: 38.7945,
      address: {
        tr: 'Merkez, Şanlıurfa',
        en: 'Center, Şanlıurfa',
      },
    },
    openingHours: '08:00 - 18:00 (Hafta içi), 10:00 - 16:00 (Hafta sonu)',
    phone: '+90 414 123 4569',
    features: ['Okuma Salonu', 'Çalışma Odaları', 'Dijital Kütüphane', 'Çocuk Bölümü', 'Wi-Fi'],
    rating: 4.7,
    isFeatured: true,
  },
  {
    id: 'youth-1',
    name: {
      tr: 'Şanlıurfa Gençlik Merkezi',
      en: 'Şanlıurfa Youth Center',
      ar: 'مركز شباب شانلي أورفا',
    },
    category: 'youth',
    description: {
      tr: 'Gençler için kurslar, atölyeler, sosyal aktiviteler ve rehberlik hizmetleri sunan modern gençlik merkezi.',
      en: 'Modern youth center offering courses, workshops, social activities and counseling services for young people.',
      ar: 'مركز شباب حديث يقدم دورات وورش عمل وأنشطة اجتماعية وخدمات إرشادية للشباب.',
    },
    shortDescription: {
      tr: 'Gençler için kurslar ve sosyal aktiviteler',
      en: 'Courses and social activities for youth',
      ar: 'دورات وأنشطة اجتماعية للشباب',
    },
    images: ['https://images.unsplash.com/photo-1522202176988-66273c2fd55f'],
    location: {
      latitude: 37.1645,
      longitude: 38.7967,
      address: {
        tr: 'Eyyübiye, Şanlıurfa',
        en: 'Eyyübiye, Şanlıurfa',
      },
    },
    openingHours: '09:00 - 20:00',
    phone: '+90 414 123 4570',
    features: ['Kurslar', 'Atölyeler', 'Sosyal Alanlar', 'Rehberlik', 'Bilgisayar Laboratuvarı'],
    rating: 4.9,
    isFeatured: true,
  },
  {
    id: 'park-1',
    name: {
      tr: 'Balıklıgöl',
      en: 'Balıklıgöl',
      ar: 'باليكليغول',
    },
    category: 'park',
    description: {
      tr: 'Şanlıurfa\'nın en ünlü parkı. Tarihi Balıklıgöl\'ün yanında yer alan, yürüyüş yolları, çocuk oyun alanları ve dinlenme alanları ile donatılmış büyük park.',
      en: 'Şanlıurfa\'s most famous park. Large park located next to the historic Balıklıgöl, equipped with walking paths, children\'s playgrounds and rest areas.',
      ar: 'أشهر حديقة في شانلي أورفا. حديقة كبيرة تقع بجوار باليكليغول التاريخي، مجهزة بمسارات للمشي وملاعب للأطفال ومناطق للراحة.',
    },
    shortDescription: {
      tr: 'Tarihi Balıklıgöl yanında büyük park',
      en: 'Large park next to historic Balıklıgöl',
      ar: 'حديقة كبيرة بجوار باليكليغول التاريخي',
    },
    images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e'],
    location: {
      latitude: 37.1583,
      longitude: 38.7944,
      address: {
        tr: 'Merkez, Şanlıurfa',
        en: 'Center, Şanlıurfa',
      },
    },
    openingHours: '24 saat açık',
    features: ['Yürüyüş Yolları', 'Çocuk Oyun Alanı', 'Dinlenme Alanları', 'Kafeterya', 'Wifi'],
    rating: 4.9,
    isFeatured: true,
  },
];
