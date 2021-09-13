import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import Detailsearch from "./Search";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: "16px",
    margin: theme.spacing(1),
    width: "50%",
    borderRadius: 50,
    border: "1px solid gray",
    marginTop: "20px",
    lineHeight: "20px",
    height: "50px",
    outline: "none",
  },
  input: {
    padding: "10px 0 9px",
  },
}));

export default function Weather() {
  const classes = useStyles();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState([]);
  const APIkey = {
    locate: address,
    key: "e4e11461af63423d92b121001210909 ",
  };
  const search = (e) => {
    if (e.key === "Enter") {
      const url = `http://api.weatherapi.com/v1/forecast.json?key=e4e11461af63423d92b121001210909&q=${APIkey.locate}&days=3&aqi=no&alerts=no `;
      axios.get(url)
        .then((res) => {
          console.log(res);
          setCity(res.data);
        })
        .catch((err) => {
          alert("Vui Lòng nhập đúng địa chỉ");
        })
        .finally(() => {
          setAddress("");
        });
    }
  };
  return (
    <div>
      <h1>Edsolabs 3-Day Forecast</h1>
      <FormControl className={classes.margin}>
        <Input
          className={classes.input}
          id="input-with-icon-adornment"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          placeholder="Nhập thành phố muốn xem"
          onKeyPress={search}
          variant="outlined"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>

      <Detailsearch city={city} />
    </div>
  );
}
