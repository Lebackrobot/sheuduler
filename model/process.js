export class process {
    constructor(name, time, memory, ticket, pid, uid) {
        this.name = name
        this.pid = pid
        this.uid = uid
        this.ticket = ticket
        this.memory = memory
        this.time = time
    }
}