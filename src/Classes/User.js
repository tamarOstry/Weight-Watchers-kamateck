
class User {
    #id
    #firstName
    #lastName
    #address
    #phone
    #email
    #height
    #weight
    constructor(id, firstName, lastName, address, phone, email, height, weight) {
        this.#id = id;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#address = address;
        this.#phone = phone;
        this.#email = email;
        this.#height = height;
        this.#weight = weight;
    }

    set id(id) { this.#id = id; }
    get id() { return this.#id; }

    set firstName(firstName) { this.#firstName = firstName }
    get firstName() { return this.#firstName; }

    set lastName(lastName) { this.#lastName = lastName }
    get lastName() { return this.#lastName; }

    set address(address) { this.#address = address; }
    get address() { return this.#address; }

    set phone(phone) { this.#phone = phone; }
    get phone() { return this.#phone; }

    set email(email) { this.#email = email; }
    get email() { return this.#email; }

    set height(height) { this.#height = height; }
    get height() { return this.#height; }

    set weight(weight) { this.#weight = weight; }
    get weight() { return this.#weight; }

}

