import {
  IActor,
  IActorsResponse,
  IAuthUserResponse,
  ICheckUserResponse,
  ICreateUserDto,
  IDirector,
  IDirectorsResponse,
  IErrorResponse,
  ILoginUserDto,
  IMovie,
  IMoviesResponse,
  ISearch,
  IUpdateUserDto,
} from '@src/types/serverAPITypes';
import axios from 'axios';

import storageAPI from './storageAPI';

class ServerAPI {
  private baseUrl = 'http://localhost:5000/api';

  private api = axios.create({
    baseURL: this.baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  async register(
    userDto: ICreateUserDto,
    successCallback?: (value: IAuthUserResponse) => void,
    errorCallback?: (message?: string) => void,
  ) {
    try {
      const response = await this.api.post('auth/registration', {
        name: userDto.name,
        surname: userDto.surname,
        email: userDto.email,
        password: userDto.password,
      });

      successCallback?.(response.data);
    } catch (error) {
      if ((error as IErrorResponse).response) {
        errorCallback?.((error as IErrorResponse).response.data.message);
      } else {
        errorCallback?.('Error');
      }
    }
  }

  async login(
    userDto: ILoginUserDto,
    successCallback?: (value: IAuthUserResponse) => void,
    errorCallback?: (message?: string) => void,
  ) {
    try {
      const response = await this.api.post('auth/login', {
        email: userDto.email,
        password: userDto.password,
      });

      successCallback?.(response.data);
    } catch (error) {
      if ((error as IErrorResponse).response) {
        errorCallback?.((error as IErrorResponse).response.data.message);
      } else {
        errorCallback?.('Error');
      }
    }
  }

  async updateUserInfo(
    id: number,
    userDto: IUpdateUserDto,
    successCallback?: (value: IAuthUserResponse) => void,
    errorCallback?: (message?: string) => void,
  ) {
    try {
      const token = this.getToken();

      const response = await this.api.patch(
        `users/${id}`,
        {
          ...(userDto.name !== '' ? { name: userDto.name } : {}),
          ...(userDto.surname !== '' ? { surname: userDto.surname } : {}),
          ...(userDto.email !== '' ? { email: userDto.email } : {}),
          ...(userDto.password !== '' ? { password: userDto.password } : {}),
          ...(userDto.oldPassword !== ''
            ? { oldPassword: userDto.oldPassword }
            : {}),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      successCallback?.(response.data);
    } catch (error) {
      if ((error as IErrorResponse).response) {
        errorCallback?.((error as IErrorResponse).response.data.message);
      } else {
        errorCallback?.('Error');
      }
    }
  }

  async checkUser(callback?: (response: ICheckUserResponse) => void) {
    try {
      const token = this.getToken();

      const response = await this.api.get('auth/check', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      callback?.({ isAuthorized: true, user: response.data });
    } catch {
      callback?.({ isAuthorized: false, user: undefined });
    }
  }

  async addMovieToFavorites(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getToken();

      const response = await this.api.post(
        `users/favorites/movie/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      successCallback?.(id);

      return response;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }

      return e;
    }
  }

  async removeMovieFromFavorites(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getToken();

      const response = await this.api.delete(`users/favorites/movie/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      successCallback?.(id);

      return response;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }

      return e;
    }
  }

  async addActorToFavorites(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getToken();

      const response = await this.api.post(
        `users/favorites/actor/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      successCallback?.(id);

      return response;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }

      return e;
    }
  }

  async removeActorFromFavorites(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getToken();

      const response = await this.api.delete(`users/favorites/actor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      successCallback?.(id);

      return response;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }

      return e;
    }
  }

  async addDirectorToFavorites(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getToken();

      const response = await this.api.post(
        `users/favorites/director/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      successCallback?.(id);

      return response;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }

      return e;
    }
  }

  async removeDirectorFromFavorites(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getToken();

      const response = await this.api.delete(`users/favorites/director/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      successCallback?.(id);

      return response;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }

      return e;
    }
  }

  logout() {
    storageAPI.remove('token');
  }

  async getMovies(params: ISearch): Promise<IMoviesResponse> {
    const response = await this.api.get('movies', {
      params: {
        ...(params.search !== '' ? { search: params.search } : {}),
        ...(params.sortBy !== '' ? { sortBy: params.sortBy } : {}),
        ...(params.sortOrder !== '' ? { sortOrder: params.sortOrder } : {}),
        page: params.page,
        limit: params.limit,
      },
    });

    return response.data;
  }

  async getMovie(
    id: number,
    errorCallback: (message: string) => void,
  ): Promise<IMovie | undefined> {
    try {
      const response = await this.api.get(`movies/${id}`);

      return response.data;
    } catch {
      errorCallback?.('Nothing was found');
    }
  }

  async getActors(params: ISearch): Promise<IActorsResponse> {
    const response = await this.api.get('actors', {
      params: {
        ...(params.search !== '' ? { search: params.search } : {}),
        ...(params.sortBy !== '' ? { sortBy: params.sortBy } : {}),
        ...(params.sortOrder !== '' ? { sortOrder: params.sortOrder } : {}),
        page: params.page,
        limit: params.limit,
      },
    });

    return response.data;
  }

  async getActor(
    id: number,
    errorCallback: (message: string) => void,
  ): Promise<IActor | undefined> {
    try {
      const response = await this.api.get(`actors/${id}`);

      return response.data;
    } catch {
      errorCallback?.('Nothing was found');
    }
  }

  async getDirectors(params: ISearch): Promise<IDirectorsResponse> {
    const response = await this.api.get('directors', {
      params: {
        ...(params.search !== '' ? { search: params.search } : {}),
        ...(params.sortBy !== '' ? { sortBy: params.sortBy } : {}),
        ...(params.sortOrder !== '' ? { sortOrder: params.sortOrder } : {}),
        page: params.page,
        limit: params.limit,
      },
    });

    return response.data;
  }

  async getDirector(
    id: number,
    errorCallback: (message: string) => void,
  ): Promise<IDirector | undefined> {
    try {
      const response = await this.api.get(`directors/${id}`);

      return response.data;
    } catch {
      errorCallback?.('Nothing was found');
    }
  }

  async getFavoriteMovies(
    unathorizedCallback?: () => void,
  ): Promise<IMovie[] | undefined> {
    try {
      const token = this.getToken();

      const response = await this.api.get('users/favorites/movies', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getFavoriteActors(
    unathorizedCallback?: () => void,
  ): Promise<IActor[] | undefined> {
    try {
      const token = this.getToken();

      const response = await this.api.get('users/favorites/actors', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getFavoriteDirectors(
    unathorizedCallback?: () => void,
  ): Promise<IDirector[] | undefined> {
    try {
      const token = this.getToken();

      const response = await this.api.get('users/favorites/directors', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getFavoriteMoviesReportPdf(unathorizedCallback?: () => void) {
    try {
      const token = this.getToken();

      const response = await this.api.get('reports/favorites/movies/pdf', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      return response.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getFavoriteMoviesReportDocx(unathorizedCallback?: () => void) {
    try {
      const token = this.getToken();

      const response = await this.api.get('reports/favorites/movies/docx', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      return response.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getFavoriteActorsReportPdf(unathorizedCallback?: () => void) {
    try {
      const token = this.getToken();

      const response = await this.api.get('reports/favorites/actors/pdf', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      return response.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getFavoriteActorsReportDocx(unathorizedCallback?: () => void) {
    try {
      const token = this.getToken();

      const response = await this.api.get('reports/favorites/actors/docx', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      return response.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getFavoriteDirectorsReportPdf(unathorizedCallback?: () => void) {
    try {
      const token = this.getToken();

      const response = await this.api.get('reports/favorites/directors/pdf', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      return response.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getFavoriteDirectorsReportDocx(unathorizedCallback?: () => void) {
    try {
      const token = this.getToken();

      const response = await this.api.get('reports/favorites/directors/docx', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });

      return response.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  getToken() {
    return storageAPI.get('token');
  }

  setToken(token: string) {
    storageAPI.set('token', token);
  }
}

const serverAPI = new ServerAPI();
export default serverAPI;
