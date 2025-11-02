

// importing relevant modules
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Dice from 'react-dice-roll';
import { Typography } from '../../../atoms/Typography';
import { DiceViewIcon } from '../../../svgs';

import { DiceContainer, DiceRoll } from './index.styled';

import { RootState } from '../../../../store/store';

// roll  a dice
const RollDice = ({
	spin,
	setResult
}: {
	setResult: (arg: string) => void;
	spin: boolean;
}) => {
	
// set result and faces
	const result = useSelector((state:RootState) => state.result.result )


const faces = [
  'https://i.postimg.cc/QdbZ3Dt6/dice1.jpg',   
  'https://i.postimg.cc/FHhwG6ZW/dice2.jpg',
  'https://i.postimg.cc/X7kzZ8bY/dice3.jpg',
  'https://i.postimg.cc/T2rkS9hj/dice4.jpg',
  'https://i.postimg.cc/sx6G8qWD/dice5.jpg',
  'https://i.postimg.cc/mZ5rvQqZ/dice6.jpg',
];


	const dice : MutableRefObject<null> | any= useRef(null);
	const dice2 : MutableRefObject<null> | any = useRef(null);
	const rollDice = () => {
       
		if (dice && dice2) {
			dice.current?.rollDice();
			dice2.current?.rollDice();
		}
	};
	useEffect(() => {
		if(spin) {
			const res = Number(result.roll1) + Number(result.roll2);
			console.log(res, 'res');
			setResult(res.toString());
		}
	}, [spin]);

	useEffect(() => {
		if (spin) {
			rollDice();
		}
	}, [spin]);

	useEffect(() => {
		console.log(result, 'result')
		console.log(spin, 'spin')
	})
	// JSX building
	return (
		<DiceContainer>
			{!spin ? (
				<>
					<DiceViewIcon />
					<Typography variant="p" style={{
						color: "black"
					}}>Roll Dice</Typography>
				</>
			) : (
				<DiceRoll>
					<Dice
						ref={dice}
						rollingTime={4000}
						size={100}
						cheatValue={result.roll1}
						// onRoll={(diceResult) => setDiceResult(diceResult)}
						faces={faces}
					/>
					<Dice
						ref={dice2}
						size={100}
						rollingTime={4000}
						cheatValue={result.roll2}
						// defaultValue={dice2Result}
						// onRoll={(dice2Result) => setDice2Result(dice2Result)}
						faces={faces}
					/>
				</DiceRoll>
			)}
		</DiceContainer>
	);
};

export default RollDice;
