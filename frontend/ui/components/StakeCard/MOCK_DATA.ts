

// importing staked card types
import { StakeCardProps } from '.';

// mock stake data
export const mockData_StakeCardProps: StakeCardProps = {
	show: false,
	coin: 'musd',
	stake: '5',
	result: '2',
	stakes: ['1', '2', '5', '10', '20', '50'],
	setCoin: () => '',
	setStake: () => '',
	onSpin: () => '',
	again: () => '',
	currencies: ['musd'],
	game: 'wheel',
	connected: false,
	spin: false,
	payout: 0,
	setPayout: () => ''
};
