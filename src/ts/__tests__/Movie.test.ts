import Movie from '../domain/Movie';

test('Movie: успешное создание', () => {
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

    expect(movie).toEqual({
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
    });
});
