import React from "react";
import "../styles/LabImage.scss";

const LabImage = ({ image, url, classname }) => {
	return (
		<a
			href={url}
			target="_blank"
			className={classname}
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}
			rel="noopener noreferrer">
			<img
				src={image}
				alt="Lab Image"
				style={{
					width: "100%",
					height: "100%",
					objectFit: "contain",
					padding: "0 10px"
				}}
			/>
		</a>
	);
};

export { LabImage };
