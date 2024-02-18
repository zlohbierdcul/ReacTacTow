import React from 'react';

export const StartScreen = ({startHandler}) => {
    return (
        <div className={"flex justify-center items-center flex-col"}>
            <p className={"text-4xl mb-5 font-bold"}>Start the Game</p>

            <button
                type='button'
                onClick={startHandler}
                className='text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
            >
                Start
            </button>
        </div>
    );
};
