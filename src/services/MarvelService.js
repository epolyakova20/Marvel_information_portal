
class MarvelService {
    _apiBase = 'https://marvel-server-zeta.vercel.app/';
    _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';

    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    getAllComics = async () => {
        const res = await this.getResource(`${this._apiBase}comics?${this._apiKey}`);
        return res.data.results.map(this._transformComics);
    }

    getComic = async (id) => {
        const comics = await this.getAllComics();
        const comic = comics.find(item => item.id === +id);

        if (!comic) {
            throw new Error(`Comic with id ${id} was not found`);
        }

        return comic;
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.languages || 'en',
            price: comics.prices && comics.prices.length > 0
                ? `${comics.prices[0].price}$`
                : 'not available'
        }
    }
}

export default MarvelService;


// class MarvelService {
//     _apiBase = 'https://marvel-server-zeta.vercel.app/';
//     _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';


//     getResource = async (url) => {
//         let res = await fetch(url);

//         if (!res.ok) {
//             throw new Error(`Could not fetch ${url}, status: ${res.status}`);
//         }

//         return await res.json();
//     }

//     getAllCharacters = async () => {
//         const res = await this.getResource(`${this._apiBase}characters?${this._apiKey}`);
//         return res.data.results.map(this._transformCharacter);
//     }

//     getCharacter = async (id) => {
//         const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
//         return this._transformCharacter(res.data.results[0]);
//     }

//     getAllComics = async () => {
//         const res = await this.getResource(`${this._apiBase}comics?${this._apiKey}`);
//         return res.data.results.map(this._transformComics);
//     }

//     _transformCharacter = (char) => {
//         return {
//             id: char.id,
//             name: char.name,
//             description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
//             thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
//             homepage: char.urls[0].url,
//             wiki: char.urls[1].url,
//             comics: char.comics.items
//         }
//     }

//     _transformComics = (comics) => {
//         return {
//             id: comics.id,
//             title: comics.title,
//             description: comics.description || 'There is no description',
//             pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
//             thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
//             language: comics.textObjects.languages || 'en',
//             price: comics.prices && comics.prices.length > 0
//                 ? `${comics.prices[0].price}$`
//                 : 'not available'
//         }

//     }


// }

// export default MarvelService;