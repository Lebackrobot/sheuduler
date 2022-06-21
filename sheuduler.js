
const Cpu = require('./model/cpu.js')
const Process = require('./model/process.js')
const reader = require('fs')
const delay = (n) => new Promise(r => setTimeout(r, n * 1000));

class Sheuduler {
    constructor(quantum) {

        this.cpu = new Cpu()
        
        
        this.quantum = quantum          //sheuduler time slice
        this.processTable = []          //Process Table
        this.readyProcessQueue = []     //Ready Process Queue
    }


    addProcess(process) {
        this.processTable.push(process)
    }

    //Round Robin method
    async roundRobin() {

        while(this.processTable.length) {

            const process = this.processTable.shift()                            //get first element in the process table

            if(process) {
                await delay(0.5)                                                 //only delay
                this.processTable.push(this.cpu.run(process, this.quantum))      //time slice in CPU
            }
        }

        console.log('Finish Process')
    }

    async byPriorities() {

        this.#sortByTicket()                                                    //sort process table by tickets (priority) 

        while(this.processTable.length) {                                       
            const process = this.processTable.shift()                           //get first element in the process table
            
            if(process) {
                await delay(0.5)                                                //only delay
                this.processTable.push(this.cpu.run(process, process.time))     //time slice in CPU
            }
        }

        console.log('Finish Process')
    }

    async byTicket() {
        
        while(this.processTable.length) {

            this.#swap(0, this.#getTicketIndex())                               //process with awared ticket at first 
            const process = this.processTable.shift()                           //get fist element in the process table

            if(process) {
                await delay(0.5)                                               //only delay 
                this.processTable.push(this.cpu.run(process, this.quantum))    //time slice in CPU
            }
        }
    }

    //get awared ticket index 
    #getTicketIndex() {

        while( true ) {
            const ticket = Math.floor(Math.random() * 1200)

            const index = this.processTable.findIndex(process => {      //find index method
                if(process) {
                    return process.ticket == ticket
                }
            })

            if( index  != -1 ) {
                return index                                           //return index, else continue
            }
            
        }
    }

    //a = b
    //b = a
    //swap method
    #swap(i, j) {
        const process = this.processTable[i]
        this.processTable[i] = this.processTable[j]
        this.processTable[j] = process
    }
    
    //sort by ticket
    #sortByTicket() {
        this.processTable.sort((a, b) => {
            return b.ticket - a.ticket
        })
    }

    //read file method
    async readFile(file, callback) {
        
        const processTable = []

        reader.readFile(file, 'utf-8', (err, document) => {
            
            let data = document.split('\n')
            
            this.processTable = []
            this.quantum = data.shift().split('|').pop()

            //danger line
            data.pop()
            data.forEach(line => {
                
                const props = line.split('-')[1].split('|')
                processTable.push(new Process(...props))
            })

            this.#setProcessTable(processTable)
            callback()
        })
    }

    #setProcessTable(processTable) {
        this.processTable = processTable
    }
}


//driven code

const sheuduler = new Sheuduler()                       //create sheuduler

sheuduler.readFile('./inputs/alternancia.txt', () => {  //reading file
    console.log(sheuduler.processTable)
})


