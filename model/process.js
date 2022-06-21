class Process {
    constructor(name, pid, time, ticket, memory, uid) {
        this.name = name
        this.pid = pid
        this.time = time
        this.ticket = ticket
        this.memory = memory
        this.uid = uid

        this._time = time
    }
}

module.exports = Process