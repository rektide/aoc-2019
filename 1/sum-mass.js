#!/usr/bin/env node
let agg= 0
for( let i= 2; i< process.argv.length; ++i){
	const input= process.argv[ i]
	let mass= parseInt( input)
	mass/= 3
	mass= Math.floor( mass)
	mass-= 2
	console.error( input, mass)
	agg+= mass
}
console.log( agg)
