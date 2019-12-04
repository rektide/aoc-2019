import { parseWire, mapWire} from "./manhattan.js"

export function main(){
	// read first wire
	const
	  w1= parseWire( process.argv[ 2]),
	  w2= parseWire( process.argv[ 3]),
	  area= mapWire( w1)

	// read second wire & look for shortest delay intersection
	let
	  x,
	  y,
	  best= Number.POSITIVE_INFINITY
	mapWire( w2, area, 2, function({ x: xB, y: yB, len: d2, had}){
		if( xB=== 0&& yB=== 0){
			return
		}
		const
		  d1= had[ 0].len,
		  delay= d1+ d2
		if( delay< best){
			best= delay
			x= xB
			y= yB
			console.error({ delay, x: xB, y: yB, d1, d2, best: true}) // errlog intersection
		}else{
			console.error({ delay, x: xB, y: yB, d1, d2}) // errlog intersection
		}
	})
	console.log({ best, x, y})
}
main()
