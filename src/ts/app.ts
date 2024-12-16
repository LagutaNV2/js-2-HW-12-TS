import Cart from './service/Cart';
import Book from './domain/Book';
import MusicAlbum from './domain/MusicAlbum';
import Movie from './domain/Movie';
import Gadget from './domain/Gadget';


const cart = new Cart();
console.log(cart.items);

cart.add(new Book(1001, 'War and Piece', 'Leo Tolstoy', 2000, 1225));
cart.add(new MusicAlbum(1008, 'Meteora', 'Linkin Park', 900));
console.log('cart.items', cart.items);
console.log('cart.items[0]', cart.items[0]);

const avengers = new Movie(
  1,
  'https://example.com/avengers-poster.jpg',
  true,
  'Мстители',
  'The Avengers',
  2012,
  'США',
  '«Avengers Assemble!»',
  ['фантастика', 'боевик', 'фэнтези', 'приключения'],
  137,
  500,
);

cart.add(avengers);

console.log('cart.items', cart.items);
console.log('cart.items[2]', cart.items[2]);

// Пример уменьшения количества товара
cart.decreaseQuantity(1001);
console.log('Удалили War and Piece', cart.items);

// Пример удаления товара из корзины по ID
cart.removeById(1008);
console.log('Удалили Meteora', cart.items);

// Добавляем гаджеты в корзину
const gadget1 = new Gadget(2001, 'Smartphone', 12000);
const gadget2 = new Gadget(2002, 'Smartwatch', 5000);

cart.add(gadget1);
cart.add(gadget1);
cart.add(gadget2);

console.log("После добавления гаджетов:", cart.items);

// Увеличиваем количество смартфонов
cart.add(gadget1);
console.log("После увеличения количества смартфонов:", cart.items);

// Уменьшаем количество умных часов
cart.decreaseQuantity(2002);
console.log("После уменьшения количества умных часов:", cart.items);

// Удаляем 1 смартфон
cart.decreaseQuantity(2001);
console.log("После удаления одного смартфона:", cart.items);

// Удаляем все товары с id 2002 (умные часы)
cart.removeById(2002);
console.log("После удаления умных часов:", cart.items);
