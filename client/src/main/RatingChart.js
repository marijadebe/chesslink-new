import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {AreaChart, XAxis, YAxis, CartesianGrid, Area, Tooltip, ResponsiveContainer, PieChart, Pie, Cell} from 'recharts';
import Loading from '../Loading';
import "../css/Main.css";
import { useTheme } from '@mui/material/styles';
axios.defaults.withCredentials = true;
var chartData = [];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`# of players : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
const CustomTooltipPie = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Rating ${payload[0].name} : #${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };
const returnChart = (type, data, themes) => {
    var COLORS = [];
    console.log(themes);
    if(themes.palette.mode === 'dark') {
        COLORS = ['#3f51b5', '#593fb5', '#803fb5', '#803fb5'];
    }else {
        COLORS = ['#677beb', '#67c3eb', '#67ebd3', '#67eb95'];
    }
    switch (type) {
        case "pie":
            return(
                <ResponsiveContainer height={200} width="99%" className="responsivechart">
                    <PieChart width={400} height={400}>
                        <Pie
                            dataKey="players"
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#3ddb8a"
                            stroke={themes.palette.background.default}
                            paddingAngle={5}
                        >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                        </Pie>
                        <Tooltip content={<CustomTooltipPie />} />
                    </PieChart>    
                </ResponsiveContainer>
            );
        case "area":
            return(
                <ResponsiveContainer height={200} width="99%" className="responsivechart">
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0}}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis/>
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="players" stroke={COLORS[0]} fill={COLORS[0]} />
                </AreaChart>
            </ResponsiveContainer>
            );
        default:
            return(<></>);
    }
}

function RatingChart(props) {
    console.log(props.type);
    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=> {
        axios.get('http://localhost:8000/api/users').then((result)=> {
            chartData = [];
            for(let i = 9; i < 25; i++) {
                chartData.push({"name":(i+1)*100, "players":0});
            }
            for(let i = 0; i < result.data.length; i++) {
                var rating = Math.round(parseInt(result.data[i].rating)/100)*100;
                for(let j = 0; j < chartData.length; j++) {
                    if(parseInt(chartData[j].name) === rating) {
                        chartData[j].players+= 1;
                    }
                }
            }
            chartData = chartData.filter(function(el) { return el.players !== 0; }); 
            setIsLoading(false);
        }).catch((err) => {

        })
    }, [])
    if(isLoading) {
        return <Loading />;
    }else {
        return returnChart(props.type, chartData, theme);
    }
}

export default RatingChart;