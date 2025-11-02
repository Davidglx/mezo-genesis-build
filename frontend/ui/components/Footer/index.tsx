import React from "react";
import { PoweredWrapper, Text, Logo } from "./index.styled";

const PoweredByMezo = () => {
  return (
    <PoweredWrapper>
      <Text>Powered by</Text>
      <Logo src="/assets/mezo.svg" alt="Mezo Logo" />
    </PoweredWrapper>
  );
};

export default PoweredByMezo;
