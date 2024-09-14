const User = require("../models/user.model");
const logger = require("../utils/logger");

const getPaginatedUsersByFilterAsync = async (request, response) => {
	try {
		const { searchText, pageNumber, pageSize } = request.body;

		logger.info(request.body);
		let listOfUsersDTO = [];
		let query = {};

		if (searchText) {
			query.fullName = { $regex: new RegExp(searchText, "i") };
		}

		let listOfUsers = await User.find(query)
			.skip((pageNumber - 1) * pageSize)
			.limit(pageSize)
			.exec();

		const totalUsers = await User.countDocuments(query);

		listOfUsers.forEach((users) => {
			listOfUsersDTO.push({
				fullName: users.fullName,
				phoneNumber: users.phoneNumber,
				email: users.email,
				address: users.address,
			});
		});

		response.json({
			items: listOfUsersDTO,
			currentPage: pageNumber,
			totalPages: Math.ceil(totalUsers / pageSize),
			totalRecordCount: totalUsers,
		});
	} catch (error) {
		logger.error(error);
		response.status(500).json({ message: "Server error" });
	}
};

module.exports = {
	getPaginatedUsersByFilterAsync,
};
