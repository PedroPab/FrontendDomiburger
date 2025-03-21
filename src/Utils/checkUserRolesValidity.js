/**
 * Verifica si el usuario no tiene ninguno de los roles especificados.
 *
 * @param {Array} userRoles - Lista de roles que tiene el usuario.
 * @param {Array} roles - Lista de roles a verificar.
 * @returns {boolean} - Retorna true si el usuario no tiene ninguno de los roles, de lo contrario false.
 */
function checkUserRolesValidity(userRoles, roles) {
	// roles puede ser un array o un string
	if (!Array.isArray(roles)) {
		roles = [roles];
	}
	return roles.some(role => userRoles.includes(role));
}

export { checkUserRolesValidity };