import { List } from "@mui/material";
import UserMessage from "./usermessage";

const UserMessageList = (props) => {
    let messages = props.messages.map((msg, idx) => {
        return <UserMessage key={idx} msg={msg} sender={props.sender} />;
    });
    return <List>{messages}</List>;
};

export default UserMessageList;