import { Switch } from "@mui/material";
import React, { useContext, useEffect, useState } from "react"
import '../Selector.css'
import { UserContext } from "../providers/UserProvider";
import Paper from '@mui/material/Paper';

import 'typeface-nunito';
import 'typeface-bebas-neue';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { blue } from "@mui/material/colors";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: blue[600]
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: blue[600],
  },
}));

const commonStyles = {
  bgcolor: '#CCD7E4',
  m: 1,
  elevation: 20,
  padding: 5,
  minWidth: 300,
  maxWidth: 300,
};

export const Widget = ({ name, func, argsA, react, argsR, callback, idA, idR }) => {

    const [on, setOn] = useState(false)
    const user = useContext(UserContext);

    useEffect(() => {
        if (on === true) {
            var time = startTimer()
        }
        return () => {
            clearInterval(time);
        };
    }, [on])

    const handleOn = () => {
        if (on === true) {
            setOn(false);
        } else {
            setOn(true);
        }
    }

    function startTimer(time) {
        time = setInterval(function () {
            func(react, argsA, argsR, callback, user.uid)
        }, 20000);
        return time
    }

    const styles = ({
      fontText: {
        fontFamily: 'Nunito',
        fontWeight: 600,
        fontSize: 18,
      },
      argument: {
        fontFamily: 'Bebas Neue',
//        fontFamily: 'sans-serif',
        fontWeight: 'regular',
        fontSize: 22,
      }
  });

    const deleteWidget = async (id) => {
        await fetch(`http://localhost:8081/delete-widget?id=${id}&uid=${user.uid}`)
        window.location.reload(false);
    }

    function getNameAction(id) {
      switch (id) {
        case 'T0':
          return 'On Time';
        case 'T1':
          return 'Half Time';
        case 'W0':
          return 'Temperature >= 20°C';
        case 'TW0':
          return 'Is Live';
        case 'TW1':
          return 'Stream time >= 1H';
        case 'TW2':
          return 'Top 100 >= 50K viewers';
        case 'S0':
          return 'Is popular';
        case 'S1':
          return 'More than 50K followers';
        case 'R0':
          return 'Subbed to more than 10 subreddits'
        default:
          return 'Undefined action';
      }
    }

    function getNameReaction(id) {
      
      switch (id) {
        case 'D0':
          return 'Write Message to';
        case 'D1':
          return 'Write message for every servers';
        case 'D2':
          return 'Create channel on';
        case 'D3':
          return 'Send PM';
        case 'C0':
          return 'Cocktail with alcohol';
        case 'C1':
          return 'Cocktail without alcohol';
        default:
          return 'Undefined reaction';
      }
    }
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: 2, paddingLeft: 3 }} elevation={8}>
          <Paper sx={{ ...commonStyles, overflowWrap: 'break-word' }} elevation={8}>
              <CardContent>
                <Typography gutterBottom style={styles.argument} alignItems="center">
                  {"IF: " + getNameAction(idA)}
                </Typography>
                    <Typography gutterBottom style={styles.fontText}>
                      {argsA[0]}
                   </Typography>
              </CardContent>
              <CardContent>
                <Typography gutterBottom  style={styles.argument}>
                 {"THEN " + getNameReaction(idR)}
                </Typography>
                  <Typography gutterBottom style={styles.fontText}>
                        {argsR[0]}
                        <br />
                        {argsR[1]}
                  </Typography>
              </CardContent>
              <Button size="small" color="primary" onClick={() => { deleteWidget(name) }} style={styles.argument}>
                Delete
              </Button>
              {<GreenSwitch sx= {{backgroundColor:'#ffffff', borderRadius: 5}} onChange={handleOn}/>}
            </Paper>
        </Box>
      );
    }