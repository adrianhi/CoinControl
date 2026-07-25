export class User {
  constructor({ id, email, passwordHash, createdAt, updatedAt }) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toPublicJSON() {
    return { id: this.id, email: this.email };
  }
}
