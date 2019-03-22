import React from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Title = (props) => {
  return <TitleText>{props.children}</TitleText>
}

Title.propTypes = {
  text: PropTypes.string,
}

const TitleText = styled.h1`
  font-size: 23px;
  font-weight: 600;
  font-family: sans-serif;
`;

export default Title;
