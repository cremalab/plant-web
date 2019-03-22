import React from "react";
import { Bar } from "react-chartjs-2";
import PropTypes from 'prop-types';

const Graph = (props) => {
  const { handleChangeSelection, data } = props;
  return (
    <React.Fragment>
      <div
        style={{ display: "flex", margin: "10px", justifyContent: "center" }}
      >
        <select
          name="id"
          onChange={handleChangeSelection}
          style={{ fontSize: "1.2rem" }}
          defaultValue="testthree"
        >
          <option value="pizero">Week 1</option>
          <option value="testone">Week 2</option>
          <option value="testtwo">Week 3</option>
          <option value="testthree">Week 4</option>
        </select>
      </div>
      <div style={{ height: "80vh" }}>
        <Bar
          data={data}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    suggestedMax: 10,
                    suggestedMin: 5
                  }
                },
                {
                  id: "temp",
                  display: false,
                  scaleLabel: {
                    display: false
                  },
                  ticks: {
                    beginAtZero: true
                  }
                }
              ],
              xAxes: [
                {
                  type: "time",
                  time: {
                    unit: "day"
                  }
                }
              ]
            }
          }}
        />
      </div>
    </React.Fragment>
  );
}

Graph.propTypes = {
  data: PropTypes.object,
  handleChangeSelection: PropTypes.func,
}
export default Graph;
