import { getTotalPages, getParams } from "./index";

test("getTotalPages handles finding total page numbers gracefully", () => {
  const test = getTotalPages()
  expect(test).toBe(1);
});

test("getTotalPages finds the the last page", () => {
  const res = {
    headers: {
      link: '<https://api.github.com/search/repositories?per_page=30&page=2&q=thing>; rel="next", <https://api.github.com/search/repositories?per_page=30&page=34&q=thing>; rel="last"'
    }
  }
  const test = getTotalPages(res)
  expect(test).toBe('34');
});

test('getParams handles no params', () => {
  const test = getParams({})
  expect(test).toStrictEqual({
    "page": undefined,
    "per_page": 30,
    "q": "",
    "sort": undefined,
  });
})

test('getParams handles multiple search terms', () => {
  const test = getParams({
    searchTerm: 'hello there, user-123'
  })
  expect(test).toStrictEqual({
    "page": undefined,
    "per_page": 30,
    "q": "hello+there,+user-123",
    "sort": undefined,
  });
})

test('getParams handles multiple languages', () => {
  const test = getParams({
    searchTerm: 'hello there, user-123',
    languages: ['go', 'javascript']
  })
  expect(test).toStrictEqual({
    "page": undefined,
    "per_page": 30,
    "q": "hello+there,+user-123+language:go+javascript",
    "sort": undefined,
  });
})

test('getParams ignores "bestMatch" for sorting', () => {
  const test = getParams({
    searchTerm: 'hello there, user-123',
    languages: ['go', 'javascript'],
    sort: "bestMatch"
  })
  expect(test).toEqual({
    "page": undefined,
    "per_page": 30,
    "q": "hello+there,+user-123+language:go+javascript",
    "sort": undefined,
  });
})