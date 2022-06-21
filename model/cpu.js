class Cpu {
    constructor() {}

    //Execute process 
    run(process, quantum) {

        for( let i = 0; i < quantum; i++) {

            this.#logProcess(process)   //log process
            process.time--              //execute process
            
            if (!process.time) {        // process is ready before quantum ends
                break
            }
        }

        this.#logProcess()              //~console.log('\n')

        if(process.time > 0) {
            return process
        }
    }

    //log processes
    #logProcess(process) {
        if(process) {
            console.log(`CPU -> ${process.name} | ${process.time}`)
        }

        else {
            console.log('')
        }
    }
}

module.exports = Cpu