const CheckIcon = props => {
	return (
		<svg
			{...props}
			fill='none'
			viewBox='0 0 16 12'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M1 7L5 11L15 1'
				stroke='black'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

export default CheckIcon;
