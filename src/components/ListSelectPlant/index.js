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
        to={`${process.env.PUBLIC_URL}/plantdetails`}
        onClick={() => onSelectPlant(plant)}>
        <img src={plant.imgUrl} height="75px" width="75px" style={{margin: '10px'}} alt={plant.name} />
        {plant.name}
      </PlantLink>
    ))}
  </Outer>
}

const PlantLink = styled(Link)`
  text-decoration: none;
  color: #000;
  border: 2px solid #d0e647;
  border-radius: 5px;
  margin: 10px;
  padding: 5px;
  height: auto;
  width: 140px;
  display: flex;
  justify-content: center;
  font-size: 1em;
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
  plants: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    imgUrl: PropTypes.string,
  }))
}
export default ListSelectPlant;
