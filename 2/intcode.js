function parseMem( argv= process.argv){
	argv= argv.slice( 2)
	return argv.map( n=> parseInt( n))
}

function Intcode( o){
	if( !(this instanceof Intcode)){
		return new Intcode( mem)
	}
	this.ip= 0
	this.icount= 0
	this.mem= parseMem()
	Object.assign( this, o)
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
	  destPos= m[ ip+ 3],
	  res
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

	if( this.v){
		console.error(`${this.icount}: ${res}=${lPos}:${op}:${rPos} -> ${destPos}`)
	}

	m[ destPos]= res
	this.ip+= 4
	++this.icount
}
Intcode.prototype.run= function(){
	while( true){
		this.step()
	}
}

export default Intcode

if( `file://${process.argv[1]}`=== import.meta.url){
	let c= new Intcode({
		v: process.env.V? parseInt( process.env.V): 0
	})
	c.run()
}
