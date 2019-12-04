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

export function mapWire( wire, area= {}, n= 1, cb){
	let
	  x= 0,
	  y= 0,
	  l= 0
	function assert( x, y, len){
		if( !area[ x]){
			area[ x]= {}
		}
		const had= area[ x][ y]
		if( had){
			if( had.filter( h=> h.n=== n).length){
				// already seen this wire here
				return
			}
			cb&& cb({ x, y, len, had, area})
			had.push({ n, len})
		}else{
			area[ x][ y]= [{ n, len}]
		}
	}
	let start, end
	for( let seg of wire){
		let
		  h= seg.horizontal,
		  end= h? x+ seg.absolute: y+ seg.absolute
		if( seg.positive){
			for( let i= h? x: y; i< end; ++i){
				assert( h? i: x, h? y: i, l++)
			}
		}else{
			for( let i= h? x: y; i> end; --i){
				assert( h? i: x, h? y: i, l++)
			}
		}
		if( h){
			x+= seg.absolute
		}else{
			y+= seg.absolute
		}
		//console.error({ x, y, seg: seg.text})
	}
	return area
}

export function main(){
	// read first wire
	const
	  w1= parseWire( process.argv[ 2]),
	  w2= parseWire( process.argv[ 3]),
	  area= mapWire( w1)

	// read second wire & look for match
	let
	  x,
	  y,
	  d= Number.POSITIVE_INFINITY
	mapWire( w2, area, 2, function({ x: xB, y: yB}){
		const dB= Math.abs( xB)+ Math.abs( yB)
		if( dB=== 0){
		}else if( dB< d){
			d= dB
			x= xB
			y= yB
			console.error({ dB, x: xB, y: yB, best: true}) // errlog intersection
		}else{
			console.error({ dB, x: xB, y: yB}) // errlog intersection
		}
	})
	console.log({ d, x, y})
}
if( `file://${process.argv[ 1]}`=== import.meta.url){
	main()
}
