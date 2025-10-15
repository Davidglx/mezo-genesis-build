

// importing relevant module
import React from 'react';
import Gamepage from '.';

export default {
	title: 'Widgets/Gamepage',
	component: Gamepage
};

const Template = (args: JSX.IntrinsicAttributes) => {
	return <Gamepage {...args} />;
};

export const Default: any= Template.bind({});
Default.args = {};
