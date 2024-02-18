import { useState } from 'react';
import './App.css';
import { StartScreen } from './components/StartScreen/StartScreen';
import { Game } from './components/Game/Game';
import { EndScreen } from './components/EndScreen/EndScreen';

function App() {
    const [isStarted, setIsStarted] = useState(false);
    const [isOver, setIsOver] = useState(false);
    const [result, setResult] = useState("")

    return (
        <div className={'flex justify-center items-center h-dvh'}>
            {!isStarted && !isOver && (
                <StartScreen
                    startHandler={() => setIsStarted(true)}
                ></StartScreen>
            )}
            {!isStarted && isOver && (
                <EndScreen
                    startHandler={() => {
                        setIsOver(false);
                        setIsStarted(true);
                    }}
                    result={result}
                />
            )}
            {isStarted && !isOver && (
                <Game
                    setIsRunning={setIsStarted}
                    setIsOver={setIsOver}
                    setResult={setResult}
                />
            )}
            
        </div>
    );
}

export default App;
