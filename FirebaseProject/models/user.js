class User {
    constructor(id, firstName, lastName, email ) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
    }
    
}
// const userConverter = {
//     toFirestore: (user) => {
//         return {
//             firstName: user.firstName,
//             lastName: user.lastName,
//             email: user.email
//             };
//     },
//     fromFirestore: (snapshot, options) => {
//         const data = snapshot.data(options);
//         return new User(data.firstName, data.lastName, data.email);
//     }
// };

module.exports = User;