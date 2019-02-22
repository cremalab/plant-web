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
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: response.data.map(item => item.level)
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
        <Line data={this.state.data} width={600} height={250} />
      </React.Fragment>
    );
  }
}

export default App;
