
export const scrollToElement = (element: { current: { scrollIntoView: (arg0: { behavior: string; }) => void; }; }) => {
	element.current?.scrollIntoView({ behavior: 'smooth' });
};
