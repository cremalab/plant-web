import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { SmallTitle } from "../Text";

class OverviewLevels extends Component {
  render() {
    const { title, percent, helperText } = this.props;
    return (
      <Outer>
        <SmallTitle>{title}</SmallTitle>
        <HelperText left={`calc(${percent / 1.4}% + 30px)`} top="10px">
          {helperText}
        </HelperText>
        <GaugeOuter>
          <GaugeInner width={`${percent}%`} />
        </GaugeOuter>
        <HelperText left={`${percent}%`} top="42px">
          {Math.round(percent / 10)}
        </HelperText>
      </Outer>
    );
  }
}

OverviewLevels.props = {
  title: PropTypes.string,
  percent: PropTypes.number,
  helperText: PropTypes.string
};

const Outer = styled.section`
  width: 100%;
  max-width: 600px;
  margin: 20px 0 0 0;
  position: relative;
`;

const HelperText = styled.h3`
  font-size: 12px;
  color: #333;
  position: absolute;
  top: ${props => props.top};
  left: ${props => props.left};
  transform: translateX(-50%);
  white-space: nowrap;
`;

const GaugeOuter = styled.div`
  width: 100%;
  margin: 20px 0;
  height: 12px;
  background-color: #ddd79b;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
`;

const GaugeInner = styled.div`
  position: absolute;
  height: 12px;
  left: 0px;
  top: 0px;
  background-color: #3a3c3e;
  width: ${props => props.width};
`;

export default OverviewLevels;
