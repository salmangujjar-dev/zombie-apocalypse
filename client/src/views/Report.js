import { useState, useEffect } from "react";
import axios from "axios";
import { Toolbar, Box, Grid, Container } from "@mui/material";
import { Chart } from "react-google-charts";

import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import {
  SURVIVOR_PERCENTAGE_OPTIONS,
  AVG_RESOURCES_QTY_OPTIONS,
  INFECTED_POINT_LOST_OPTIONS,
} from "../utils/constants";

const Report = () => {
  const { auth } = useAuth();
  const [infectedPieChartData, setInfectedPieChartData] = useState([]);
  const [avgResourcesQtyData, setAvgResourcesQtyData] = useState([]);
  const [infectedPointLostData, setInfectedPointLostData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_SURVIVOR_REPORT_API,
          {
            headers: {
              token: auth.token,
            },
          }
        );
        let { totalCount, infectedCount } = response.data;

        setInfectedPieChartData([
          ["Status", "Count"],
          ["Survivor", totalCount - infectedCount],
          ["Infected", infectedCount],
        ]);

        setAvgResourcesQtyData([
          ["Item Name", "Avg Item Count"],
          ...response.data.avgItemQuantity,
        ]);

        setInfectedPointLostData([
          ["Item Name", "Point Lost"],
          ...response.data.infectedPointLost,
        ]);

        setLoading(false);
      } catch (err) {}
    };
    setLoading(true);
    fetchReport();
  }, [auth.token]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <Toolbar />
      <Box>
        <Container>
          <Grid
            container
            className="row"
            item
            xs={12}
          >
            <Grid
              item
              xs={6}
            >
              <Chart
                chartType="PieChart"
                width="100%"
                height="400px"
                data={infectedPieChartData}
                options={SURVIVOR_PERCENTAGE_OPTIONS}
              />
            </Grid>
            <Grid
              item
              xs={6}
            >
              {avgResourcesQtyData.length === 1 ? (
                <h1>No Data Available</h1>
              ) : (
                <Chart
                  chartType="BarChart"
                  width="100%"
                  height="400px"
                  data={avgResourcesQtyData}
                  options={AVG_RESOURCES_QTY_OPTIONS}
                />
              )}
            </Grid>
          </Grid>
          <Grid
            container
            className="row justify-content-center"
            item
            xs={12}
          >
            <Grid
              item
              xs={6}
            >
              {infectedPointLostData.length === 1 ? (
                <h1>No Data Available</h1>
              ) : (
                <Chart
                  chartType="BarChart"
                  width="100%"
                  height="400px"
                  data={infectedPointLostData}
                  options={INFECTED_POINT_LOST_OPTIONS}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Report;
