import {
  IAnimal,
  IAnimalsResponse,
  IChallenge,
  IChallengesResponse,
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
  ILoginUserResponse,
  IMiscellaneou,
  IMiscellaneousResponse,
  IPlant,
  IPlantsResponse,
  IRandomEncounter,
  IRandomEncountersResponse,
  ISavedAnimalsResponse,
  ISavedChallengesResponse,
  ISavedCollectiblesResponse,
  ISavedFactionsResponse,
  ISavedFishesResponse,
  ISavedHorsesResponse,
  ISavedMiscellaneousResponse,
  ISavedPlantsResponse,
  ISavedRandomEncountersResponse,
  ISavedSideQuestsResponse,
  ISavedStoryQuestsResponse,
  ISavedTableGamesResponse,
  ISavedWeaponsResponse,
  ISearch,
  ISideQuest,
  ISideQuestsResponse,
  IStoryQuest,
  IStoryQuestsResponse,
  ITableGame,
  ITableGamesResponse,
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
    successCallback?: (response: ILoginUserResponse) => void,
    errorCallback?: (error?: IErrorResponse) => void,
  ) {
    try {
      await this.api.post('auth', { ...userDto, roles: ['User'] });

      await this.login(userDto, successCallback, errorCallback);
    } catch (error) {
      errorCallback?.(error as IErrorResponse);
    }
  }

  async login(
    userDto: ILoginUserDto,
    successCallback?: (value: ILoginUserResponse) => void,
    errorCallback?: (error?: IErrorResponse) => void,
  ) {
    try {
      const response = await this.api.post('auth/login', userDto);

      this.setAccessToken(response.data.tokens.accessToken);
      this.setRefreshToken(response.data.tokens.refreshToken);

      successCallback?.(response.data);
    } catch (error) {
      if ((error as IErrorResponse).response) {
        errorCallback?.((error as IErrorResponse).response.data.message);
      }
    }
  }

  // async updateUserInfo(
  //   id: number,
  //   userDto: IUpdateUserDto,
  //   successCallback?: (value: IAuthUserResponse) => void,
  //   errorCallback?: (message?: string) => void,
  // ) {
  //   try {
  //     const token = this.getToken();

  //     const response = await this.api.patch(
  //       `users/${id}`,
  //       {
  //         ...(userDto.name !== '' ? { name: userDto.name } : {}),
  //         ...(userDto.nickName !== '' ? { surname: userDto.nickName } : {}),
  //         ...(userDto.password !== '' ? { password: userDto.password } : {}),
  //         ...(userDto.oldPassword !== ''
  //           ? { oldPassword: userDto.oldPassword }
  //           : {}),
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     successCallback?.(response.data);
  //   } catch (error) {
  //     if ((error as IErrorResponse).response) {
  //       errorCallback?.((error as IErrorResponse).response.data.message);
  //     } else {
  //       errorCallback?.('Error');
  //     }
  //   }
  // }

  async updateRefreshToken(callback?: (response: any) => void) {
    try {
      const accessToken = this.getAccessToken();
      const refreshToken = this.getRefreshToken();

      const response = await this.api.post('token/refresh', {
        accessToken,
        refreshToken,
      });

      this.setAccessToken(response.data.tokens.accessToken);
      this.setRefreshToken(response.data.tokens.refreshToken);

      callback?.({
        isAuthorized: true,
        user: {
          nickname: response.data.nickname,
          username: response.data.username,
        },
      });
    } catch {
      this.removeTokens();
      callback?.({ isAuthorized: false, user: undefined });
    }
  }

  async addWeaponToSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getAccessToken();

      const response = await this.api.post(
        `users/weapons/${id}`,
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
      const token = this.getAccessToken();

      const response = await this.api.delete(`users/weapons/${id}`, {
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
      const token = this.getAccessToken();

      const response = await this.api.post(
        `users/horses/${id}`,
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
      const token = this.getAccessToken();

      const response = await this.api.delete(`users/horses/${id}`, {
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
      const token = this.getAccessToken();

      const response = await this.api.post(
        `users/storyquests/${id}`,
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
      const token = this.getAccessToken();

      const response = await this.api.delete(`users/storyquests/${id}`, {
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
      const token = this.getAccessToken();

      const response = await this.api.post(
        `users/sidequests/${id}`,
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
      const token = this.getAccessToken();

      const response = await this.api.delete(`users/sidequests/${id}`, {
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
    try {
      const token = this.getAccessToken();

      const response = await this.api.post(
        `users/animals/${id}`,
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

  async removeAnimalFromSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getAccessToken();

      const response = await this.api.delete(`users/animals/${id}`, {
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

  async addPlantToSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getAccessToken();

      const response = await this.api.post(
        `users/plants/${id}`,
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

  async removePlantFromSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getAccessToken();

      const response = await this.api.delete(`users/plants/${id}`, {
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

  async addFishToSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getAccessToken();

      const response = await this.api.post(
        `users/fish/${id}`,
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

  async removeFishFromSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getAccessToken();

      const response = await this.api.delete(`users/fish/${id}`, {
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

  async addChallengeToSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getAccessToken();

      const response = await this.api.post(
        `users/challenges/${id}`,
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

  async removeChallengeFromSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getAccessToken();

      const response = await this.api.delete(`users/challenges/${id}`, {
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

  async addCollectibleToSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getAccessToken();

      const response = await this.api.post(
        `users/collectibles/${id}`,
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

  async removeCollectibleFromSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getAccessToken();

      const response = await this.api.delete(`users/collectibles/${id}`, {
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

  async addFactionToSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getAccessToken();

      const response = await this.api.post(
        `users/factions/${id}`,
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

  async removeFactionFromSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getAccessToken();

      const response = await this.api.delete(`users/factions/${id}`, {
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

  async addMiscellaneouToSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getAccessToken();

      const response = await this.api.post(
        `users/miscellaneous/${id}`,
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

  async removeMiscellaneouFromSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getAccessToken();

      const response = await this.api.delete(`users/miscellaneous/${id}`, {
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

  async addRandomEncounterToSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getAccessToken();

      const response = await this.api.post(
        `users/randomencounters/${id}`,
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

  async removeRandomEncounterFromSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getAccessToken();

      const response = await this.api.delete(`users/randomencounters/${id}`, {
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

  async addTableGameToSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getAccessToken();

      const response = await this.api.post(
        `users/tablegames/${id}`,
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

  async removeTableGameFromSaved(
    id: number,
    successCallback?: (id: number) => void,
    unathorizedCallback?: () => void,
  ) {
    try {
      const token = this.getAccessToken();

      const response = await this.api.delete(`users/tablegames/${id}`, {
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
    this.removeTokens();
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
    const response = await this.api.get('horse', {
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
      const response = await this.api.get(`horse/${id}`);

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

  async getFactions(params?: ISearch): Promise<IFactionsResponse> {
    const response = await this.api.get('factions', {
      params: {
        ...(params?.search !== '' ? { search: params?.search } : {}),
        ...(params?.sortBy !== '' ? { sortBy: params?.sortBy } : {}),
        ...(params?.sortOrder !== '' ? { sortOrder: params?.sortOrder } : {}),
        ...(params?.page ? { search: params?.page } : {}),
        ...(params?.limit ? { sortBy: params?.limit } : {}),
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

  async getMiscellaneous(params?: ISearch): Promise<IMiscellaneousResponse> {
    const response = await this.api.get('miscellaneous', {
      params: {
        ...(params?.search !== '' ? { search: params?.search } : {}),
        ...(params?.sortBy !== '' ? { sortBy: params?.sortBy } : {}),
        ...(params?.sortOrder !== '' ? { sortOrder: params?.sortOrder } : {}),
        ...(params?.page ? { search: params?.page } : {}),
        ...(params?.limit ? { sortBy: params?.limit } : {}),
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
    params?: ISearch,
  ): Promise<IRandomEncountersResponse> {
    const response = await this.api.get('randomencounter', {
      params: {
        ...(params?.search !== '' ? { search: params?.search } : {}),
        ...(params?.sortBy !== '' ? { sortBy: params?.sortBy } : {}),
        ...(params?.sortOrder !== '' ? { sortOrder: params?.sortOrder } : {}),
        ...(params?.page ? { search: params?.page } : {}),
        ...(params?.limit ? { sortBy: params?.limit } : {}),
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

  async getTableGames(params?: ISearch): Promise<ITableGamesResponse> {
    const response = await this.api.get('tablegames', {
      params: {
        ...(params?.search !== '' ? { search: params?.search } : {}),
        ...(params?.sortBy !== '' ? { sortBy: params?.sortBy } : {}),
        ...(params?.sortOrder !== '' ? { sortOrder: params?.sortOrder } : {}),
        ...(params?.page ? { search: params?.page } : {}),
        ...(params?.limit ? { sortBy: params?.limit } : {}),
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
  ): Promise<ISavedWeaponsResponse['data'] | undefined> {
    try {
      const token = this.getAccessToken();

      const response = await this.api.get('users/weapons', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getSavedHorses(
    unathorizedCallback?: () => void,
  ): Promise<ISavedHorsesResponse['data'] | undefined> {
    try {
      const token = this.getAccessToken();

      const response = await this.api.get('users/horses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getSavedStoryQuests(
    unathorizedCallback?: () => void,
  ): Promise<ISavedStoryQuestsResponse['data'] | undefined> {
    try {
      const token = this.getAccessToken();

      const response = await this.api.get('users/storyquests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getSavedSideQuests(
    unathorizedCallback?: () => void,
  ): Promise<ISavedSideQuestsResponse['data'] | undefined> {
    try {
      const token = this.getAccessToken();

      const response = await this.api.get('users/sidequests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getSavedAnimals(
    unathorizedCallback?: () => void,
  ): Promise<ISavedAnimalsResponse['data'] | undefined> {
    try {
      const token = this.getAccessToken();

      const response = await this.api.get('users/animals', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getSavedChallenges(
    unathorizedCallback?: () => void,
  ): Promise<ISavedChallengesResponse['data'] | undefined> {
    try {
      const token = this.getAccessToken();

      const response = await this.api.get('users/challenges', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getSavedCollectibles(
    unathorizedCallback?: () => void,
  ): Promise<ISavedCollectiblesResponse['data'] | undefined> {
    try {
      const token = this.getAccessToken();

      const response = await this.api.get('users/collectibles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getSavedFactions(
    unathorizedCallback?: () => void,
  ): Promise<ISavedFactionsResponse['data'] | undefined> {
    try {
      const token = this.getAccessToken();

      const response = await this.api.get('users/factions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getSavedFishes(
    unathorizedCallback?: () => void,
  ): Promise<ISavedFishesResponse['data'] | undefined> {
    try {
      const token = this.getAccessToken();

      const response = await this.api.get('users/fish', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getSavedMiscellaneous(
    unathorizedCallback?: () => void,
  ): Promise<ISavedMiscellaneousResponse['data'] | undefined> {
    try {
      const token = this.getAccessToken();

      const response = await this.api.get('users/miscellaneous', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getSavedPlants(
    unathorizedCallback?: () => void,
  ): Promise<ISavedPlantsResponse['data'] | undefined> {
    try {
      const token = this.getAccessToken();

      const response = await this.api.get('users/plants', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getSavedRandomEncounters(
    unathorizedCallback?: () => void,
  ): Promise<ISavedRandomEncountersResponse['data'] | undefined> {
    try {
      const token = this.getAccessToken();

      const response = await this.api.get('users/randomencounters', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
    } catch (e) {
      if ((e as IErrorResponse).status === 401) {
        unathorizedCallback?.();
      }
    }
  }

  async getSavedTableGames(
    unathorizedCallback?: () => void,
  ): Promise<ISavedTableGamesResponse['data'] | undefined> {
    try {
      const token = this.getAccessToken();

      const response = await this.api.get('users/tablegames', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.data;
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

  getAccessToken() {
    return storageAPI.get('accessToken');
  }

  getRefreshToken() {
    return storageAPI.get('refreshToken');
  }

  setAccessToken(token: string) {
    storageAPI.set('accessToken', token);
  }

  setRefreshToken(token: string) {
    storageAPI.set('refreshToken', token);
  }

  removeTokens() {
    storageAPI.remove('accessToken');
    storageAPI.remove('refreshToken');
  }
}

const serverAPI = new ServerAPI();
export default serverAPI;
