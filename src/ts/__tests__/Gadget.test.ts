import Gadget from '../domain/Gadget';

test('Gadget: успешное создание', () => {
    const gadget = new Gadget(
      2001,
      'Smartphone',
      12000
    );

    expect(gadget).toEqual({
        id: 2001,
        name: 'Smartphone',
        price: 12000,
    });
});
