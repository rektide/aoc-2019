
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
	  sym,
	  res
	if( op=== 1){
		res= l+ r
		sym= "+"
	}else if( op=== 2){
		res= l* r
		sym= "*"
	}else if( op=== 99){
		return 1
	}else{
		throw new Error( "unknown intcode, system halt")
	}

	if( this.v){
		console.error(`${this.icount}: ${res}=${lPos}[${l}]${sym}${rPos}[${r}] -> ${destPos}`)
	}

	m[ destPos]= res
	this.ip+= 4
	++this.icount
}
Intcode.prototype.run= function(){
	let rc
	do{
		rc= this.step()
	}while( !rc)
}
Intcode.prototype.save= function(){
	this.baseMem= this.mem.slice( 0)
}
Intcode.prototype.restore= function(){
	if( !this.baseMem){
		throw new Error( "no base memory to restore")
	}
	this.mem= this.baseMem.slice( 0)
	this.icount= 0
	this.ip= 0
}

export default Intcode

if( `file://${process.argv[1]}`=== import.meta.url){
	process.on("uncaughtException", console.error)

	let c= new Intcode({
		v: process.env.V? parseInt( process.env.V): 0
	})
	if( c.v> 0){
		console.error( c.mem.join(","))
	}
	try{
		c.run()
	}catch(ex){
		console.error( "error:", ex)
		process.exit( 1)
	}
	console.log( c.mem.join(","))
}
