import { useEffect, useRef } from "react";
import { ListItem } from "@mui/material";
import Bubble from "./bubble";
import Triangle from "./triangle";

const UserMessage = (props) => {
	const userRef = useRef(null);
    
	useEffect(() => {
		userRef.current.scrollIntoView(true);
	}, []);

	let alignChat;
	let alignTriangleValue;
	var words = [];
	words = props.msg.text.split(" ");
	if(props.sender === words[0] || words[0] === "Admin")
	{
		alignChat = "left";
		alignTriangleValue = "3vh";
	}
	else{
		alignChat = "right";
		alignTriangleValue = "30vh";
	}
	return (
		<div>
			<ListItem
				ref={userRef}
				style={{ textAlign: "left", marginBottom: "2vh", justifyContent: alignChat }}
			>
				<Bubble msg={props.msg.text} color={props.msg.color}  />
				<Triangle color={props.msg.color} alignTriangle={alignTriangleValue} />
			</ListItem>
			<p></p>
		</div>
	);
};

export default UserMessage;
