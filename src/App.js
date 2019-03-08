import React, { Component } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount = async () => {
    this.loadData("testthree");
  };

  loadData = async id => {
    const response = await axios.get(
      `https://us-central1-happyplantcloudfunctions.cloudfunctions.net/getMoistureHistory?instanceId=${id}`,
      {
        crossDomain: true
      }
    );

    const moistureData = response.data.map(item => ({
      x: moment.unix(item.timestamp).format("lll"),
      y: Number(item.level / 100)
    }));

    const tempData = response.data
      .filter(item => item.temp)
      .map(item => ({
        x: moment.unix(item.timestamp).format("lll"),
        y: Math.round(item.temp * 1.8 + 32)
      }));

    const finalData = {
      datasets: [
        {
          label: "Moisture Level",
          type: "line",
          backgroundColor: "rgba(3,176,224,0.4)",
          borderColor: "rgba(3,176,224,1)",
          data: moistureData
        },
        {
          label: "Temperature",
          yAxisID: "temp",
          type: "bar",
          backgroundColor: "rgba(58, 60, 62,0.4)",
          borderColor: "rgba(58, 60, 62,1)",
          data: tempData
        }
      ]
    };

    this.setState({
      data: finalData
    });
  };

  handleChange = evt => {
    this.loadData(evt.target.value);
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{ display: "flex", margin: "10px", justifyContent: "center" }}
        >
          <select
            name="id"
            onChange={this.handleChange}
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
            data={this.state.data}
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
}

export default App;
