import React from 'react';
import ContentLoader from 'react-content-loader';

const Empty = () => {
	return (
		<div className="entry entry--empty">
			<ContentLoader>
				<rect x="0" y="15" rx="3" ry="3" width="50%" height="12" />
				<rect x="0" y="35" rx="3" ry="3" width="40%" height="10" />
				<rect x="0" y="55" rx="3" ry="3" width="8%" height="10" />
				<rect x="12.5%" y="55" rx="3" ry="3" width="40%" height="10" />
				<rect x="0" y="75" rx="3" ry="3" width="25%" height="10" />
				<rect x="30%" y="75" rx="3" ry="3" width="20%" height="10" />
				<rect x="0" y="95" rx="3" ry="3" width="10%" height="10" />
				<rect x="0" y="115" rx="3" ry="3" width="5%" height="15" />
			</ContentLoader>
		</div>
	);
}

export default Empty;