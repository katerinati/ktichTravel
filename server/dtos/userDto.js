module.exports = class UserDto {
    email;
    id;
    isActivated;
    firstName;
    lastName;
    age;
    dreamCountry;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.age = model.age;
        this.dreamCountry = model.dreamCountry;

    }
}