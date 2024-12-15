import Buyable from './Buyable';

export default class Movie implements Buyable {
    constructor(
        readonly id: number,
        readonly poster: string,           // Ссылка на постер
        readonly imax: boolean,             // Флаг IMAX
        readonly name: string,
        readonly originalName: string,
        readonly year: number,
        readonly country: string,
        readonly slogan: string,
        readonly genre: string[],   // Жанры
        readonly duration: number, // В минутах
        readonly price: number,
    ) { }
}
