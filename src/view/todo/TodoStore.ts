import Bucket from "../../plumbing/Bucket";
import {computed} from 'mobx';
import * as core from './core';

export default class TodoStore extends Bucket<core.State> {
  @computed
  get shouldFetchTodos(): boolean {
    return core.shouldFetchTodos(this.state);
  }
}