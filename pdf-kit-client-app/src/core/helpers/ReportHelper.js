class ReportHelper {
	/**
	 * Extracts the file name from the Content-Disposition header.
	 * @param {string} contentDisposition - The Content-Disposition header value.
	 * @returns {string|null} - The extracted file name or null if not found.
	 */
	static getFileNameByContentDispositionHeader(contentDisposition) {
		if (!contentDisposition) {
			return "";
		}

		const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
		const matches = fileNameRegex.exec(contentDisposition);

		if (matches && matches[1]) {
			return matches[1].replace(/['"]/g, ""); // Remove quotes
		}

		return "";
	}
}
export default ReportHelper;
