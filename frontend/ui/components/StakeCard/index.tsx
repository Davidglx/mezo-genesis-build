declare let window: any;

import React, { useEffect, useState, ChangeEvent } from 'react';
import { Typography } from '../../atoms/Typography';
import { alert, close } from '../../../store/alert/alert.modal.reducer';
import { RootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useWallet } from '../../../context/WalletContext';
import {
	flip,
	getRequestId,
	getResult,
	roll,
	getDiceRequestId,
	getDiceResult,
	spinWheel,
	getWheelRequestId,
	getWheelResult,
} from '../../../utils/interact';

import {
	ActionButton,
	CardBody,
	CardHead,
	InputGroup,
	OutcomeWrapper,
	ResultOutcome,
	ResultWrapper,
	SelectedStake,
	StakeGroup,
} from './index.styled';
import { errorToast, infoToast, promiseToast } from '@/utils/toast';

export interface StakeCardProps {
	show: boolean;
	coin: string;
	stake: string;
	result: string;
	stakes: string[];
	setCoin: (arg: string) => void;
	setStake: (arg: string) => void;
	onSpin: () => void;
	again: () => void;
	currencies: string[];
	game: 'wheel' | 'dice' | 'coins';
	connected: boolean;
	spin: boolean;
	payout: number;
	setPayout: (arg: number) => void;
}

