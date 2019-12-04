const 
  min= parseInt( process.argv[ 2]),
  min_= min,
  max= parseInt( process.argv[ 3]),
  max_= max

console.log({ min, max})

function check( n){
	const str= new String( n)
	let
	  prev,
	  hasDouble= false
	for( let i= str.length; i>= 0; --i){
		let cur= str[ i]
		if( prev){
			if( prev< cur){
				return false
			}
			if( prev=== cur){
				hasDouble= true
			}
		}
		prev= cur
	} 
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
