/* global Promise, fetch, window, cytoscape, document, tippy, _ */
import './main.css';
import cytoscape from 'cytoscape';

const uploadFilePpi = async () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.csv, .txt';

  fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      try {
          const response = await fetch('YOUR_ENDPOINT_URL', {
              method: 'POST',
              body: formData
          });
          
          const data = await response.json();
          console.log(data);
      } catch (error) {
          console.error("There was an error uploading the file:", error);
      }
  };

  fileInput.click();
}

const byIdPpi = async (id) => {
  try {
      const response = await fetch(`YOUR_ENDPOINT_URL/${id}`, {
          method: 'GET'
      });
      
      const data = await response.json();
      console.log(data);
  } catch (error) {
      console.error("There was an error fetching the data:", error);
  }
}




