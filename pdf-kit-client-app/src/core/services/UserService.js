import axios from "axios";
import environment from "./../../environment";

class UserService {
	static async getPaginatedUsersByFilterAsync(searchText, pageNumber, pageSize) {
		try {
			const response = await axios.post(`${environment.apiUrl}users`, {
				searchText: searchText,
				pageNumber: pageNumber,
				pageSize: pageSize,
			});

			return response;
		} catch (error) {
			throw error;
		}
	}
}

export default UserService;
