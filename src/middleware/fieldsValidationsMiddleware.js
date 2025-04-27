export class FieldValidations {
	// General validation - id parameter
	validateIdParameter(req, res, next) {
		const { id } = req.params;

		// Error: id missing 
		if (!id) return res.status(400).json({ message: "Parâmetro 'id' não informado!" });

		const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

		// Error: incorrect id pattern (structure UUID)
		if (!id.match(uuidRegex)) return res.status(400).json({ message: "Parâmetro 'id' inválido!" });

		return next();
	};

	// Data validations - Create User and Login
	valitadeUserData(req, res, next) {
		const emptyFields = [];
		const { username, password } = req.body;

		if (!username) emptyFields.push('usuário');
		if (!password) emptyFields.push('senha');

		if (emptyFields.length == 0) {
			return next();
		} else {
			if (emptyFields.length > 1) {
				return res
					.status(400)
					.json({ message: `Os campos ${emptyFields.join(', ')} são obrigatórios!` });
			} else {
				return res.status(400).json({ message: `O campo ${emptyFields} é obrigatório!` });
			}
		}
	};

	// Data validations - Employees
	validateEmployeeData(req, res, next) {
		const emptyFields = [];
		const { name, cpf, admissionDate, isPendingVacation } = req.body;

		if (!name) emptyFields.push('nome');
		if (!cpf) emptyFields.push('cpf');
		if (!admissionDate) emptyFields.push('data de admissão');
		if (isPendingVacation == undefined) emptyFields.push('férias pendentes');

		if (emptyFields.length == 0) {
			return next();
		} else {
			if (emptyFields.length > 1) {
				return res
					.status(400)
					.json({ message: `Os campos ${emptyFields.join(', ')} são obrigatórios!` });
			} else
				return res.status(400).json({ message: `O campo ${emptyFields} é obrigatório!` });
		}
	};

	// Data validations - Vacation
	validateVacationData(req, res, next) {
		const emptyFields = [];
		const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

		const { employeeId, isVacationSold, soldDays, startDate, endDate } = req.body;

		if (!employeeId.match(uuidRegex))
			return res.status(400).json({ error: "ID do funcionário inválido!" });

		if (!employeeId) emptyFields.push('id do funcionário');
		if (isVacationSold == undefined) emptyFields.push('férias vendidas');
		if (isVacationSold && !soldDays) emptyFields.push('total de dias vendidos');
		if (!startDate) emptyFields.push('data de início das férias');
		if (!endDate) emptyFields.push('data de término das férias');

		if (emptyFields.length == 0) {
			return next();
		} else {
			if (emptyFields.length > 1) {
				return res
					.status(400)
					.json({ message: `Os campos ${emptyFields.join(', ')} são obrigatórios!` });
			} else
				return res.status(400).json({ message: `O campo ${emptyFields} é obrigatório!` });
		}
	};

	// Data validations - Position
	validatePositionData(req, res, next) {
		const emptyFields = [];
		const { positionName, cbo } = req.body;

		if (!positionName) emptyFields.push('cargo');
		if (!cbo) emptyFields.push('CBO');

		if (emptyFields.length == 0) {
			return next();
		} else {
			if (emptyFields.length > 1) {
				return res.status(400)
					.json({ message: `Os campos ${emptyFields.join(', ')} são obrigatórios!` });
			} else {
				return res.status(400).json({ message: `O campo ${emptyFields} é obrigatório!` });
			}
		}
	};

};