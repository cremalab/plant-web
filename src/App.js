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
      "https://us-central1-happyplantcloudfunctions.cloudfunctions.net/getMoistureHistory?instanceId=pizero",
      {
        crossDomain: true
      }
    );

    const finalData = {
      labels: response.data.map(item =>
        moment(item.timestamp * 1000).fromNow()
      ),
      datasets: [
        {
          label: "Moisture Level",
          backgroundColor: "rgba(3,176,224,0.4)",
          borderColor: "rgba(3,176,224,1)",
          data: response.data.map(item => item.level / 100)
        }
      ]
    };

    console.log(finalData);

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
                    min: 0
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
