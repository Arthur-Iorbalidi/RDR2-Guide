interface IWeapon {
  id: number;
  name: string;
  damage: number;
  range: number;
  firingRate: number;
  accuracy: number;
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
  breed: string;
  health: number;
  stamina: number;
  speed: number;
  acceleration: number;
  handling: string;
  locationId?: number;
  image?: string;
  location?: ILocation;
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

interface IAnimal {
  id: number;
  name: string;
  hostility: string;
  isLegendary: boolean;
  locationId?: number;
  image?: string;
  location?: ILocation;
}

interface IChallenge {
  id: number;
  name: string;
  description: string;
  rank: boolean;
  reward: string;
}

interface ICollectible {
  id: number;
  name: string;
  amount: number;
  image?: string;
  sidequestId: number;
  sidequest: ISideQuest;
}

interface IFaction {
  id: number;
  name: string;
  leader: string;
  status: string;
}

interface IFish {
  id: number;
  name: string;
  bait: string;
  isLegendary: boolean;
  locationId?: number;
  location?: ILocation;
}

interface IMiscellaneou {
  id: number;
  name: string;
}

interface IPlant {
  id: number;
  name: string;
  isEdible: boolean;
  locationId?: number;
  image?: string;
  location?: ILocation;
}

interface IRandomEncounter {
  id: number;
  name: string;
  factionId: number;
  faction?: IFaction;
}

interface ITableGame {
  id: number;
  name: string;
  description: string;
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

interface IAnimalsResponse {
  data: IAnimal[];
  pagination: IPagination;
}

interface IChallengesResponse {
  data: IChallenge[];
  pagination: IPagination;
}

interface ICollectiblesResponse {
  data: ICollectible[];
  pagination: IPagination;
}

interface IFactionsResponse {
  data: IFaction[];
  pagination: IPagination;
}

interface IFishesResponse {
  data: IFish[];
  pagination: IPagination;
}

interface IMiscellaneousResponse {
  data: IMiscellaneou[];
  pagination: IPagination;
}

interface IPlantsResponse {
  data: IPlant[];
  pagination: IPagination;
}

interface IRandomEncountersResponse {
  data: IRandomEncounter[];
  pagination: IPagination;
}

interface ITableGamesResponse {
  data: ITableGame[];
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
  animals: Array<{ id: number }>;
  plants: Array<{ id: number }>;
  fishes: Array<{ id: number }>;
  challenges: Array<{ id: number }>;
  collectibles: Array<{ id: number }>;
  factions: Array<{ id: number }>;
  miscellaneous: Array<{ id: number }>;
  randomEncounters: Array<{ id: number }>;
  tableGames: Array<{ id: number }>;
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
  ILocation,
  ILoginUserDto,
  IMiscellaneou,
  IMiscellaneousResponse,
  IPagination,
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
  IUser,
  IWeapon,
  IWeaponsResponse,
};
