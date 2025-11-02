// importing relevant module
import React from "react";
import { Typography } from "../../atoms/Typography";
import useSound from 'use-sound';

// import stylings
import { LandingpageContainer, LandingpageComponent1, StartButton, LandingpageComponent2 } from "./index.styled";

const Landingpage = (): JSX.Element => {
 const [play]:any= useSound('/assets/sound/enter_game.mp3');
    const setRedirect:()=> void =  () => {
        play()
        setTimeout(() => {
            window.location.pathname = '/games'
        }, 1000)
        
    }

    return (
        <LandingpageContainer>
            <LandingpageComponent1>
                <Typography variant="h1">
                    creating an incredible <span style={{ color: "#F07A2D" }}>Experience </span>on mezo
                </Typography>
                <StartButton
                    type="button"
                    onClick={setRedirect}
                >
                    <span style={{  backgroundColor: "#f07a2d"}}>Start playing</span>
                </StartButton>
            </LandingpageComponent1>

            <LandingpageComponent2>
                {/* <img src="/assets/metaverse.png" alt="metaverse" /> */}
                {/* <img src="/assets/new-work.png" alt="metaverse" /> */}
                {/* <img src="/assets/another-one.png" alt="metaverse" /> */}
                <img src="/assets/splash.svg" alt="metaverse" />


            </LandingpageComponent2>
        </LandingpageContainer>
    );
};

export default Landingpage;
