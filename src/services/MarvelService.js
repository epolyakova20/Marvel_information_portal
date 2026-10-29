

class MarvelService {
    _apiBase = 'https://marvel-server-zeta.vercel.app';
    _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    // Получаем список всех персонажей
    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?${this._apiKey}`);
    };

    // Получаем конкретного персонажа по id
    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    };
}

export default MarvelService;


// class MarvelService {
//     getResource = async (url) => {
//         let res = await fetch(url);

//         if (!res.ok) {
//             throw new Error(`Could not fetch ${url}, status: ${res.status}`);
//         }

//         return await res.json();
//     }

//     getAllCharacters = () => {
//         return this.getResource('https://marvel-server-zeta.vercel.app/characters?apikey=d4eecb0c66dedbfae4eab45d312fc1df');

//     }

//     getCharacter = (id) => {
//         return this.getResource(`marvel-server-zeta.vercel.app/characters?name=Thor&apikey=d4eecb0c66dedbfae4eab45d312fc1df`);
//     }
// }