import React from "react";
import { useSpring, animated } from "react-spring";

const FadeInContainer = props => {
  const transitions = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 }
  });
  return <animated.div style={transitions}>{props.children}</animated.div>;
};

export default FadeInContainer;
