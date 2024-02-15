import { Typography } from "@mui/material";
import "../App.css";

const Bubble = (props) => {
	const message = props.msg;

	const getPosition = (subString, index) => {
		return message.split(subString, index).join(subString).length;
	}

	let senderSays = message.substring(0, getPosition(" ", 2));
	let roomInfo = message.substring(getPosition(" ", 2), getPosition(" ", 4));
	let timeInfo = message.substring(getPosition(" ", 4), getPosition(" ", 6));
	let messageInfo = message.substring(getPosition(" ", 6));

	return (
		<div className="userBubble" style={{ backgroundColor: props.color }}>
			<div style={{display: "flex", flexDirection:"row", justifyContent:"space-between"}}>
				<Typography fontFamily="Raleway" fontSize="10px">{senderSays}</Typography>
				<Typography fontFamily="Raleway" fontSize="10px">{roomInfo}</Typography>
			</div>
			<Typography align="right" fontFamily="Raleway" fontSize="10px">{timeInfo}</Typography>
			<Typography fontFamily="Arial" fontWeight="bold" fontSize="13px">{messageInfo}</Typography>
			
		</div>
	);
};

export default Bubble;
