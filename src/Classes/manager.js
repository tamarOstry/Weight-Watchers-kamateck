class Manager {
    #id
    #firstName
    #lastName
    #phone
    #email
    #users
    constructor(id, firstName, lastName, phone, email) {
        this.#id = id;
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#phone = phone;
        this.#email = email;
        this.#users = [];
    }

    set id(id) { this.#id = id; }
    get id() { return this.#id; }

    set firstName(firstName) { this.#firstName = firstName; }
    get firstName() { return this.#firstName; }

    set lastName(lastName) { this.#lastName = lastName; }
    get lastName() { return this.#lastName; }

    set phone(phone) { this.#phone = phone; }
    get phone() { return this.#phone; }

    set email(number) { this.#email = email; }
    get email() { return this.#email; }

    set users(users) { this.#users = users; }
    get users() { return this.#users; }


}