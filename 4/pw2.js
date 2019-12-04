const 
  min= parseInt( process.argv[ 2]),
  min_= min,
  max= parseInt( process.argv[ 3]),
  max_= max

console.log({ min, max})

function check( n){
	const str= new String( n)
	let
	  prev= str[ str.length -1],
	  run= 0,
	  hasDouble= false
	function maybePromote(){
		if( run=== 2){
			hasDouble= true
		}
	}
	for( let i= str.length- 2; i>= 0; --i){
		let cur= str[ i]
		if( prev< cur){
			return false
		}
		if( cur!== prev){
			maybePromote()
			run= 0
		}else{
			run= (run|| 1)+ 1
		}
		prev= cur
	} 
	maybePromote()
	return hasDouble
}

let possible= 0
for( let i= min; i< max; ++i){
	if( check( i)){
		++possible
		console.error( i)
	}
}
console.log( possible)
