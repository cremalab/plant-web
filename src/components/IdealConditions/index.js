import React, { Component } from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { SmallTitle, DetailLight } from "../Text";
import humidityImg from '../../assets/humidity.svg';
import dropImg from '../../assets/drop.svg';
import sunnyImg from '../../assets/sunny.svg';




class IdealConditions extends Component {
  render() {
    const { conditions } = this.props;
    const { humidity, sunlight, water } = conditions;
    return (
      <Outer>
        <SmallTitle>{'Ideal Conditions to thrive:'}</SmallTitle>
        <Conditions>
          <Condition>
            <ConditionName>{'Humidity'}</ConditionName>
            <ConditionImg src={humidityImg}/>
            <DetailLight>{humidity}</DetailLight>
          </Condition>
          <Condition>
            <ConditionName>{'Sunlight'}</ConditionName>
            <ConditionImg src={sunnyImg}/>
            <DetailLight>{sunlight}</DetailLight>
          </Condition>
          <Condition>
            <ConditionName>{'Water'}</ConditionName>
            <ConditionImg src={dropImg}/>
            <DetailLight>{water}</DetailLight>
          </Condition>
        </Conditions>
      </Outer>
    );
  }
}

IdealConditions.props = {
  conditions: PropTypes.object,
}

const Outer = styled.div`
  width: 100%;
  margin: 20px 5px;
  max-width: 600px;
`;

const Conditions = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;

const Condition = styled.div`
  max-width: 200px;
  max-height: 200px;
  width: 30vw;
  height: 30vw;
  border: 1px solid #aaa;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 5px;
  box-sizing: border-box;

  &:nth-child(2) {
    border-right-width: 0;
    border-left-width: 0;
  }
`;

const ConditionName = styled.h4`
  font-size: 0.9em;
  color: #888;
  text-align: center;
`;

const ConditionImg = styled.img`
  width: 40%;
  height: 40%;
`;

export default IdealConditions;
