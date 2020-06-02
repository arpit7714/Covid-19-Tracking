import React,{Component}  from 'react';
import ReactCSSTransitionGroup from 'react-transition-group'; // ES6
import {useSpring, animated} from 'react-spring';
function Fade(){
  	
 const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
  const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

  const [props, set] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
  return (
    <animated.div
      class="card"
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      style={{ transform: props.xys.interpolate(trans) }}
    />
  )
}

class Block extends React.Component{
	state = {
		blocktext : "Global"
	}
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
					<p className="block_text">{this.state.blocktext} Data</p>
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
