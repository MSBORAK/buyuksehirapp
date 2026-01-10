export interface TransportRoute {
  id: string;
  name: string;
  number: string;
  startPoint: string;
  endPoint: string;
  stops: TransportStop[];
  price: string;
  frequency: string;
  operatingHours: string;
}

export interface TransportStop {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  order: number;
}

export const transportRoutes: TransportRoute[] = [
  {
    id: '1',
    name: 'Şehir Merkezi - Havalimanı',
    number: '1',
    startPoint: 'Şehir Merkezi',
    endPoint: 'Şanlıurfa Havalimanı',
    stops: [
      { id: 's1', name: 'Şehir Merkezi', location: { latitude: 37.1583, longitude: 38.7953 }, order: 1 },
      { id: 's2', name: 'Kültür Park', location: { latitude: 37.1650, longitude: 38.8000 }, order: 2 },
      { id: 's3', name: 'Havalimanı', location: { latitude: 37.0911, longitude: 38.8489 }, order: 3 },
    ],
    price: '15 TL',
    frequency: 'Her 30 dakikada bir',
    operatingHours: '06:00 - 23:00',
  },
  {
    id: '2',
    name: 'Balıklıgöl - Göbeklitepe',
    number: '2',
    startPoint: 'Balıklıgöl',
    endPoint: 'Göbeklitepe',
    stops: [
      { id: 's4', name: 'Balıklıgöl', location: { latitude: 37.1583, longitude: 38.7953 }, order: 1 },
      { id: 's5', name: 'Şehir Merkezi', location: { latitude: 37.1583, longitude: 38.7953 }, order: 2 },
      { id: 's6', name: 'Göbeklitepe', location: { latitude: 37.2233, longitude: 38.9224 }, order: 3 },
    ],
    price: '20 TL',
    frequency: 'Her saat başı',
    operatingHours: '08:00 - 20:00',
  },
  {
    id: '3',
    name: 'Şehir Merkezi - Halfeti',
    number: '3',
    startPoint: 'Şehir Merkezi',
    endPoint: 'Halfeti',
    stops: [
      { id: 's7', name: 'Şehir Merkezi', location: { latitude: 37.1583, longitude: 38.7953 }, order: 1 },
      { id: 's8', name: 'Birecik', location: { latitude: 37.0256, longitude: 37.9778 }, order: 2 },
      { id: 's9', name: 'Halfeti', location: { latitude: 37.2453, longitude: 37.8686 }, order: 3 },
    ],
    price: '25 TL',
    frequency: 'Her 2 saatte bir',
    operatingHours: '07:00 - 19:00',
  },
];

export interface UrfaKartInfo {
  cardNumber: string;
  balance: number;
  lastTransaction?: {
    date: string;
    amount: number;
    type: 'charge' | 'payment';
    location: string;
  };
}
