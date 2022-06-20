class Address {
    #city 
    #street
    #number

    constructor(city, street, number) {
        this.#city = city;
        this.#street = street;
        this.#number = number;
    }

    set city(city) { this.#city = city; }
    get city() { return this.#city; }

    set street(street) { this.#street = street; }
    get street() { return this.#street; }

    set number(number) { this.#number = number; }
    get number() { return this.#number; }
}

