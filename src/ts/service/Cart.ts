import Buyable from '../domain/Buyable';

export default class Cart {
    // private _items: Buyable[] = [];

    // items: приватное свойство типа Map, где ключом является item.id (идентификатор товара),
    //        а значением — объект с двумя свойствами:
    //          item: сам товар (тип Buyable).
    //          quantity: количество товара в корзине (по умолчанию 1).
    private _items: Map<number, { item: Buyable; quantity: number }> = new Map();

    // Добавление товара в корзину
    add(item: Buyable): void {
    //     this._items.push(item);

    // Синтаксис стандартной библиотеки: методы Map.get и Map.set
      const existing = this._items.get(item.id);
      if (existing) {
          existing.quantity += 1;
      } else {
          this._items.set(item.id, { item, quantity: 1 });
      }
    }

    // Уменьшение количества товара
    decreaseQuantity(id: number): void {
      const existing = this._items.get(id);
      if (existing) {
          if (existing.quantity > 1) {
              existing.quantity -= 1;
          } else {
              this._items.delete(id);
          }
      }
    }

    // Получение всех товаров из корзины
    // get items(): Buyable[] {
    //     return [...this._items];
    // }

    // для задачи №3

    // Геттер возвращает массив объектов с минимальным набором свойств:
    // (id, name, price и quantity) плюс любое дополнительное свойство,
    //  не указанное явно ([key: string]: any)

    // { ... }[]: Указывает, что из геттера вернется массив объектов, а не один объект.

    get items(): {id: number; name: string; price: number; quantity: number; [key: string]: any
    }[]
    {

      //  преобразуем map (this._items) в формат массива с помощью Array.from().
      // .map(({ item, quantity } - деструктуризация параметра item, где
      // item — это объект товара, содержащий все его свойства.
      //  "вытаскиваем" свойства id, name, price, а все остальные свойства
      // (duration, poster для фильмов, др.) собираем в объект rest с помощью оператора ....

      // Создается новый объект, включающий:
      // обязательные свойства (id, name, price, quantity).
      // все остальные свойства из rest.
      return Array.from(this._items.values()).map(({ item, quantity }) => {

        // Деструктуризация item, распаковываем item
        const { id, name, price, ...rest } = item;
        return {
          id,
          name,
          price,
          quantity,
          ...rest, //все остальные свойства
        };
      });
    }


    // Подсчет полной стоимости всех товаров (без скидки)
    getTotalPrice(): number {
    // return this._items.reduce((total, item) => total + item.price, 0);
      return Array.from(this._items.values())
      .reduce((total, { item, quantity }) => total + item.price * quantity, 0);
    }

    // Подсчет полной стоимости всех товаров (со скидкой)
    getTotalPriceWithDiscount(discount: number): number {
        if (discount < 0 || discount > 100) {
            throw new Error('Discount must be between 0 and 100');
        }

        return this.getTotalPrice() * (1 - discount / 100);
    }

    // Удаление объекта из корзины по id
    // delete: Метод стандартной библиотеки JS для удаления элемента из объекта Map
    // по ключу (id). Возвращает true / false, если элемента с таким ключом не было.
    removeById(id: number): void {
      this._items.delete(id);
    }
}
