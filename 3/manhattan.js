export function parseWire( wire){
	return wire
		.split( ",")
		.map( function( segment){
			const
			  direction= segment[ 0],
			  positive= direction== "R"|| direction== "U",
			  horizontal= direction== "R"|| direction== "L",
			  distance= parseInt( segment.slice( 1)),
			  absolute= positive? distance: -distance
			return {
				text: segment,
				direction,
				positive,
				horizontal,
				distance,
				absolute
			}
		})
}

export function mapWire( wire, area= [], cb, n= 1){
	let
	  x= 0,
	  y= 0
	function assert( x, y){
		if( !area[ x]){
			area[ x]= []
		}
		const had= area[ x][ y]
		if( had){
			if( had.indexOf( n)!== -1){
				// already seen this wire here
				return
			}
			cb&& cb( x, y, had, area)
			had.push( n)
		}else{
			area[ x][ y]= [ n]
		}
	}
	let start, end
	for( let seg of wire){
		if( seg.horizontal){
			start= x
			end= x+ seg.absolute
		}else{
			start= y
			end= y+ seg.absolute
		}
		if( !seg.positive){
			let tmp= start
			start= end
			end= tmp
		}
		for( let i= start; i< end; ++i){
			if( seg.horizontal){
				assert( i, y)
			}else{
				assert( x, i)
			}
		}
		if( seg.horizontal){
			x+= seg.absolute
		}else{
			y+= seg.absolute
		}
		console.error({ x, y, seg: seg.text})
	}
}

export function intersect(){
	const
	  w1= parseWire( process.argv[ 2])
	  w2= parseWire( process.argv[ 3])


}

let area= []
mapWire( w1, area)

