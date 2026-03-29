import type { APIRequestContext, APIResponse } from '@playwright/test';

import apiConfig from '../config/api/local.json';

const DEFAULT_API_BASE_URL = process.env.API_BASE_URL ?? apiConfig.baseURL;

export type PostPayload = {
  title: string;
  body: string;
  userId: number;
};

export type TodoItem = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type UserItem = {
  id: number;
  name: string;
  email: string;
};

export type CreatedPost = PostPayload & {
  id: number;
};

export class JsonPlaceholderClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string = DEFAULT_API_BASE_URL,
  ) {}

  async getTodoById(id: number): Promise<APIResponse> {
    return this.request.get(this.buildUrl(`/todos/${id}`));
  }

  async getUsers(): Promise<APIResponse> {
    return this.request.get(this.buildUrl('/users'));
  }

  async createPost(payload: PostPayload): Promise<APIResponse> {
    return this.request.post(this.buildUrl('/posts'), { data: payload });
  }

  private buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }
}
