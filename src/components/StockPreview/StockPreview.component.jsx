import React from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./StockPreview.styles.scss";
import { Link } from "react-router-dom";

function StockPreview({ name, symbol, exchange }) {
  return (
    <Card variant="outlined" className="stock-preview">
      <CardContent>
        <Typography className="text-color" gutterBottom>
          {name}
        </Typography>
        <Typography
          className="text-color"
          variant="h5"
          component="h2"
        ></Typography>
        <Typography className="text-color">{symbol}</Typography>
        <Typography className="text-color" variant="body2" component="p">
          {exchange}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" className="center text-color hover">
          <Link to={`/company/${symbol}`}>Learn More</Link>
        </Button>
      </CardActions>
    </Card>
    // <div className="stock-preview">
    //   <h3>{name}</h3>
    //   <p>Symbol: {symbol}</p>
    //   <p>{exchange}</p>
    // </div>
  );
}

export default StockPreview;
