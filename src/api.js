import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

const getTotalPages = res => {
  const { link } = res.headers
  let lastPageLink = res.url

  link.split(' ').forEach((l, index, array) => {
    if (l.startsWith('rel="last"')) {
      lastPageLink = array[index - 1]
    }
  })
  return lastPageLink.match('&page=(.*)')[1].split(/[&]/)[0]
}

export const requestGitHubRepos = async ({ searchTerm, page, sort, languages }) => {
  let params = {
    per_page: 30,
    page,
    q: `${searchTerm.replace(' ', '+')}`
  }

  if (languages.length) {
    params.q = `${params.q}+language:${languages.join('+')}`;
  }
  if (sort !== 'bestMatch') {
    params.sort = sort
  }
  try {
    const res = await octokit.search
      .repos(params)

    const { items, total_count } = res.data
    return {
      totalPages: getTotalPages(res),
      totalCount: total_count,
      items,
    }
  } catch (err) {
    console.log(err)
  }
}