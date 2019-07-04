import React, { Component } from 'react'

import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
export default class list extends Component {
  
  
    render() {
        
        console.log(this.props);
        const {date, actual,max,min,time,icon,descrip}=this.props;
        return (
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
              <img src={'http://openweathermap.org/img/wn/'+icon+'@2x.png'}  alt={descrip} />
              <ListItemText
                primary={descrip}
                secondary={<React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                      style={{  display: 'inline'}}
                    >
                      {<span>{time}</span>}
                    </Typography>
                    
                  </React.Fragment>}
                  />
              </ListItemAvatar>
              
              <ListItemText
                primary={descrip}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                      style={{  display: 'inline'}}
                    >
                      {<span>Max:{max}<br/>Min:{min}<br/>Date:{date}</span>}
                    </Typography>
                    
                  </React.Fragment>
                }
              />
            </ListItem>
        )
    }
}
