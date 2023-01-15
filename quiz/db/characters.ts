import { queryAll } from "./db.mjs";

export interface CharacterOptions {
  excludeChars?: number[];
  excludeAnimes?: number[];
  mainRoleOnly?: boolean;
  maxPopularity?: number;
  minPopularity?: number;
}

export interface DBCharacter {
  id: number;
  title: string;
  image: string;
  role: string;
  animes: {
    id: string;
    title: string;
    alternative_titles: {
      type: string;
      title: string;
    };
  }[];
}

export async function getRandomCharacters(
  count = 1,
  options: CharacterOptions = {}
): Promise<DBCharacter[]> {
  let queryParams: any[] = [];
  let query = `SELECT characters.*, anime_characters.role,
    json_group_array(json_object('id', animes.id, 'title', animes.title, 'alternative_titles', animes.alternative_titles)) as 'animes'
    FROM characters`;

  // add anime info as well
  query += ` LEFT JOIN 'anime_characters' ON anime_characters.character_id = characters.id 
    LEFT JOIN 'animes' ON anime_characters.anime_id = animes.id`;

  // ignore any characters without proper image
  query += ` WHERE characters.image IS NOT "https://cdn.myanimelist.net/images/questionmark_23.gif"`;

  // optional where clauses
  if (options.excludeChars) {
    query += ` AND characters.id NOT IN (${options.excludeChars
      .map((_) => "?")
      .join(",")})`;
    queryParams.push(...options.excludeChars);
  }
  if (options.excludeAnimes) {
    query += ` AND animes.id NOT IN (${options.excludeAnimes
      .map((_) => "?")
      .join(",")})`;
    queryParams.push(...options.excludeAnimes);
  }
  if (options.mainRoleOnly) {
    query += ` AND anime_characters.role = "Main"`;
  }
  if (options.maxPopularity) {
    query += ` AND animes.popularity <= ?`;
    queryParams.push(options.maxPopularity);
  }
  if (options.minPopularity) {
    query += ` AND animes.popularity >= ?`;
    queryParams.push(options.minPopularity);
  }
  // group by char.id, preventing doubles
  query += ` GROUP BY characters.id`;

  // order random
  query += ` ORDER BY RANDOM()`;

  // limit by count
  query += ` LIMIT 0,?`;
  queryParams.push(count);

  // console.log("QUERY", query, queryParams);
  const res = await queryAll(query, ...queryParams);
  return res.map((r) => {
    const animes = JSON.parse(r.animes).map((a) => {
      return { ...a, alternative_titles: JSON.parse(a.alternative_titles) };
    });
    return { ...r, animes };
  });
}
