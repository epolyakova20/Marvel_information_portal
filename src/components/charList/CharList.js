
import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [allCharacters, setAllCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(9);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = useMemo(() => new MarvelService(), []);
    const itemRefs = useRef([]);

    useEffect(() => {
        marvelService.getAllCharacters()
            .then((characters) => {
                setAllCharacters(characters);
                setCharList(characters.slice(0, 9));
                setOffset(9);
                setCharEnded(characters.length <= 9);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, [marvelService]);

    const onRequest = () => {
        setNewItemLoading(true);

        const nextOffset = offset + 9;
        const newItems = allCharacters.slice(offset, nextOffset);

        setCharList(charList => [...charList, ...newItems]);
        setOffset(nextOffset);
        setNewItemLoading(false);
        setCharEnded(nextOffset >= allCharacters.length);
    };

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => {
            if (item) {
                item.classList.remove('char__item_selected');
            }
        });

        const selectedItem = itemRefs.current[id];

        if (selectedItem) {
            selectedItem.classList.add('char__item_selected');
            selectedItem.focus();
        }
    };

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = { objectFit: 'cover' };

            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        focusOnItem(i);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}
                >
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        style={imgStyle}
                    />
                    <div className="char__name">{item.name}</div>
                </li>
            );
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        );
    }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}

            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ display: charEnded ? 'none' : 'block' }}
                onClick={onRequest}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;
