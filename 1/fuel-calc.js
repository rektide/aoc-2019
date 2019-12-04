#!/usr/bin/env node

function fuel( weight){
	weight/= 3
	weight= Math.floor( weight)
	weight-= 2
	return weight> 0? weight: 0
}

function fuels( payload){
	let
	  agg= 0,
	  step= payload
	while( true){
		step= fuel( step)
		if( step<= 0){
			break
		}
		console.error( payload, step)
		agg+= step
	}
	return agg
}


let agg= 0
for( let i= 2; i< process.argv.length; ++i){
	const
	  payload= process.argv[ i],
	  f= fuels( payload)
	console.error( payload, "+", f)
	agg+= f
}
console.log( agg)
