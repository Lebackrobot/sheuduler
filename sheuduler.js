import { process } from 'process'
import { cpu } from 'cpu'

class sheuduler {
    constructor(quantum) {

        this.quantum = quantum
        this.cpu = cpu()
        this.processes = []
    }


    addProcess(process) {
        this.processes.push(process)
    }

    //Sheudule Methods
    roundRobin() {
        this.processes.push(cpu.run(this.processes.shift()))

        if (this.processes.length) {
            roundRobin()
        }
    }

    forPriorities() {
        this.#sortByTicket()

        //send process to  cpu
        this.processes.push(cpu.run(this.processes.shift()))

        //recursive functionn 
        if (this.processes.length) {
            forTicket()
        }
    }

    //super important methods
    forTicket() {
        this.#swap(0, this.#getTicketIndex())
        this.processes.push(cpu.run(this.processes.shift()))
    }

    #getTicketIndex() {
        const ticket = Math.floor(Math.random() * this.processes.length)
        const index  = this.processes.findIndex(process => {
            return process == ticket
        })
        
        if( index  == -1 ) {
            getTicketIndex()
        }
    }

    #swap(i, j) {
        const process = this.processes[i]
        this.processes[i] = this.processes[j]
        this.processes[j] = process
    }
    
    #sortByTicket() {
        this.processes.sort((a, b) => {
            return a.ticket - b.ticket
        })
    }
}
