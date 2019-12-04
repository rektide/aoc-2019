"use module"
import Intcode from "./intcode.js"

const
  output= process.env.OUTPUT|| 19690720,
  intcode= new Intcode()
intcode.save()

for( let noun= 0; noun<= 99; ++noun){
	for( let verb= 0; verb<= 99; ++verb){
		intcode.restore()
		intcode.mem[ 1]= noun
		intcode.mem[ 2]= verb
		try{
			intcode.run()
			if( intcode.mem[ 0]=== output){
				console.log({ noun, verb})
			}
		}catch(ex){
		}
	}
}
