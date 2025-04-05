import PropTypes from 'prop-types';

const DistanceSpan = ({ distance }) => {
	const distanceInKm = (distance / 1000).toFixed(2);

	return (
		<span>
			{distanceInKm} km
		</span>
	);
}
export { DistanceSpan };
DistanceSpan.propTypes = {
	distance: PropTypes.number.isRequired,
};
DistanceSpan.defaultProps = {
	distance: 0,
};
DistanceSpan.displayName = 'DistanceSpan';