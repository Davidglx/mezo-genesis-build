import { ScrollContainer, ScrollTextHolder, ScrollText } from "./index.styled";

const Scroll = (): JSX.Element => {
  return (
    <ScrollContainer>
      <ScrollTextHolder>
        {/* <Marquee gradient={false} speed={25}> */}
          <ScrollText>
            <span>Creating an incredible gaming experience on the polygon blockchain</span>
            <span>💫</span>
          </ScrollText>
          <ScrollText>
            <span>Mezo-genesis is live on testnet</span>
            <span>🎲</span>
          </ScrollText>
          <ScrollText>
            <span>Play and earn</span>
            <span>🎈</span>
          </ScrollText>
        {/* </Marquee> */}
      </ScrollTextHolder>
    </ScrollContainer>
  );
};

export default Scroll;
