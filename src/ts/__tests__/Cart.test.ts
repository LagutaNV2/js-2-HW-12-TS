import Cart from '../service/Cart';
import Movie from '../domain/Movie';
import Gadget from '../domain/Gadget';

let cart: Cart;

beforeEach(() => {
  cart = new Cart();
});

test('Cart: new card should be empty', () => {
  expect(cart.items.length).toBe(0);
});

test('Cart: успешное добавление movie', () => {
  // const cart = new Cart();
    const movie = new Movie(
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
        500
    );

    cart.add(movie);

    expect(cart.items[0]).toEqual({
      id: 1,
      poster: 'https://example.com/avengers-poster.jpg',
      imax: true,
      name: 'Мстители',
      originalName: 'The Avengers',
      year: 2012,
      country: 'США',
      slogan: '«Avengers Assemble!»',
      genre: ['фантастика', 'боевик', 'фэнтези', 'приключения'],
      duration: 137,
      price: 500,
      quantity: 1,
  });
});

test('Cart: успешный подсчет стоимости всех товаров без скидки', () => {
  const movie1 = new Movie(1, 'url1', true, 'Name1', 'OriginalName1', 2020, 'USA', 'Slogan1', ['genre1'], 100, 300);
  const movie2 = new Movie(2, 'url2', false, 'Name2', 'OriginalName2', 2021, 'UK', 'Slogan2', ['genre2'], 120, 200);

  cart.add(movie1);
  cart.add(movie2);

  expect(cart.getTotalPrice()).toBe(500);
});

test('Cart: выбрасывает ошибку (скидка<0))', () => {
  const movie1 = new Movie(1, 'url1', true, 'Name1', 'OriginalName1', 2020, 'USA', 'Slogan1', ['genre1'], 100, 300);

  cart.add(movie1);

  expect(() => cart.getTotalPriceWithDiscount(-10)).toThrow('Discount must be between 0 and 100');
});

test('Cart: выбрасывает ошибку (скидка>100))', () => {
  const movie1 = new Movie(1, 'url1', true, 'Name1', 'OriginalName1', 2020, 'USA', 'Slogan1', ['genre1'], 100, 300);

  cart.add(movie1);

  expect(() => cart.getTotalPriceWithDiscount(150)).toThrow('Discount must be between 0 and 100');
});

test('Cart: успешный подсчет стоимости всех товаров (со скидкой)', () => {
  const movie1 = new Movie(1, 'url1', true, 'Name1', 'OriginalName1', 2020, 'USA', 'Slogan1', ['genre1'], 100, 300);
  const movie2 = new Movie(2, 'url2', false, 'Name2', 'OriginalName2', 2021, 'UK', 'Slogan2', ['genre2'], 120, 200);

  cart.add(movie1);
  cart.add(movie2);

  expect(cart.getTotalPriceWithDiscount(20)).toBe(400);
});

test('Cart: успешное удаление товара по id', () => {
  const movie1 = new Movie(1, 'url1', true, 'Name1', 'OriginalName1', 2020, 'USA', 'Slogan1', ['genre1'], 100, 300);
  const movie2 = new Movie(2, 'url2', false, 'Name2', 'OriginalName2', 2021, 'UK', 'Slogan2', ['genre2'], 120, 200);

  cart.add(movie1);
  cart.add(movie2);

  cart.removeById(1);

  expect(cart.items[0]).toEqual({
    id: 2,
    poster: 'url2',
    imax: false,
    name: 'Name2',
    originalName: 'OriginalName2',
    year: 2021,
    country: 'UK',
    slogan: 'Slogan2',
    genre: ['genre2'],
    duration: 120,
    price: 200,
    quantity: 1,
  });
});

test('Cart: добавление одного наименования товара с увеличением количества', () => {
  const gadget = new Gadget(10, 'Smartphone', 1000);

  cart.add(gadget);
  cart.add(gadget);

  expect(cart.items[0]).toEqual({
      id: 10,
      name: 'Smartphone',
      price: 1000,
      quantity: 2,
  });
});

test('Cart: товар удалён из корзины, когда количество стало 0', () => {
  const gadget = new Gadget(10, 'Smartphone', 1000);

  cart.add(gadget);
  cart.add(gadget);
  cart.decreaseQuantity(10);
  cart.decreaseQuantity(10);

  expect(cart.items.length).toBe(0);
});

test('Cart: попытка уменьшить количество несуществующего товара', () => {
  const gadget = new Gadget(2001, 'Smartphone', 12000);
  cart.add(gadget);
  cart.decreaseQuantity(9999);
  expect(cart.items.length).toBe(1);
});
