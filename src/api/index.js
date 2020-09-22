import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

export const getTotalPages = (res) => {
  try {
    const { link } = res.headers;
    if (!link) {
      return 0;
    }
    let lastPageLink = res.url;

    link.split(" ").forEach((l, index, array) => {
      if (l.startsWith('rel="last"')) {
        lastPageLink = array[index - 1];
      }
    });
    return lastPageLink.match("&page=(.*)")[1].split(/[&]/)[0];
  } catch (err) {
    console.log(err);
    return 1;
  }
};

export const getParams = ({ searchTerm = "", page, sort, languages = [] }) => {
  let params = {
    per_page: 30,
    page,
    q: `${searchTerm.replace(/\s/g, "+")}`,
  };

  if (languages.length) {
    params.q = `${params.q}+language:${languages.join("+")}`;
  }
  if (sort !== "bestMatch") {
    params.sort = sort;
  }
  return params;
};

export const requestGitHubRepos = async ({
  searchTerm,
  page,
  sort,
  languages,
}) => {
  try {
    const params = getParams({ searchTerm, page, sort, languages });
    const res = await octokit.search.repos(params);

    const { items, total_count } = res.data;
    return {
      totalPages: getTotalPages(res),
      totalCount: total_count,
      items,
    };
  } catch (err) {
    console.log(err);
  }
};
