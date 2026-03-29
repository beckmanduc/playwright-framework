import { test, expect } from '@fixtures/api.fixture';
import apiData from '@data/api.json';
import type { CreatedPost, TodoItem, UserItem } from '@utils/jsonPlaceholderClient';

test.describe('Public API Demo', () => {
  test('GET /todos/:id should return a todo item', async ({ apiClient }) => {
    const response = await apiClient.getTodoById(apiData.todoId);

    expect(response.status()).toBe(200);

    const body = (await response.json()) as TodoItem;
    expect(body).toMatchObject({
      id: apiData.todoId,
      userId: expect.any(Number),
      title: expect.any(String),
      completed: expect.any(Boolean),
    });
  });

  test('GET /users should return a non-empty list', async ({ apiClient }) => {
    const response = await apiClient.getUsers();

    expect(response.ok()).toBeTruthy();

    const body = (await response.json()) as UserItem[];
    expect(body.length).toBeGreaterThanOrEqual(apiData.minimumUsers);
    expect(body[0]).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      email: expect.any(String),
    });
  });

  test('POST /posts should return 201 with created payload', async ({ apiClient }) => {
    const payload = apiData.postPayload;
    const response = await apiClient.createPost(payload);

    expect(response.status()).toBe(201);

    const body = (await response.json()) as CreatedPost;
    expect(body).toMatchObject({
      ...payload,
      id: expect.any(Number),
    });
  });
});