const StakeCard = (props: StakeCardProps) => {
	const {
		show,
		coin,
		setCoin,
		stake,
		stakes,
		setStake,
		again,
		onSpin,
		game,
		result,
		currencies,
		spin,
		payout,
		setPayout,
	} = props;

	const dispatch = useDispatch();
	const { account, isConnected, musdBalance } = useWallet();



	// Use reduxResult if available, otherwise use props.result
	const displayResult =  result;

	const [txHash, setTxHash] = useState<string>('');
	const [outcome, setOutcome] = useState<string[]>([]);
	const [chosenOutcome, setChosenOutcome] = useState<string>(
		game === 'wheel' ? 'wheel' : ''
	);
	const [disabled, setDisabled] = useState<boolean>(false);

	// Use result from smart contract to set frontend payout
	useEffect(() => {
		if (!displayResult) return;

		console.log('💰 Calculating payout:', {
			game,
			displayResult,
			stake,
			chosenOutcome,
		});

		if (game === 'wheel') {
			const multiplier = parseFloat(displayResult);
			const calculatedPayout = multiplier * parseInt(stake);
			setPayout(calculatedPayout);
			console.log('🎡 Wheel payout:', { multiplier, stake, calculatedPayout });
		} else if (game === 'coins') {
			if (chosenOutcome.includes(displayResult)) {
				setPayout(parseInt(stake) * 2);
				console.log('🪙 Coin WIN! Payout:', parseInt(stake) * 2);
			} else {
				setPayout(0);
				console.log('🪙 Coin LOSS');
			}
		} else if (game === 'dice') {
			const total = Number(displayResult);
			if (chosenOutcome.includes('greater') && total > 6) {
				setPayout(parseInt(stake) * 2);
				console.log('🎲 Dice WIN! (>6) Payout:', parseInt(stake) * 2);
			} else if (chosenOutcome.includes('less') && total < 6) {
				setPayout(parseInt(stake) * 2);
				console.log('🎲 Dice WIN! (<6) Payout:', parseInt(stake) * 2);
			} else {
				setPayout(0);
				console.log('🎲 Dice LOSS');
			}
		}
	}, [displayResult, stake, chosenOutcome, game, setPayout]);

	// Set outcome options
	useEffect(() => {
		if (game === 'dice') {
			setOutcome(['greater than 6', 'less than 6']);
		} else if (game === 'coins') {
			setOutcome(['heads', 'tails']);
		} else {
			setOutcome([]);
		}
	}, [game]);

	// Button text
	const buttonText = (arg: string) => {
		if (arg.includes('wheel')) {
			return 'spin';
		} else if (arg.includes('dice')) {
			return 'roll';
		} else {
			return 'toss';
		}
	};

	// Button action
	const spinGame = async () => {
		console.log('🎮 Starting game...', { game, stake, chosenOutcome, account });

		// Check wallet connection
		if (!isConnected || !account) {
			// dispatch(alert('Please connect your wallet'));
			errorToast('Please connect your wallet')
			// setTimeout(() => {
			// 	dispatch(close(''));
			// }, 2000);
			return;
		}

		// Check MUSD balance
		if (!musdBalance || parseFloat(musdBalance) === 0) {
            errorToast('You need MUSD to play! Get it from the faucet.');
			// dispatch(alert('You need MUSD to play! Get it from the faucet.'));
			// setTimeout(() => {
			// 	dispatch(close(''));
			// }, 2000);
			return;
		}

		// Check if MUSD balance is sufficient
		if (parseFloat(musdBalance) < parseFloat(stake)) {
			// dispatch(alert('Insufficient MUSD balance'));
			// setTimeout(() => {
			// 	dispatch(close(''));
			// }, 2000);
			errorToast('Insufficient MUSD balance');
			return;
		}

		// Check stake amount
		if (!stake.length) {
			errorToast('Select an amount');
			// dispatch(alert('Select an amount'));
			// setTimeout(() => {
			// 	dispatch(close(''));
			// }, 2000);
			return;
		}

		// Check chosen outcome (not for wheel)
		if (game !== 'wheel' && !chosenOutcome.length) {
			errorToast('Place a bet');
			// dispatch(alert('Place a bet'));
			// setTimeout(() => {
			// 	dispatch(close(''));
			// }, 2000);
			return;
		}

		setDisabled(true);

		try {
			// COINS
			if (game === 'coins') {
				const bet: number = chosenOutcome.includes('head') ? 0 : 1; // 0 = HEADS, 1 = TAILS
				// dispatch(alert('Processing transaction... 🔂'));
				infoToast('Processing transaction... 🔂');

				const result = await flip(bet, Number(stake), account);

				if (result.hash) {
					setTxHash(result.hash);
					infoToast('Processing transaction blocks... ⌛️');
					// dispatch(alert('Processing transaction blocks... ⌛️'));

					// setTimeout(async () => {
						const id = await getRequestId(bet);
						await getResult(id, dispatch);
						onSpin();
						setDisabled(false);
						// dispatch(close(''));
					// }, 10000); // 10 seconds for Mezo
				} else {
					errorToast('😰 Error: ' + result.status);
					// dispatch(alert('😰 Error: ' + result.status));
					// setTimeout(() => {
					// 	dispatch(close(''));
					// }, 2000);
					// setDisabled(false);
				}
			}
			// DICE
			else if (game === 'dice') {
				const bet: number = chosenOutcome.includes('greater') ? 0 : 1;
				// dispatch(alert('Processing transaction... 🔂'));
				infoToast('Processing transaction... 🔂');

				const result = await roll(bet, Number(stake), account);

				if (result.hash) {
					setTxHash(result.hash);
					infoToast('Processing transaction blocks... ⌛️');

					// setTimeout(async () => {
						const id = await getDiceRequestId(bet);
						await getDiceResult(id, dispatch);
						onSpin();
						setDisabled(false);
						// dispatch(close(''));
					// }, 10000);
				} else {
					infoToast('😰 Error: ' + result.status);
					// setTimeout(() => {
					// 	dispatch(close(''));
					// }, 2000);
					setDisabled(false);
				}
			}
			// WHEEL
			else if (game === 'wheel') {
				// dispatch(alert('Processing Transaction... 🔂'));
				infoToast('Processing Transaction... 🔂');

				const result = await spinWheel(Number(stake), account);

				if (result.hash) {
					setTxHash(result.hash);
					infoToast('Processing transaction blocks... ⌛️');
					// dispatch(alert('Processing transaction blocks... ⌛️'));

					// setTimeout(async () => {
						const id = await getWheelRequestId();
						await getWheelResult(id, dispatch);
						onSpin();
						setDisabled(false);
						dispatch(close(''));
					// }, 10000);
				} else {
					// 	dispatch(alert('😰 Error: ' + result.status))
					errorToast('😰 Error: ' + result.status);
					// setTimeout(() => {
					// 	dispatch(close(''));
					// }, 2000);
					setDisabled(false);
				}
			}
		} catch (error: any) {
			// console.error('❌ Error in spinGame:', error);
			errorToast('😰 Error: ' + error.message);
			setDisabled(false);
		}
	};

	// JSX Building block
	return (
		<>
			<CardHead>
				<Typography variant="p">
					stake <br /> amount
				</Typography>
				{!show ? (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '0.5rem',
						}}
					>
						<Typography variant="p" style={{
							fontSize : "14px",
							 border: "solid 1px #F07A2D", 
							 borderRadius: "6px",
							  display: "flex", 
							  gap:"6px", 
							  alignItems: "center",
							  padding: "4px 8px",
							  }}>
						 MUSD
					    <img src="/assets/mezoicon.svg" alt="currency" style={{ width: '1.5rem' }} />
						</Typography>

					</div>
				) : (
					<SelectedStake>{stake}</SelectedStake>
				)}
			</CardHead>
			{!show ? (
				<CardBody>
					<StakeGroup>
						{stakes.length
							? stakes.map((e, index) => (
								<label
									key={index}
									htmlFor={`stake-${e}`}
									style={{
										background: stake === e ? '#FF7F40' : 'transparent',
									}}
								>
									{e}
									<input
										disabled={spin}
										type="radio"
										name="stake"
										id={`stake-${e}`}
										value={e}
										checked={stake === e}
										onChange={() => setStake(e)}
									/>
								</label>
							))
							: null}
					</StakeGroup>
					{game !== 'wheel' ? (
						<OutcomeWrapper>
							<Typography variant="p">outcome</Typography>
							<InputGroup>
								{outcome.map((e, index) => (
									<label
										key={index}
										htmlFor={`outcome-${index}`}
										style={{
											color: chosenOutcome === e ? '#FF7F40' : 'white',
										}}
									>
										{e}
										<input
											type="radio"
											name="outcome"
											id={`outcome-${index}`}
											value={e}
											checked={chosenOutcome === e}
											onChange={() => setChosenOutcome(e)}
											disabled={spin}
										/>
									</label>
								))}
							</InputGroup>
						</OutcomeWrapper>
					) : null}
					<ActionButton
						disabled={disabled}
						style={{
							cursor: disabled ? 'not-allowed' : 'pointer',
						}}
						spin={spin}
						onClick={!disabled ? spinGame : undefined}
					>
						{buttonText(game)}
					</ActionButton>
				</CardBody>
			) : (
				<ResultWrapper>
					<Typography variant="p">
						Result: {displayResult}
						{game === 'wheel' && 'x'}
					</Typography>
					{payout !== 0 ? (
						<Typography variant="p">
							<span
								style={{
									display: 'flex',
									alignItems: 'center',
								}}
							>
								payment: {payout} {coin}
								<img
									src="/assets/mezoicon.svg"
									style={{
										width: '1.2rem',
										marginLeft: '2px',
									}}
									alt="coin"
								/>
								{txHash && (
									<a
										href={`https://explorer.test.mezo.org/tx/${txHash}`}
										target="_blank"
										rel="noopener noreferrer"
										style={{
											marginLeft: '8px',
											color: '#FF7F40',
											textDecoration: 'underline',
										}}
									>
										(View on Mezo Explorer)
									</a>
								)}
							</span>
						</Typography>
					) : (
						<Typography variant="p">
							<span
								style={{
									textTransform: 'capitalize',
									color: 'red',
								}}
							>
								unfortunately, you didn't win this round!
							</span>
						</Typography>
					)}
					{game !== 'wheel' && (
						<ResultOutcome>
							<Typography variant="p">chosen Outcome</Typography>
							<Typography variant="p">{chosenOutcome}</Typography>
						</ResultOutcome>
					)}
					<ActionButton onClick={again} inverse={true} disabled={disabled}>
						{payout === 0 ? 'try again' : 'play again'}
					</ActionButton>
				</ResultWrapper>
			)}
		</>
	);
};

export default StakeCard;