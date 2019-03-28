import React from "react";
import FadeInContainer from "../FadeInContainer";
import LayoutOuter from "../LayoutOuter";
import bgImg from "../../assets/background.png";
import { ReactComponent as Logo } from "../../assets/happy-plant.svg";

const SplashScreen = props => {
  return (
    <FadeInContainer>
      <LayoutOuter
        style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover" }}
      >
        <Logo style={{ marginTop: "20px" }} />
      </LayoutOuter>
    </FadeInContainer>
  );
};

export default SplashScreen;
