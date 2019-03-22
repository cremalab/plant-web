import React, { Component } from "react";
import { Title, DetailLight } from '../Text';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import LayoutOuter from "../LayoutOuter";
import OverviewLevels from "../OverviewLevels";
import IdealConditions from "../IdealConditions";
import arrowBackImg from "../../assets/arrowBack.png";
import { Link } from 'react-router-dom';

const moistureHelpers = [
  'Needs water badly',
  'Needs water',
  'Will need water',
  'Feelin\' good',
  'Very moist',
]
const temperatureHelpers = [
  'Needs heat badly',
  'A little chilly',
  'Feelin\' good',
  'A bit too hot',
]

class RoutePlantDetails extends Component {
  render() {
    const { curPlant, onChangePlantDetails } = this.props;

    const moisturePercent = Math.random();
    const temperaturePercent = Math.random();
    const moistureHelper = moistureHelpers[Math.floor(moisturePercent * moistureHelpers.length)];
    const temperatureHelper = temperatureHelpers[Math.floor(temperaturePercent * temperatureHelpers.length)]

    return (
      <LayoutOuter>
        <Link to={`${process.env.PUBLIC_URL}/selectplant`}><ArrowBackImg src={arrowBackImg} /></Link>
        <Title>Luiza</Title>
        <PlantImg src={curPlant.imgUrl} alt="Plant" />
        <PlantName>{curPlant.name}</PlantName>
        <DetailLight>{"Acquisition Date: November 2018"}</DetailLight>
        <OverviewLevels
          title="Current Moisture Level:"
          percent={moisturePercent * 100}
          helperText={moistureHelper}
        />
        <OverviewLevels
          title="Current Temperature Level:"
          percent={temperaturePercent * 100}
          helperText={temperatureHelper}
        />
        <IdealConditions conditions={{
          humidity: 'Up to 7',
          sunlight: 'Indirect sunlight',
          water: 'Every 4 days',
        }} />
      </LayoutOuter>
    );
  }
}

RoutePlantDetails.props = {
  onChangePlantDetails: PropTypes.func,
  curPlant: PropTypes.object,
}

const PlantImg = styled.img`
  height: 60vw;
  width: 60vw;
  max-height: 440px;
  max-width: 440px;
`;
const PlantName = styled.h3`
  font-size: 23px;
  color: #004E17;
  text-align: center;
  margin: 10px;
`;

const ArrowBackImg = styled.img`
  height: 30px;
  width: 30px;
  position: absolute;
  top: 20px;
  left: 10%;
`;

export default RoutePlantDetails;
