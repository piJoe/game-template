import { fixCharacterName } from "../common/utils/animehelper.js";
import { queryAll } from "./db.mjs";

export interface AnimeOptions {
  excludeChars?: number[];
  excludeAnimes?: number[];
  maxPopularity?: number;
  minPopularity?: number;
}

export interface DBAnime {
  id: number;
  title: string;
  alternative_titles: {
    type: string;
    title: string;
  };
  episodes: number;
  popularity: number;
  status: string;
  type: string;
  year: number;
  image: string;
}

export interface DBAnimeWithChars extends DBAnime {
  characters: {
    id: number;
    title: string;
    image: string;
    role: string;
  }[];
}

export interface DBAnimeWithGenres extends DBAnime {
  genres: string[];
}

export interface DBAnimeWithStudio extends DBAnime {
  studio: string;
}

export async function getRandomAnimesWithCharacters(
  count = 1,
  options: AnimeOptions = {}
): Promise<DBAnimeWithChars[]> {
  let queryParams: any[] = [];
  let query = `SELECT animes.*, 
  json_group_array(json_object('id', characters.id, 'title', characters.title, 'image', characters.image, 'role', anime_characters.role)) as 'characters', 
  COUNT(characters.id) as 'characterCount' FROM animes`;

  // add character info as well
  query += ` LEFT JOIN 'anime_characters' ON anime_characters.anime_id = animes.id 
    LEFT JOIN 'characters' ON anime_characters.character_id = characters.id`;

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
  if (options.maxPopularity) {
    query += ` AND animes.popularity <= ?`;
    queryParams.push(options.maxPopularity);
  }
  if (options.minPopularity) {
    query += ` AND animes.popularity >= ?`;
    queryParams.push(options.minPopularity);
  }
  // group by animes.id, preventing doubles
  query += ` GROUP BY animes.id`;

  query += ` HAVING characterCount > 0`;

  // order random
  query += ` ORDER BY RANDOM()`;

  // limit by count
  query += ` LIMIT 0,?`;
  queryParams.push(count);

  // console.log("QUERY", query, queryParams);
  const result = await queryAll(query, ...queryParams);
  return result.map((r) => {
    return {
      ...r,
      alternative_titles: JSON.parse(r.alternative_titles),
      characters: JSON.parse(r.characters).map((c) => {
        return {
          ...c,
          title: fixCharacterName(c.title),
        };
      }),
    };
  });
}

export async function getRandomAnimesWithGenres(
  count = 1,
  options: AnimeOptions = {}
): Promise<DBAnimeWithGenres[]> {
  let queryParams: any[] = [];
  let query = `SELECT animes.*, 
  json_group_array(genres.name) as 'genres', COUNT(genres.id) as 'genreCount' FROM animes`;

  // add genre info as well
  query += ` LEFT JOIN 'anime_genres' ON anime_genres.anime_id = animes.id 
    LEFT JOIN 'genres' ON anime_genres.genre_id = genres.id`;

  // optional where clauses
  let wheres = ["genres.id IS NOT 46"]; // exclude 'Award Winning' as genre
  if (options.excludeAnimes) {
    wheres.push(
      `animes.id NOT IN (${options.excludeAnimes.map((_) => "?").join(",")})`
    );
    queryParams.push(...options.excludeAnimes);
  }
  if (options.maxPopularity) {
    wheres.push(`animes.popularity <= ?`);
    queryParams.push(options.maxPopularity);
  }
  if (options.minPopularity) {
    wheres.push(`animes.popularity >= ?`);
    queryParams.push(options.minPopularity);
  }

  if (wheres.length > 0) {
    query += " WHERE " + wheres.join(" AND ");
  }
  // group by animes.id, preventing doubles
  query += ` GROUP BY animes.id`;

  // order random
  query += ` ORDER BY RANDOM()`;

  // limit by count
  query += ` LIMIT 0,?`;
  queryParams.push(count);

  // console.log("QUERY", query, queryParams);
  const result = await queryAll(query, ...queryParams);
  return result.map((r) => {
    return {
      ...r,
      alternative_titles: JSON.parse(r.alternative_titles),
      genres: JSON.parse(r.genres),
    };
  });
}

export async function getRandomAnimesWithStudio(
  count = 1,
  options: AnimeOptions = {}
): Promise<DBAnimeWithStudio[]> {
  let queryParams: any[] = [];
  let query = `SELECT animes.*,
  studios.name as 'studio' FROM animes`;

  // add genre info as well
  query += ` LEFT JOIN 'anime_studios' ON anime_studios.anime_id = animes.id 
    LEFT JOIN 'studios' ON anime_studios.studio_id = studios.id`;

  // optional where clauses
  let wheres = [];
  if (options.excludeAnimes) {
    wheres.push(
      `animes.id NOT IN (${options.excludeAnimes.map((_) => "?").join(",")})`
    );
    queryParams.push(...options.excludeAnimes);
  }
  if (options.maxPopularity) {
    wheres.push(`animes.popularity <= ?`);
    queryParams.push(options.maxPopularity);
  }
  if (options.minPopularity) {
    wheres.push(`animes.popularity >= ?`);
    queryParams.push(options.minPopularity);
  }

  if (wheres.length > 0) {
    query += " WHERE " + wheres.join(" AND ");
  }
  // group by animes.id, preventing doubles
  query += ` GROUP BY animes.id`;

  // order random
  query += ` ORDER BY RANDOM()`;

  // limit by count
  query += ` LIMIT 0,?`;
  queryParams.push(count);

  // console.log("QUERY", query, queryParams);
  const result = await queryAll(query, ...queryParams);
  return result.map((r) => {
    return {
      ...r,
      alternative_titles: JSON.parse(r.alternative_titles),
    };
  });
}

export async function getAllAnimeGenres(): Promise<string[]> {
  return (
    await queryAll("SELECT name FROM genres WHERE genres.id IS NOT 46")
  ).map((r) => r.name);
}

export async function getAllAnimeStudios(): Promise<string[]> {
  return (await queryAll("SELECT name FROM studios")).map((r) => r.name);
}
