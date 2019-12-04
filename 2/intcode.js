#!/usr/bin/env node
const codes= process.argv.slice( 2).map( n=> parseInt( n))
let pos= 0

//console.log(codes.join(","))

function step(){
	let
	  op= codes[ pos],
	  lPos= codes[ pos+ 1],
	  l= codes[ lPos],
	  rPos= codes[ pos+ 2],
	  r= codes[ rPos],
	  dest= codes[ pos+ 3],
	  res
	pos+= 4
	if( op=== 1){
		res= l+ r
	}else if( op=== 2){
		res= l* r
	}else if( op=== 99){
		console.log( codes.join("\n"))
		process.exit( 0)
	}else{
		console.error( "unknown intcode, system halt")
		process.exit( 1)
	}
	codes[ dest]= res
	//console.error(`${op} ${l} ${r} ${res} ${dest}`)
}

while( true){
	step()
}
