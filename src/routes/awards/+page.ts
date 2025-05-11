import axios from 'axios';
import { db } from '$lib/supabase';
import { error, isHttpError, isRedirect } from '@sveltejs/kit';

import { BACKEND_URL } from '$lib/config/config';

import type { AwardResponse, AwardsResponse } from '$lib/types/award/award.js';
import type { Meta } from '$lib/types/meta/meta.js';
import type { ErrorResponse } from '$lib/types/error/error.js';

export async function load({ url }) {
  const page: number = parseInt(url.searchParams.get('page') ?? '1');
  const limit: number = 8;
  const offset: number = (page - 1) * limit;
  const sortBy: string = url.searchParams.get("sortBy") ?? "award_date"; 
  const sortOrder: string = url.searchParams.get("sortOrder") ?? "desc";
  const search: string = url.searchParams.get("search") ?? "";
  const category: string | null = url.searchParams.get("category") ?? null;
  const level: string | null = url.searchParams.get("level") ?? null;
  const title: string | null = url.searchParams.get("title") ?? null;

  const meta: Meta = {
    title: 'Awards | English Society-Bozz',
    description:
      "From awards to major milestones, see how far we've come. This section showcases our proudest moments and the progress we've made over time.",
    url: url.href
  };

  const { data: awardCategories, error: awardCategoriesFetchingError } = await db.from("award_categories").select("category");
  const { data: awardLevels, error: awardLevelsFetchingError } = await db.from("award_levels").select("level");
  const { data: awardTitles, error: awardTitlesFetchingError } = await db.from("award_titles").select("title");

  if (
      awardCategoriesFetchingError ||
      awardLevelsFetchingError ||
      awardTitlesFetchingError
  ) {
      throw error(500, "Internal Server Error");
  }

  let urlRequest: string = `${BACKEND_URL}/awards?search=${encodeURIComponent(search)}&sortBy=${encodeURIComponent(sortBy)}&sortOrder=${encodeURIComponent(sortOrder)}&limit=${limit}&offset=${offset}`;
  if (category) urlRequest = `${urlRequest}&category=${category}`;
  if (level) urlRequest = `${urlRequest}&level=${level}`;
  if (title) urlRequest = `${urlRequest}&title=${title}`;

  try {
    const res = await axios.get<AwardsResponse>(
      urlRequest
    );
    const awards: AwardResponse[] = res.data.data;
    const count: number = res.data.count;
    const pageCount: number = Math.ceil(count / limit);

    const showPagination: boolean = count > limit;

    if ((page > pageCount && count > 0) || page < 1)
      throw error(404, 'Not Found');

    meta.title = `Awards - Page ${page} | English Society-Bozz`;

    return { awards, pageCount, page, meta, showPagination, awardCategories, awardLevels, awardTitles, search, sortBy, sortOrder, category, level, title };
  } catch (err: unknown) {
    if (axios.isAxiosError<ErrorResponse>(err)) {
      if (err?.response?.status === 404) throw error(404, 'Not Found');
      return { err, meta };
    } else if (isRedirect(err) || isHttpError(err)) {
      throw err;
    } else {
      throw error(500, 'Unexpected error');
    }
  }
}
