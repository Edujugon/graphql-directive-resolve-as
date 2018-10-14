const { graphql } = require('graphql');
const nock = require('nock');
const { resolveAs } = require('../src/index');
const schema = require('../example/schema');

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

afterAll(() => {
  nock.enableNetConnect();
});

test('getDirectiveDeclaration should be defined', () => {
  expect(resolveAs.getDirectiveDeclaration()).toMatchSnapshot();
});

test('resolves correctly', async () => {
  const response = await graphql(
    schema,
    `
      query {
        me {
          name
          lastName
        }
      }
    `
  );
  expect(response).toMatchSnapshot();
});

test('response is expected object', async () => {
  const response = await graphql(
    schema,
    `
      query {
        me {
          name,
          country,
          city,
          neighborhood,
          firstFriend
        }
      }
    `
  );
  expect(response).toEqual(
    {"data": {"me": {"name": "John", "country": "Germany", "city": "Berlin", "neighborhood": "Kreuzberg", "firstFriend": "Edu"}}}
  );
});
