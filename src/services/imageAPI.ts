class ImageAPI {
  private baseUrl = 'http://localhost:5000';

  getImage(image: string) {
    return `${this.baseUrl}/${image}`;
  }
}

const imageAPI = new ImageAPI();
export default imageAPI;
