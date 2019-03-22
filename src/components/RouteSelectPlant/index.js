import React, { Component } from "react";
import { Title } from '../Text';
import ListSelectPlant from "../ListSelectPlant";
import plantImg1 from "../../assets/plant1.png";
import plantImg2 from "../../assets/plant2.png";
import plantImg3 from "../../assets/plant3.png";
import plantImg4 from "../../assets/plant4.png";
import PropTypes from 'prop-types';
import LayoutOuter from "../LayoutOuter";

class RouteSelectPlant extends Component {
  render() {
    return (
      <LayoutOuter>
        <Title>{"Select your plant type"}</Title>
        <ListSelectPlant
          onSelectPlant={this.props.onSelectPlant}
          plants={[
            {
              name: 'Lemon Lime Dracaena',
              imgUrl: plantImg1,
            },
            {
              name: 'Cherry Grape Orchidea',
              imgUrl: plantImg2,
            },
            {
              name: 'Arctic Flavorblast Millefolium',
              imgUrl: plantImg3,
            },
            {
              name: 'Grandpappy\'s Wort (Palmatum)',
              imgUrl: plantImg4,
            },
            {
              name: 'Coreopsis Anachronosis',
              imgUrl: plantImg1,
            },
            {
              name: 'Dutchmen\'s Breeches',
              imgUrl: plantImg2,
            },
            {
              name: 'Red-Necked Foxworthy',
              imgUrl: plantImg3,
            },
            {
              name: 'Bachelor Buttons, Perrenial',
              imgUrl: plantImg4,
            },
            {
              name: 'Boston "Strangler" Ivy',
              imgUrl: plantImg1,
            },
            {
              name: 'Ambiguous Gluteus Maximus',
              imgUrl: plantImg2,
            },
            {
              name: 'Flowers?',
              imgUrl: plantImg3,
            },
            {
              name: 'Helvetica Neue',
              imgUrl: plantImg4,
            },
          ]}
        />
      </LayoutOuter>
    );
  }
}

RouteSelectPlant.props = {
  onSelectPlant: PropTypes.func,
}
export default RouteSelectPlant;
