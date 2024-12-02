/* eslint-disable */
import {
  IAnimal,
  IAnimalsResponse,
  IAuthUserResponse,
  IChallenge,
  IChallengesResponse,
  ICheckUserResponse,
  ICollectible,
  ICollectiblesResponse,
  ICreateUserDto,
  IErrorResponse,
  IFaction,
  IFactionsResponse,
  IFish,
  IFishesResponse,
  IHorse,
  IHorsesResponse,
  ILoginUserDto,
  IMiscellaneou,
  IMiscellaneousResponse,
  IPlant,
  IPlantsResponse,
  IRandomEncounter,
  IRandomEncountersResponse,
  ISearch,
  ISideQuest,
  ISideQuestsResponse,
  IStoryQuest,
  IStoryQuestsResponse,
  ITableGame,
  ITableGamesResponse,
  IUpdateUserDto,
  IWeapon,
  IWeaponsResponse,
} from '@src/types/serverAPITypes';
import axios from 'axios';

import storageAPI from './storageAPI';

class ServerAPI {
  private baseUrl = 'https://localhost:7157/api';

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
        `users/saved/side-quests/${id}`,
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

  async addAnimalToSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    successCallback?.(id);
  }

  async removeAnimalFromSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    successCallback?.(id);
  }

  async addPlantToSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    successCallback?.(id);
  }

  async removePlantFromSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    successCallback?.(id);
  }

  async addFishToSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    successCallback?.(id);
  }

  async removeFishFromSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    successCallback?.(id);
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
  ): Promise<IHorse | undefined> {
    try {
      const response = await this.api.get(`horses/${id}`);

      return response.data;
    } catch {
      errorCallback?.('Nothing was found');
    }
  }

  async getStoryQuests(params: ISearch): Promise<IStoryQuestsResponse> {
    const response = await this.api.get('storyquests', {
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
  ): Promise<IStoryQuest | undefined> {
    try {
      const response = await this.api.get(`storyquests/${id}`);

      return response.data;
    } catch {
      errorCallback?.('Nothing was found');
    }
  }

  async getSideQuests(params: ISearch): Promise<ISideQuestsResponse> {
    const response = await this.api.get('sidequests', {
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
  ): Promise<ISideQuest | undefined> {
    try {
      const response = await this.api.get(`sidequests/${id}`);

      return response.data;
    } catch {
      errorCallback?.('Nothing was found');
    }
  }

  async getAnimals(params: ISearch): Promise<IAnimalsResponse> {
    const response = await this.api.get('animals', {
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

  async getAnimal(
    id: number,
    errorCallback: (message: string) => void,
  ): Promise<IAnimal | undefined> {
    try {
      const response = await this.api.get(`animals/${id}`);

      return response.data;
    } catch {
      errorCallback?.('Nothing was found');
    }
  }

  async getChallenges(params: ISearch): Promise<IChallengesResponse> {
    const response = await this.api.get('challenges', {
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

  async getChallenge(
    id: number,
    errorCallback: (message: string) => void,
  ): Promise<IChallenge | undefined> {
    try {
      const response = await this.api.get(`challenges/${id}`);

      return response.data;
    } catch {
      errorCallback?.('Nothing was found');
    }
  }

  async getCollectibles(params: ISearch): Promise<ICollectiblesResponse> {
    const response = await this.api.get('collectibles', {
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

  async getCollectible(
    id: number,
    errorCallback: (message: string) => void,
  ): Promise<ICollectible | undefined> {
    try {
      const response = await this.api.get(`collectibles/${id}`);

      return response.data;
    } catch {
      errorCallback?.('Nothing was found');
    }
  }

  async getFactions(params: ISearch): Promise<IFactionsResponse> {
    const response = await this.api.get('factions', {
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

  async getFaction(
    id: number,
    errorCallback: (message: string) => void,
  ): Promise<IFaction | undefined> {
    try {
      const response = await this.api.get(`factions/${id}`);

      return response.data;
    } catch {
      errorCallback?.('Nothing was found');
    }
  }

  async getFishes(params: ISearch): Promise<IFishesResponse> {
    const response = await this.api.get('fish', {
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

  async getFish(
    id: number,
    errorCallback: (message: string) => void,
  ): Promise<IFish | undefined> {
    try {
      const response = await this.api.get(`fish/${id}`);

      return response.data;
    } catch {
      errorCallback?.('Nothing was found');
    }
  }

  async getMiscellaneous(params: ISearch): Promise<IMiscellaneousResponse> {
    const response = await this.api.get('miscellaneous', {
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

  async getMiscellaneou(
    id: number,
    errorCallback: (message: string) => void,
  ): Promise<IMiscellaneou | undefined> {
    try {
      const response = await this.api.get(`miscellaneous/${id}`);

      return response.data;
    } catch {
      errorCallback?.('Nothing was found');
    }
  }

  async getRandomEncounters(
    params: ISearch,
  ): Promise<IRandomEncountersResponse> {
    const response = await this.api.get('randomencounter', {
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

  async getRandomEncounter(
    id: number,
    errorCallback: (message: string) => void,
  ): Promise<IRandomEncounter | undefined> {
    try {
      const response = await this.api.get(`randomencounter/${id}`);

      return response.data;
    } catch {
      errorCallback?.('Nothing was found');
    }
  }

  async getPlants(params: ISearch): Promise<IPlantsResponse> {
    const response = await this.api.get('plants', {
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

  async getPlant(
    id: number,
    errorCallback: (message: string) => void,
  ): Promise<IPlant | undefined> {
    try {
      const response = await this.api.get(`plants/${id}`);

      return response.data;
    } catch {
      errorCallback?.('Nothing was found');
    }
  }

  async getTableGames(params: ISearch): Promise<ITableGamesResponse> {
    const response = await this.api.get('tablegames', {
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

  async getTableGame(
    id: number,
    errorCallback: (message: string) => void,
  ): Promise<ITableGame | undefined> {
    try {
      const response = await this.api.get(`tablegames/${id}`);

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
  ): Promise<IHorse[] | undefined> {
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
  ): Promise<IStoryQuest[] | undefined> {
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

  async getSavedSideQuests(
    unathorizedCallback?: () => void,
  ): Promise<ISideQuest[] | undefined> {
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
