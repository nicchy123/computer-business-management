// utils/uploadImage.js

const uploadImage = async (id:string) => {
  const apiKey = '14b9705a865fb3193bb1b72962af12ff'; // Replace with your ImgBB API key
  const fileInput = document.getElementById(id) as HTMLInputElement;
  const file = fileInput.files ? fileInput.files[0] : null;

  if (file) {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('https://api.imgbb.com/1/upload?key=' + apiKey, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.data && data.data.url) {
        // Assuming the URL is present in the response
        return { url: data.data.url, success: true };
      } else {
        return { url: null, success: false, error: 'Image upload failed' };
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      return { url: null, success: false, error: 'Image upload failed' };
    }
  } else {
    console.error('No file selected.');
    return { url: null, success: false, error: 'No file selected' };
  }
};

export default uploadImage;
