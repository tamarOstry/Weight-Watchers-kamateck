
class User {

    #startWeight
    #historyOfMeeting

    constructor(startWeight, historyOfMeeting) {
        this.#startWeight = startWeight;
        this.#historyOfMeeting = historyOfMeeting;
    }

    set startWeight(startWeight) { this.#startWeight = startWeight; }
    get startWeight() { return this.#startWeight; }

    set historyOfMeeting(historyOfMeeting) { this.#historyOfMeeting = historyOfMeeting; }
    get historyOfMeeting() { return this.#historyOfMeeting; }

}