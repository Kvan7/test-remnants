import type {
  BaseItemTypes,
  Expedition2Recipes,
  Expedition2Runes,
  Expedition2RunesWeights,
  ExpeditionCategory,
  Remnants,
  Reward,
  RuneWeight,
} from './interfaces';

export let BASE_ITEM_TYPES: string[] = [];
export let EXPEDITION_2_RECIPES: Expedition2Recipes[] = [];
export let EXPEDITION_2_RUNES: string[] = [];
export let EXPEDITION_2_RUNES_WEIGHTS: Expedition2RunesWeights[] = [];
export let EXPEDITION_CATEGORY: string[] = [];

export let REWARDS: Reward[] = [];
export let WEIGHTS: RuneWeight[] = [];

export let REMNANTS: Remnants;

export async function init() {
  console.log('init');
  const baseTypes: BaseItemTypes[] = await (
    await fetch(`${import.meta.env.BASE_URL}data/tables/BaseItemTypes.json`)
  ).json();
  BASE_ITEM_TYPES = baseTypes.map((t) => t.Name);

  EXPEDITION_2_RECIPES = await (
    await fetch(`${import.meta.env.BASE_URL}data/tables/Expedition2Recipes.json`)
  ).json();

  const runes: Expedition2Runes[] = await (
    await fetch(`${import.meta.env.BASE_URL}data/tables/Expedition2Runes.json`)
  ).json();
  EXPEDITION_2_RUNES = runes.map((r) => r.Id);

  EXPEDITION_2_RUNES_WEIGHTS = await (
    await fetch(`${import.meta.env.BASE_URL}data/tables/Expedition2RunesWeights.json`)
  ).json();

  const categories: ExpeditionCategory[] = await (
    await fetch(`${import.meta.env.BASE_URL}data/tables/ExpeditionCategory.json`)
  ).json();
  EXPEDITION_CATEGORY = categories.map((c) => c.Id);

  REWARDS = EXPEDITION_2_RECIPES.map((r) => ({
    ...r,
    Runes: r.Runes.map((r) => EXPEDITION_2_RUNES[r]!),
    Reward: r.Reward !== null ? BASE_ITEM_TYPES[r.Reward]! : r.Description,
    Category: EXPEDITION_CATEGORY[r.Category]!,
  }));
  WEIGHTS = EXPEDITION_2_RUNES_WEIGHTS.map((w) => ({
    ...w,
    HighlightedRune: EXPEDITION_2_RUNES[w.HighlightedRune]!,
  }));

  REMNANTS = await (await fetch(`${import.meta.env.BASE_URL}data/remnants.json`)).json();
}
