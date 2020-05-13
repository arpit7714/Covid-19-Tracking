import React,{Component}  from 'react';
import ReactCSSTransitionGroup from 'react-transition-group'; // ES6
class Block extends React.Component{
	constructor(props){
		super(props);
		this.AddCommas = this.AddCommas.bind(this);
	}
	AddCommas(nStr){
		 nStr += '';
		 var x = nStr.split('.');
		 var x1 = x[0];
		 var x2 = x.length > 1 ? '.' + x[1] : '';
		 var rgx = /(\d+)(\d{3})/;
		 while (rgx.test(x1)) {
		  x1 = x1.replace(rgx, '$1' + ',' + '$2');
		 }
		 return x1 + x2;
	}
	render(){
		var rt = this.props.param;
		return (
			<div className="block_col">	
				<div>
					<p className="headline">New Confirmed</p>
					<p className="number">{this.AddCommas(rt.NewConfirmed)}	</p>
				</div>
				<div>
					<p className="headline"> Total Confirmed</p>	
					<p className="number">{this.AddCommas(rt.TotalConfirmed)}</p>
				</div>
				<div>
					<p className="headline">New Deaths Confirmed</p>	
					<p className="number">{this.AddCommas(rt.NewDeaths)}</p>
				</div>
				<div>
					<p className="headline">Total Deaths </p>	
					<p className="number">{this.AddCommas(rt.TotalDeaths)}</p>
				</div>
				<div>
					<p className="headline">Total Recovered </p>	
					<p className="number">{this.AddCommas(rt.TotalRecovered)}</p>
				</div>
			</div>
			);
	}
}
export default Block	;
