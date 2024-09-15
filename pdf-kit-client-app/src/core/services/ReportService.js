import axios from "axios";
import environment from "./../../environment";

class ReportService {
	static async downloadReportAsync() {
		try {
			const response = await axios.get(`${environment.apiUrl}pdfManager`, {
				responseType: "blob",
			});

			return response;
		} catch (error) {
			throw error;
		}
	}
}

export default ReportService;
