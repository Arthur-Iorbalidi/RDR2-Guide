import {
  IAuthUserResponse,
  ICheckUserResponse,
  ICreateUserDto,
  IErrorResponse,
  IHorsesResponse,
  ILoginUserDto,
  ISearch,
  ISideQuestsResponse,
  IStoryQuestsResponse,
  IUpdateUserDto,
  IWeapon,
  IWeaponsResponse,
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

  async addWeaponToSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getToken();

      const response = await this.api.post(
        `users/saved/weapons/${id}`,
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

  async removeWeaponFromSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getToken();

      const response = await this.api.delete(`users/saved/weapons/${id}`, {
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

  async addHorseToSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getToken();

      const response = await this.api.post(
        `users/saved/horses/${id}`,
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

  async removeHorseFromSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getToken();

      const response = await this.api.delete(`users/saved/horses/${id}`, {
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

  async addStoryQuestToSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getToken();

      const response = await this.api.post(
        `users/saved/story-quests/${id}`,
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

  async removeStoryQuestFromSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getToken();

      const response = await this.api.delete(`users/saved/story-quests/${id}`, {
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

  async addSideQuestToSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getToken();

      const response = await this.api.post(
        `users/saved/saved/side-quests/${id}`,
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

  async removeSideQuestFromSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getToken();

      const response = await this.api.delete(`users/saved/side-quests/${id}`, {
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

  async getWeapons(params: ISearch): Promise<IWeaponsResponse> {
    const response = await this.api.get('weapons', {
      params: {
        ...(params.search !== '' ? { search: params.search } : {}),
        ...(params.sortBy !== '' ? { sortBy: params.sortBy } : {}),
        ...(params.sortOrder !== '' ? { sortOrder: params.sortOrder } : {}),
        ...(params.page ? { search: params.page } : {}),
        ...(params.limit ? { sortBy: params.limit } : {}),
      },
    });

    return response.data;
  }

  async getWeapon(
    id: number,
    errorCallback: (message: string) => void,
  ): Promise<IWeapon | undefined> {
    try {
      const response = await this.api.get(`weapons/${id}`);

      return response.data;
    } catch {
      errorCallback?.('Nothing was found');
    }
  }

  async getHorses(params: ISearch): Promise<IHorsesResponse> {
    const response = await this.api.get('horses', {
      params: {
        ...(params.search !== '' ? { search: params.search } : {}),
        ...(params.sortBy !== '' ? { sortBy: params.sortBy } : {}),
        ...(params.sortOrder !== '' ? { sortOrder: params.sortOrder } : {}),
        ...(params.page ? { search: params.page } : {}),
        ...(params.limit ? { sortBy: params.limit } : {}),
      },
    });

    return response.data;
  }

  async getHorse(
    id: number,
    errorCallback: (message: string) => void,
  ): Promise<IWeapon | undefined> {
    try {
      const response = await this.api.get(`horses/${id}`);

      return response.data;
    } catch {
      errorCallback?.('Nothing was found');
    }
  }

  async getStoryQuests(params: ISearch): Promise<IStoryQuestsResponse> {
    const response = await this.api.get('story-quests', {
      params: {
        ...(params.search !== '' ? { search: params.search } : {}),
        ...(params.sortBy !== '' ? { sortBy: params.sortBy } : {}),
        ...(params.sortOrder !== '' ? { sortOrder: params.sortOrder } : {}),
        ...(params.page ? { search: params.page } : {}),
        ...(params.limit ? { sortBy: params.limit } : {}),
      },
    });

    return response.data;
  }

  async getStoryQuest(
    id: number,
    errorCallback: (message: string) => void,
  ): Promise<IWeapon | undefined> {
    try {
      const response = await this.api.get(`story-quests/${id}`);

      return response.data;
    } catch {
      errorCallback?.('Nothing was found');
    }
  }

  async getSideQuests(params: ISearch): Promise<ISideQuestsResponse> {
    const response = await this.api.get('side-quests', {
      params: {
        ...(params.search !== '' ? { search: params.search } : {}),
        ...(params.sortBy !== '' ? { sortBy: params.sortBy } : {}),
        ...(params.sortOrder !== '' ? { sortOrder: params.sortOrder } : {}),
        ...(params.page ? { search: params.page } : {}),
        ...(params.limit ? { sortBy: params.limit } : {}),
      },
    });

    return response.data;
  }

  async getSideQuest(
    id: number,
    errorCallback: (message: string) => void,
  ): Promise<IWeapon | undefined> {
    try {
      const response = await this.api.get(`side-quests/${id}`);

      return response.data;
    } catch {
      errorCallback?.('Nothing was found');
    }
  }

  async getSavedWeapons(
    unathorizedCallback?: () => void,
  ): Promise<IWeapon[] | undefined> {
    try {
      const token = this.getToken();

      const response = await this.api.get('users/saved/weapons', {
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

  async getSavedHorses(
    unathorizedCallback?: () => void,
  ): Promise<IWeapon[] | undefined> {
    try {
      const token = this.getToken();

      const response = await this.api.get('users/saved/horses', {
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

  async getSavedStoryQuests(
    unathorizedCallback?: () => void,
  ): Promise<IWeapon[] | undefined> {
    try {
      const token = this.getToken();

      const response = await this.api.get('users/saved/story-quests', {
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

  async getSideStoryQuests(
    unathorizedCallback?: () => void,
  ): Promise<IWeapon[] | undefined> {
    try {
      const token = this.getToken();

      const response = await this.api.get('users/saved/side-quests', {
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

  // async getFavoriteMoviesReportPdf(unathorizedCallback?: () => void) {
  //   try {
  //     const token = this.getToken();

  //     const response = await this.api.get('reports/favorites/movies/pdf', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       responseType: 'blob',
  //     });

  //     return response.data;
  //   } catch (e) {
  //     if ((e as IErrorResponse).status === 401) {
  //       unathorizedCallback?.();
  //     }
  //   }
  // }

  // async getFavoriteMoviesReportDocx(unathorizedCallback?: () => void) {
  //   try {
  //     const token = this.getToken();

  //     const response = await this.api.get('reports/favorites/movies/docx', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       responseType: 'blob',
  //     });

  //     return response.data;
  //   } catch (e) {
  //     if ((e as IErrorResponse).status === 401) {
  //       unathorizedCallback?.();
  //     }
  //   }
  // }

  getToken() {
    return storageAPI.get('token');
  }

  setToken(token: string) {
    storageAPI.set('token', token);
  }
}

const serverAPI = new ServerAPI();
export default serverAPI;
