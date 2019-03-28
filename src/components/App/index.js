import React, { Component } from "react";
import axios from "axios";
import plantImg1 from "../../assets/plant1.png";
import moment from "moment";
import Graph from "../Graph/";
import { Switch, Route, Redirect, Router } from "react-router-dom";
import RouteSelectPlant from "../RouteSelectPlant";
import { createBrowserHistory } from "history";
import RoutePlantDetails from "../RoutePlantDetails";
import SplashScreen from "../SplashScreen";

const routerHistory = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}, // data from sensors
      curPlant: {
        name: "Lemon Lime Dracaena",
        imgUrl: plantImg1
      }, // info for "current" plant
      showSplashScreen: true
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

  handleSelectPlant = plant => {
    this.setState({
      curPlant: plant
    });
  };

  handleChangePlantDetails = newCurPlant => {
    const { curPlant } = this.state;
    this.setState({
      curPlant: {
        ...curPlant,
        ...newCurPlant
      }
    });
  };

  render() {
    if (this.state.showSplashScreen) {
      setTimeout(() => this.setState({ showSplashScreen: false }), 2000);
      return <SplashScreen />;
    }

    return (
      <Router history={routerHistory} basename={"/plant-web"}>
        <Switch>
          <Route
            path={`${process.env.PUBLIC_URL}/graph`}
            render={() => (
              <Graph
                handleChangeSelection={this.handleChange}
                data={this.state.data}
              />
            )}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/plantdetails`}
            render={() => (
              <RoutePlantDetails
                curPlant={this.state.curPlant}
                onChangePlantDetails={this.handleChangePlantDetails}
              />
            )}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/`}
            exact
            render={() => (
              <RouteSelectPlant onSelectPlant={this.handleSelectPlant} />
            )}
          />
          <Redirect
            from={`${process.env.PUBLIC_URL}/selectplant`}
            to={`${process.env.PUBLIC_URL}/`}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
