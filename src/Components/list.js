import React, { Component } from 'react'
import {
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    IconButton
  } from "@material-ui/core";
export default class list extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             main:''
        }
    }
  
    render() {
        
        console.log(list);
        return (
            <div>
             <GridList cellHeight={250} style={{ height: '800px' , width:'800px'}}>
              {this.state.gribList.map(tile => (
                <GridListTile key={tile.id  }>
                  <img src={tile.img}  alt={tile.name} />
                  <GridListTileBar
                    name={tile.name}
                    subtitle={<span>by: {tile.Owner}</span>}
                    actionIcon={
                      <IconButton className="icon" onClick={(id)=>this.handleClickOpen(tile.id)}>
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>

            </div>
        )
    }
}
