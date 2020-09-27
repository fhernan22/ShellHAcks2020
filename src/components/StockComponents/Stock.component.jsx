import React, { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import Plot from "react-plotly.js";

import "./Stock.styles.scss";
import { TextareaAutosize } from "@material-ui/core";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "information", label: "Information", minWidth: 100 },
];

const createData = (name, info) => {
  return { name, info };
};

const useStyles = makeStyles({
  root: {
    width: "50%",
    margin: "0 auto",
  },
  container: {
    maxHeight: 440,
    "text-align": "center",
  },
});

const Stock = ({ match }) => {
  const [company, setCompany] = useState({});
  const [chartXvalues, setchartXvalues] = useState([]);
  const [chartYvalues, setchartYvalues] = useState([]);
  const [page, setPage] = useState(0);
  const classes = useStyles();
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchStock();
  }, []);

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = () => {
    const API_KEY = "R0CL901JL3P0O6HH";
    let API_CALL = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${match.params.id}&apikey=${API_KEY}`;

    fetch(API_CALL)
      .then((response) => response.json())
      .then((data) => setCompany(data));
  };

  const fetchStock = () => {
    const API_KEY = "R0CL901JL3P0O6HH";
    let API_CALL =
      `https://www.alphavantage.co/query?` +
      `function=TIME_SERIES_DAILY_ADJUSTED&symbol=${match.params.id}&interval=5min&outputsize=compact&` +
      `apikey=${API_KEY}`;

    let auxXValues = [];
    let auxYValues = [];

    fetch(API_CALL)
      .then((response) => response.json())
      .then((data) => {
        for (let date in data["Time Series (Daily)"]) {
          auxXValues.push(date);
          auxYValues.push(data["Time Series (Daily)"][date]["1. open"]);
        }

        setchartXvalues(() => auxXValues);
        setchartYvalues(() => auxYValues);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let rows = [];

  for (let key in company) {
    if (key !== "Description") rows.push(createData(key, company[key]));
  }

  return (
    <div className="company-info">
      <div className="company-name">{company.Name}</div>
      {/* <div className="company-description">{company.Description}</div> */}
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.info}
                    >
                      {columns.map((column) => {
                        console.log(column.id);
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "name" ? row.name : row.info}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <Plot
        className="plot"
        data={[
          {
            x: chartXvalues,
            y: chartYvalues,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "red" },
          },
        ]}
        layout={{
          width: 920,
          height: 640,
          paper_bgcolor: "#f7f8fb",
          plot_bgcolor: "#f7f8fb",
          title: company.Name,
        }}
      />
    </div>
  );
};

export default Stock;
