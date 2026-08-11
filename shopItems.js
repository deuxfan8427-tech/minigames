export const SHOP_ITEMS = [
  { id: 'ball_default', category: 'ball', name: '기본 공', price: 0, value: '#ffffff' },
  { id: 'ball_neon', category: 'ball', name: '네온 핑크 공', price: 600, value: '#ff2d95' },
  { id: 'ball_ice', category: 'ball', name: '아이스 공', price: 900, value: '#7fdbff' },
  { id: 'ball_gold', category: 'ball', name: '골드 공', price: 1200, value: '#ffd700' },

  { id: 'paddle_default', category: 'paddle', name: '기본 막대', price: 0, value: '#e8e8f5' },
  { id: 'paddle_neon', category: 'paddle', name: '네온 그린 막대', price: 600, value: '#39ff14' },
  { id: 'paddle_purple', category: 'paddle', name: '퍼플 막대', price: 900, value: '#a29bfe' },
  { id: 'paddle_gold', category: 'paddle', name: '골드 막대', price: 1200, value: '#ffd700' },

  { id: 'car_default', category: 'car', name: '기본 자동차', price: 0, value: '#4f8cff' },
  { id: 'car_red', category: 'car', name: '레드 스포츠카', price: 800, value: '#ff4757' },
  { id: 'car_black', category: 'car', name: '블랙 세단', price: 1100, value: '#2f3542' },
  { id: 'car_gold', category: 'car', name: '골드 리무진', price: 1400, value: '#ffd700' },

  { id: 'snake_default', category: 'snake', name: '기본 뱀', price: 0, headColor: '#7fe0a8', bodyColor: '#4f8cff' },
  { id: 'snake_purple', category: 'snake', name: '퍼플 뱀', price: 700, headColor: '#e0aaff', bodyColor: '#9d4edd' },
  { id: 'snake_fire', category: 'snake', name: '파이어 뱀', price: 1100, headColor: '#ffd60a', bodyColor: '#ff6b35' },
  { id: 'snake_gold', category: 'snake', name: '골드 뱀', price: 1400, headColor: '#fff3b0', bodyColor: '#ffd700' }
];

export const CATEGORY_LABELS = {
  ball: '🧱 벽돌깨기 - 공',
  paddle: '🧱 벽돌깨기 - 막대',
  car: '🚗 자동차 피하기',
  snake: '🐍 스네이크'
};

export function itemsByCategory(category) {
  return SHOP_ITEMS.filter(function(it) { return it.category === category; });
}

export function findItem(id) {
  for (var i = 0; i < SHOP_ITEMS.length; i++) {
    if (SHOP_ITEMS[i].id === id) return SHOP_ITEMS[i];
  }
  return null;
}
