const DurationSpan = ({ duration }) => {
	const durationInMinutes = Math.floor(duration / 60);

	const formattedDuration = `${durationInMinutes} min`;

	return (
		<span>{formattedDuration}</span>
	);
}
export { DurationSpan };