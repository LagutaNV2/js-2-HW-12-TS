import Cart from '../service/Cart';
import Movie from '../domain/Movie';

test('new card should be empty', () => {
  const cart = new Cart();

  expect(cart.items.length).toBe(0);
});

test('should add movie to the cart', () => {
  const cart = new Cart();
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
    500,
  );

  cart.add(movie);

  // expect(cart.items.length).toBe(1);
  expect(cart.items[0]).toEqual(movie);
});
