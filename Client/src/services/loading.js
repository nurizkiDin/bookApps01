import React from "react";
import { CSpinner } from "@coreui/react";

const Loading = () => {
    return(
        <div>
            <CSpinner
                style={{width: "4rem", height: "4rem"}}
                color="danger"
                variant="grow"
            />
        </div>
    )
}

export default Loading;
