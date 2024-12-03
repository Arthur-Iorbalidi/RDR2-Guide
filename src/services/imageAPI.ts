class ImageAPI {
  private baseUrl = 'https://localhost:7157/images';

  getImage(image: string) {
    return `${this.baseUrl}/${image}`;
  }
}

const imageAPI = new ImageAPI();
export default imageAPI;
