import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import Graph from "../Graph/";
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import RouteSelectPlant from '../RouteSelectPlant';
import { createBrowserHistory } from "history";

const routerHistory = createBrowserHistory()

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      plants: {},
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

  handleSelectPlant = (plantName) => {
    const { plants } = this.state;
    if (plants[plantName] === undefined) {
      this.setState({
        plants: {
          ...plants,
          [plantName]: {}
        }
      })
    }
  }
  render() {
    return (
      <Router history={routerHistory}>
        <Switch>
          <Route path="/graph" render={() => (
            <Graph
              handleChangeSelection={this.handleChange}
              data={this.state.data}
            />
          )} />
          <Route path="/selectplant" render={() => (
            <RouteSelectPlant
              onSelectPlant={this.handleSelectPlant}
            />
          )}
          />
          <Route path="/plantdetails" render={() => (
            <div>{JSON.stringify(this.state.plants)}</div>
          )}
          />
          <Redirect from="/" to="/selectplant" />
        </Switch>
      </Router>
    );
  }
}

export default App;
