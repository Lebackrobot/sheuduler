export class cpu {
    constructor() { }

    run(process) {
        if (process.time--)
            return process
    }
}