import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ListSelectPlant = (props) => {
  const { plants, onSelectPlant } = props;
  return <Outer>
    {plants.map(plant => (
      <PlantLink
        key={plant.name}
        to="/plantdetails"
        onClick={() => onSelectPlant(plant)}>
        <img src={plant.imgUrl} height="80px" width="100px" alt="Plant" />
        {plant.name}
      </PlantLink>
    ))}
  </Outer>
}

const PlantLink = styled(Link)`
  text-decoration: none;
  color: #000;
  border: 2px solid #d0e647;
  border-radius: 10px;
  margin: 15px;
  height: 160px;
  width: 150px;
  display: flex;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
`;

const Outer = styled.div`
  display: flex;
  flex-flow: row wrap;
  max-width: 553px;
  justify-content: center;
`;

ListSelectPlant.propTypes = {
  onSelectPlant: PropTypes.func,
  plants: PropTypes.arrayOf(PropTypes.objectOf({
    name: PropTypes.string,
    imgUrl: PropTypes.string,
  }))
}
export default ListSelectPlant;
