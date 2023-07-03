import { Toolbar, Box, Grid, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import { Chart } from "react-google-charts";
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";

const Report = () => {
  const { auth } = useAuth();
  const [infectedPieChartData, setInfectedPieChartData] = useState([]);
  const [avgResourcesQtyData, setAvgResourcesQtyData] = useState([]);
  const [infectedPointLostData, setInfectedPointLostData] = useState([]);
  const [loading, setLoading] = useState(false);

  const infectedPieChart = {
    title: "Percentage of Infected / Non-Infected Survivors",
    pieHole: 0.4,
  };

  const avgResourcesQty = {
    title: "Average amount of each kind of resources",
  };

  const infectedPointLost = {
    title: "Point lost (Infected Survivor)",
  };

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/fetchReport",
          {
            headers: {
              token: auth?.token,
            },
          }
        );
        setLoading(false);
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
      } catch (err) {}
    };
    setLoading(true);
    fetchReport();
  }, []);

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
                options={infectedPieChart}
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
                  options={avgResourcesQty}
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
                  options={infectedPointLost}
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
