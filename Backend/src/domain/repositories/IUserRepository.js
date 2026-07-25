/**
 * Puerto del repositorio de usuarios.
 * Las implementaciones deben devolver una instancia de User o null.
 */
export class IUserRepository {
  async findByEmail(_email) {
    throw new Error('IUserRepository.findByEmail must be implemented');
  }
}
