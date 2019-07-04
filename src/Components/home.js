import React, { Component } from 'react'
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import Lists from './list';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
var moment = require('moment');

export default class home extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             country:[{id:0,Nombre:''},{id:"hn",Nombre:'Honduras'},{id:"usa",Nombre:"Estados Unidos"}],
             City:[{id:1,countryid:"hn",Nombre:'San Pedro Sula'},
             {id:2,countryid:"hn",Nombre:'Tegucigalpa'},
             {id:3,countryid:"usa",Nombre:'New York'},
             {id:4,countryid:"usa",Nombre:'San Francisco'}],
             list:[],
             description:'',
             date:'',
             time:'',
             icon:'',
             max:0,
             min:0,
             actual:0,
             open:false,
             countryselected:'',
             cityselected:'',
            
        }
    }
    
    getClima=()=>{
        fetch(`http://api.openweathermap.org/data/2.5/forecast?appid=6df08d85734ed9d0d54672b831b8c9ae&q=`+this.state.cityselected+`,`+this.state.countryselected).then(res => res.json()).then(
        data =>{
            let dias={};
            for(let x=0;x<data.list.length;x++){
                let item=data.list[x];
                let dia=moment(data.list[x].dt_txt).format('DD,MM');
               if(!(dia in dias))
                   dias[dia]=[];
               dias[dia].push(item);
            }
            let list=[];
               for(var e=0 ;e<Object.keys(dias).length;e++){
                   let keys=Object.keys(dias)[e];
                  list.push({
                            id:dias[keys][0].dt,
                            actual:dias[keys][0].main.temp-273,
                            min:dias[keys][0].main.temp_min-273,
                            max:dias[keys][0].main.temp_max-273,
                            icon:dias[keys][0].weather[0].icon,
                            date:moment(dias[keys][0].dt_txt).format('DD,MM'),
                            time:moment(dias[keys][0].dt_txt).format('h:mm a'),
                            description:dias[keys][0].weather[0].description
                })
               }
               this.setState({list});
        });
    };

    

    handleChangeCountry=(e,input)=>{
        this.setState({[input]:e.target.value});
    }
    
    generateCountry=()=>{
        return (<NativeSelect disableUnderline id="Country" fullWidth defaultValue={this.state.countryselected} onChange={(e)=>this.handleChangeCountry(e,"countryselected")}>  
             {this.state.country.map(countrys=>
            <option value={countrys.id}>{countrys.Nombre}</option>
        )}
                </NativeSelect>);
    };

    
    
    generateCity=()=>{
        let selectCitys=[];
        let noSelected=[];
        {this.state.City.map(citys=>{
            if(citys.countryid==this.state.countryselected)
                selectCitys.push(citys);
            else{
                noSelected.push(citys);
            }
        })}    
        
        return (<NativeSelect disableUnderline id="City" fullWidth onChange={(e)=>this.handleChangeCountry(e,"cityselected")}>
        <option value="0"></option>  
        {selectCitys.map(citys=>
       <option value={citys.Nombre}>{citys.Nombre}</option>
   )}
           </NativeSelect>);

    }

    render() {
        let weathercard=[];
        for(let i=0;i<this.state.list.length;i++){
            let date=this.state.list[i].date;
            let time=this.state.list[i].time;
            let max=parseInt(this.state.list[i].max);
            let actual=this.state.list[i].actual;
            let min=parseInt(this.state.list[i].min);
            let icon=this.state.list[i].icon;
            let descrip=this.state.list[i].description;
            weathercard.push(<div><List style={{width: '50%',
            maxWidth: 500, backgroundColor:"white"}}>
                    <Lists date={date} time={time} max={max} actual={actual} min={min} icon={icon} descrip={descrip}/></List>
            </div>
                )
        }

            return (
                <div>
                <div style={{display: "flex",justifyContent: "center",alignItems:"center", textAlign: "center",  minHeight: 100}}> 
                {this.generateCountry()} {this.generateCity()}
                <Button onClick={this.getClima}>Clima</Button>
                </div>
                <div style={{display: "flex",justifyContent: "center",alignItems:"center", textAlign: "center",  minHeight: 100}}>
                    {weathercard}
                </div>
                </div>
            );
       
        } 

}
