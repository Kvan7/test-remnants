export interface BaseItemTypes {
  Name: string;
}

export interface Expedition2Recipes {
  Id: string;
  Runes: number[];
  Description: string;
  RuneCountRequired: number;
  MinLevelReq: number;
  MaxLevelReq: number;
  Reward: number | null;
  RewardCount: number;
  SomeBool: boolean;
  SomeFlags: number;
  RewardGemLevel: number;
  QuestFlag: number | null;
  Category: number;
  RuneWeights: number[];
  DisabledText: number | null;
}

export interface Expedition2Runes {
  Id: string;
}

export interface Expedition2RunesWeights {
  Id: string;
  RecipeRuneCount: number;
  HighlightedRuneSlot: number;
  HighlightedRune: number;
  MinAreaLevel: number;
  MaxAreaLevel: number;
  SomeBool: boolean;
  SomeFlags: number;
}

export interface ExpeditionCategory {
  Id: string;
}

export interface Reward {
  Id: string;
  Runes: string[];
  RuneCountRequired: number;
  MinLevelReq: number;
  MaxLevelReq: number;
  Reward: string;
  RewardCount: number;
  SomeBool: boolean;
  SomeFlags: number;
  RewardGemLevel: number;
  QuestFlag: number | null;
  Category: string;
  RuneWeights: number[];
  DisabledText: number | null;
}

export interface RuneWeight {
  Id: string;
  RecipeRuneCount: number;
  HighlightedRuneSlot: number;
  HighlightedRune: string;
  MinAreaLevel: number;
  MaxAreaLevel: number;
  SomeBool: boolean;
  SomeFlags: number;
}

export interface Remnants {
  recipes: {
    [key: string]: number[];
  };
  rewards: Array<{
    id: string;
    refReward: string;
    count: number;
    gemLevel?: number;
    maxLevel?: number;
    minLevel?: number;
    // optional, depending on debug level
    cat?: string;
    someBool?: boolean;
    someFlags?: number;
    weights?: number[];
  }>;
}
