export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  location: {
    latitude: number;
    longitude: number;
  };
  isOnDuty: boolean;
  dutyHours?: {
    start: string;
    end: string;
  };
  distance?: number; // in km
}

export const pharmacies: Pharmacy[] = [
  {
    id: '1',
    name: 'Merkez Eczanesi',
    address: 'Şehit Nusret Caddesi No:15, Şanlıurfa Merkez',
    phone: '+90 414 123 4567',
    location: {
      latitude: 37.1583,
      longitude: 38.7953,
    },
    isOnDuty: true,
    dutyHours: {
      start: '08:00',
      end: '20:00',
    },
    distance: 0.5,
  },
  {
    id: '2',
    name: 'Balıklıgöl Eczanesi',
    address: 'Balıklıgöl Mahallesi, Atatürk Bulvarı No:42, Şanlıurfa',
    phone: '+90 414 234 5678',
    location: {
      latitude: 37.1620,
      longitude: 38.7980,
    },
    isOnDuty: true,
    dutyHours: {
      start: '09:00',
      end: '22:00',
    },
    distance: 1.2,
  },
  {
    id: '3',
    name: 'Sağlık Eczanesi',
    address: 'Şehitlik Mahallesi, İnönü Caddesi No:78, Şanlıurfa',
    phone: '+90 414 345 6789',
    location: {
      latitude: 37.1550,
      longitude: 38.7900,
    },
    isOnDuty: false,
    distance: 2.1,
  },
  {
    id: '4',
    name: 'Modern Eczanesi',
    address: 'Kültür Park Yanı, Şanlıurfa',
    phone: '+90 414 456 7890',
    location: {
      latitude: 37.1650,
      longitude: 38.8000,
    },
    isOnDuty: true,
    dutyHours: {
      start: '08:30',
      end: '19:30',
    },
    distance: 1.8,
  },
  {
    id: '5',
    name: 'Özel Eczanesi',
    address: 'Kale Mahallesi, Şanlıurfa Merkez',
    phone: '+90 414 567 8901',
    location: {
      latitude: 37.1589,
      longitude: 38.7964,
    },
    isOnDuty: true,
    dutyHours: {
      start: '24 saat',
      end: '',
    },
    distance: 0.8,
  },
  {
    id: '6',
    name: 'Göbeklitepe Eczanesi',
    address: 'Örencik Mahallesi, Göbeklitepe Yolu, Şanlıurfa',
    phone: '+90 414 678 9012',
    location: {
      latitude: 37.2233,
      longitude: 38.9224,
    },
    isOnDuty: false,
    distance: 15.3,
  },
];
