import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
import axios from "axios";

function App() {
  const handleDownload = async () => {
    try {
      // Make a GET request to the server to download the PDF
      const response = await axios.get("http://localhost:4000/api/pdfManager", {
        responseType: "blob", // Important for handling binary data
      });

      // Create a URL for the blob response
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: response.headers["content-type"] })
      );

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf"); // Specify the file name
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <Button variant="text" onClick={handleDownload}>
          Download File
        </Button>
      </header>
    </div>
  );
}

export default App;
