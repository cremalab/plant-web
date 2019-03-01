import React, { Component } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount = async () => {
    const response = await axios.get(
      "https://us-central1-happyplantcloudfunctions.cloudfunctions.net/getMoistureHistory?instanceId=testtwo",
      {
        crossDomain: true
      }
    );

    let filteredData = response.data;

    const xsAndYs = filteredData.map(item => ({
      x: moment.unix(item.timestamp).format('lll'),
      y: Number(item.level / 100)
    }));

    const finalData = {
      datasets: [
        {
          label: "Moisture Level",
          backgroundColor: "rgba(3,176,224,0.4)",
          borderColor: "rgba(3,176,224,1)",
          data: xsAndYs
        }
      ]
    };

    this.setState({
      data: finalData
    });
  };

  render() {
    return (
      <React.Fragment>
        <Line
          data={this.state.data}
          options={{
            scales: {
              yAxes: [
                {
                  ticks: {
                    max: 10,
                    min: 3
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
      </React.Fragment>
    );
  }
}

export default App;
