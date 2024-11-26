interface IWeapon {
  id: number;
  name: string;
  damage: number;
  range: number;
  reloadSpeed: number;
  firingRate: number;
  accuracy: number;
  ammo: number;
  cost: number;
  isUnique: boolean;
  locationId?: number;
  image?: string;
  location?: ILocation;
}

interface ILocation {
  id: number;
  name: string;
  image: string;
}

interface IHorse {
  id: number;
  name: string;
  health: number;
  stamina: number;
  speed: number;
  accelerarion: number;
  handlingId: number;
  locationId?: number;
  image?: string;
  location?: ILocation;
  handling: IHandling;
}

interface IStoryQuest {
  id: number;
  number: number;
  name: string;
  reward?: string;
  locationId?: number;
  image?: string;
  location?: ILocation;
}

interface ISideQuest {
  id: number;
  name: string;
  reward: string;
  questGiver: string;
  isMissable: boolean;
  missableChapter?: string;
  locationId?: number;
  image?: string;
  location?: ILocation;
}

interface IHandling {
  id: number;
  handling: string;
}

interface IWeaponsResponse {
  data: IWeapon[];
  pagination: IPagination;
}

interface IHorsesResponse {
  data: IHorse[];
  pagination: IPagination;
}

interface IStoryQuestsResponse {
  data: IStoryQuest[];
  pagination: IPagination;
}

interface ISideQuestsResponse {
  data: ISideQuest[];
  pagination: IPagination;
}

interface IPagination {
  total: number;
  limit: number;
  total_pages: number;
  current_page: number;
}

interface ISearch {
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: number;
  limit?: number;
}

interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  weapons: Array<{ id: number }>;
  horses: Array<{ id: number }>;
  storyQuests: Array<{ id: number }>;
  sideQuests: Array<{ id: number }>;
}

interface ICreateUserDto {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface IUpdateUserDto extends Partial<ICreateUserDto> {
  oldPassword?: string;
}

interface ILoginUserDto {
  email: string;
  password: string;
}

interface IAuthUserResponse {
  user: IUser;
  token: string;
}

interface ICheckUserResponse {
  isAuthorized: boolean;
  user: IUser | undefined;
}

interface IErrorResponse {
  status: number;
  response: {
    data: {
      statusCode: number;
      message: string;
    };
  };
}

export type {
  IAuthUserResponse,
  ICheckUserResponse,
  ICreateUserDto,
  IErrorResponse,
  IHorse,
  IHorsesResponse,
  ILocation,
  ILoginUserDto,
  ISearch,
  ISideQuest,
  ISideQuestsResponse,
  IStoryQuest,
  IStoryQuestsResponse,
  IUpdateUserDto,
  IUser,
  IWeapon,
  IWeaponsResponse,
};
