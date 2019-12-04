#!/usr/bin/env node

function parseMem( argv= process.argv){
	argv= argv.slice( 2)
	return argv.map( n=> parseInt( n))
}

function Intcode( mem= parseMem()){
	if( !(this instanceof Intcode)){
		return new Intcode( mem)
	}
	this.ip= 0
	this.mem= mem
	return this
}
Intcode.prototype.step= function(){
	let
	  m= this.mem,
	  ip= this.ip,
	  op= m[ ip],
	  lPos= m[ ip+ 1],
	  l= m[ lPos],
	  rPos= m[ ip+ 2],
	  r= m[ rPos],
	  dest= m[ ip+ 3],
	  res
	this.ip+= 4
	if( op=== 1){
		res= l+ r
	}else if( op=== 2){
		res= l* r
	}else if( op=== 99){
		console.log( m.join("\n"))
		process.exit( 0)
	}else{
		console.error( "unknown intcode, system halt")
		process.exit( 1)
	}
	m[ dest]= res
}
Intcode.prototype.run= function(){
	while( true){
		this.step()
	}
}

if( typeof( require)!== "undefined"&& require.main=== module){
	let c= new Intcode()
	c.run()
}
