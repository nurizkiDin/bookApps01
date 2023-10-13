import React from "react";

const TruncateText = (props) => {
    function truncate(str) {
        return str.length > 200 ? str.substring(0, 197) + "..." : str;
    }
    return (
        <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            {truncate(props.text)}
        </span>
    );
}

export default TruncateText;
