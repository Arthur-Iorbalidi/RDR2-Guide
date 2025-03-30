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

interface ISavedWeaponsResponse {
  data: {
    userId: string;
    weaponId: number;
    weapon: IWeapon;
  }[];
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

interface ISavedHorsesResponse {
  data: {
    userId: string;
    horseId: number;
    horse: IHorse;
  }[];
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

interface ISavedStoryQuestsResponse {
  data: {
    userId: string;
    storyquestId: number;
    storyquest: IStoryQuest;
  }[];
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

interface ISavedSideQuestsResponse {
  data: {
    userId: string;
    sidequestId: number;
    sidequest: ISideQuest;
  }[];
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

interface ISavedAnimalsResponse {
  data: {
    userId: string;
    animalId: number;
    animal: IAnimal;
  }[];
}

interface IChallenge {
  id: number;
  name: string;
  description: string;
  rank: boolean;
  reward: string;
}

interface ISavedChallengesResponse {
  data: {
    userId: string;
    challengeId: number;
    challenge: IChallenge;
  }[];
}

interface ICollectible {
  id: number;
  name: string;
  amount: number;
  image?: string;
  sidequestId?: number;
  sidequest?: ISideQuest;
}

interface ISavedCollectiblesResponse {
  data: {
    userId: string;
    collectibleId: number;
    collectible: ICollectible;
  }[];
}

interface IFaction {
  id: number;
  name: string;
  leader: string;
  status: string;
}

interface ISavedFactionsResponse {
  data: {
    userId: string;
    factionId: number;
    faction: IFaction;
  }[];
}

interface IFish {
  id: number;
  name: string;
  bait: string;
  isLegendary: boolean;
  locationId?: number;
  location?: ILocation;
}

interface ISavedFishesResponse {
  data: {
    userId: string;
    fishId: number;
    fish: IFish;
  }[];
}

interface IMiscellaneou {
  id: number;
  name: string;
}

interface ISavedMiscellaneousResponse {
  data: {
    userId: string;
    miscellaneousId: number;
    miscellaneous: IMiscellaneou;
  }[];
}

interface IPlant {
  id: number;
  name: string;
  isEdible: boolean;
  locationId?: number;
  image?: string;
  location?: ILocation;
}

interface ISavedPlantsResponse {
  data: {
    userId: string;
    plantId: number;
    plant: IPlant;
  }[];
}

interface IRandomEncounter {
  id: number;
  name: string;
  factionId: number;
  faction?: IFaction;
}

interface ISavedRandomEncountersResponse {
  data: {
    userId: string;
    randomencounterId: number;
    randomencounter: IRandomEncounter;
  }[];
}

interface ITableGame {
  id: number;
  name: string;
  description: string;
}

interface ISavedTableGamesResponse {
  data: {
    userId: string;
    tablegameId: number;
    tablegame: ITableGame;
  }[];
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
  username: string;
  nickname: string;
  weapons?: Array<{ weaponId: number }>;
  horses?: Array<{ horseId: number }>;
  storyQuests?: Array<{ storyquestId: number }>;
  sideQuests?: Array<{ sidequestId: number }>;
  animals?: Array<{ animalId: number }>;
  plants?: Array<{ plantId: number }>;
  fishes?: Array<{ fishId: number }>;
  challenges?: Array<{ challengeId: number }>;
  collectibles?: Array<{ collectibleId: number }>;
  factions?: Array<{ factionId: number }>;
  miscellaneous?: Array<{ miscellaneousId: number }>;
  randomEncounters?: Array<{ randomencounterId: number }>;
  tableGames?: Array<{ tablegameId: number }>;
}

interface ICreateUserDto {
  nickname: string;
  username: string;
  password: string;
}

interface IUpdateUserDto extends Partial<ICreateUserDto> {
  oldPassword?: string;
}

interface ILoginUserDto {
  username: string;
  password: string;
}

// interface IAuthUserResponse {
//   // user: IUser;
//   accessToken: string;
//   refreshToken: string;
// }

interface ILoginUserResponse {
  // user: IUser;
  username: string;
  nickname: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

interface ICheckUserResponse {
  isAuthorized: boolean;
  user: IUser | undefined;
}

interface IErrorResponse {
  status: number;
  response: {
    data: any;
  };
}

export type {
  IAnimal,
  IAnimalsResponse,
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
  ILoginUserResponse,
  IMiscellaneou,
  IMiscellaneousResponse,
  IPagination,
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
  IUpdateUserDto,
  IUser,
  IWeapon,
  IWeaponsResponse,
};
