#!/usr/bin/env node
const payload= parseFloat( process.argv[ 2])
console.error( payload)

let
  agg= 0,
  prev,
  step= payload
while( agg!== prev){
	prev= agg
	step/= 3
	step= Math.floor( step)
	step-= 2
	if( step< 0){
		break
	}
	console.error( step)
	agg+= step
}
console.log( agg)
