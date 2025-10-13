// importing relevant module
import React from "react";
import { Typography } from "../../atoms/Typography";

// import stylings
import { LandingpageContainer, LandingpageComponent1, StartButton, LandingpageComponent2 } from "./index.styled";

const Landingpage = (): JSX.Element => {

    const setRedirect = () => {
        // Add navigation logic here, e.g.:
        // router.push("/dashboard") or window.location.href = "/dashboard"
        console.log("Redirecting...");
    };

    return (
        <LandingpageContainer>
            <LandingpageComponent1>
                <Typography variant="h1">
                    creating an incredible <span>Experience </span>on the mezo
                </Typography>
                <StartButton
                    type="button"
                    onClick={setRedirect}
                >
                    <span>Enter</span>
                </StartButton>
            </LandingpageComponent1>

            <LandingpageComponent2>
                <img src="/assets/metaverse.png" alt="metaverse" />
            </LandingpageComponent2>
        </LandingpageContainer>
    );
};

export default Landingpage;
