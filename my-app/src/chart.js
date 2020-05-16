import CanvasJSReact from "./canvasjs.react";
import React,{Component}  from 'react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints=[];
var dataPoints2=[]
class Canvas extends Component {
	state = {
		render : 0
	};
    componentDidUpdate(prev){
    	 	if(this.props.test !== prev.test) {
					const data = this.props.test;
				    const len  = data.length;
				    console.log(this.props.test);
				    dataPoints = [];
				    for (var i = 0; i < len; i++) {
				    		let d = new Date(data[i].Date);
				    		let r = d.toUTCString();
				    		// console.log(r);
				    		var year = new Date(r).getFullYear();
				    		var date = new Date(r).getMonth();
				    		var month = new Date(r).getDate();
				   			// console.log(year + ' ' + month + ' '+ date);

				    		dataPoints.push({
								x: new Date(year,date,month),
								y: data[i].Confirmed
							});
				    }
				    dataPoints2 = [];
				    for (var i = 0; i < len; i++) {
				    		let d = new Date(data[i].Date);
				    		let r = d.toUTCString();
				    		// console.log(r);
				    		var year = new Date(r).getFullYear();
				    		var date = new Date(r).getMonth();
				    		var month = new Date(r).getDate();
				   			// console.log(year + ' ' + month + ' '+ date);

				    		dataPoints2.push({
								x: new Date(year,date,month),
								y: data[i].Deaths
							});
				    }
				    this.setState(function(pre){
				    	return {
				    		render : pre.render +1
				   		 };
				    });
		}

	}
	render() {	
		console.log("now chart function ");
		const options = {
			theme: "light2",
			axisX: {
				valueFormatString: "DD-MMM",
				title: "Date"
			},
			axisY: {
				title: "Confirmed Cases",
				prefix: "",
				includeZero: false
			},
			data: [{
				type: "spline",
				xValueFormatString: "DD-MMM",
				yValueFormatString: "#,###",
				dataPoints: dataPoints
			}]
		}
		const options2 = {
			theme: "light2",
			axisX: {
				valueFormatString: "DD-MMM",
				title: "Date"
			},
			axisY: {
				title: "Total Deaths",
				prefix: "",
				includeZero: false
			},
			data: [{
				type: "spline",
				xValueFormatString: "DD-MMM",
				yValueFormatString: "#,###",
				dataPoints: dataPoints2
			}]
		}
		return (
		<div className = "graph">
			<CanvasJSChart options = {options} 
				 onRef={ref => this.chart = ref}
			/>
			<CanvasJSChart options = {options2} 
				 onRef={ref => this.chart = ref}
			/>

		</div>
		);
	}
}
export default Canvas;