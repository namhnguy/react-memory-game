import '../styles/Scoreboard.css'

const Scoreboard = ({score, highScore}) => {
    return(
        <section className="scoreboard-container">
            <div className="scoreboard-score">{`Score : ${score}`}</div>
            <div className="scoreboard-highscore">{`High Score: ${highScore}`}</div>
        </section>
    )
}

export default Scoreboard;