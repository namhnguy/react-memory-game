import '../styles/Main.css'
import { useState, useEffect } from 'react';
import Scoreboard from './Scoreboard'

const Main = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clickedImages, setClickedImages] = useState([]);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const handleClick = (id) => {
        if (!clickedImages.includes(id)) {
            setClickedImages((prevState) => [...prevState, id]);
            shuffle();
            const newScore = score + 1;
            if (newScore > highScore) {
                setHighScore(newScore)
            }
            setScore(newScore);
        }
        else {
            setClickedImages([]);
            shuffle();
            setScore(0);
        }
    }

    const shuffle = () => {
        let arr = [...images];
        const shuffledArray = arr.sort(() => 0.5 - Math.random());
        setImages(shuffledArray);
    }

    useEffect(() => {
        async function fetchData() {
            let arr = [];
            for (let i = 0; i < 12; i++) {
                const response = await fetch('https://api.waifu.pics/sfw/waifu');
                const imageData = await response.json();
                imageData.id = `image-${i}`
                arr.push(imageData)
            }
            setImages(arr);
            setLoading(false);
        }
        fetchData();
    }, [])

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }
    else {
        return (
            <main className="main-container">
                <Scoreboard score={score} highScore={highScore} />
                <div className='card-items-container'>
                    {images.map(image => {
                        return (<div className='card-item' key={image.id}>
                            <img src={image.url} alt='waifu' onClick={() => handleClick(image.id)} />
                        </div>
                        )
                    })}
                </div>
            </main>
        )
    }
}

export default Main;