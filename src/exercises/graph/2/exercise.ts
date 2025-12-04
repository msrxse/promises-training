import { ExerciseContext } from "../../../lib/Exercise.js";
import { skipExercise } from "../../../lib/skipExercise.js";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {};

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const group1 = async () => {
      await createPromise("A");
      await createPromise("B");
      await createPromise("C");
    };
    const group2 = async () => {
      await createPromise("D");
      await createPromise("E");
      await createPromise("F");
    };

    await Promise.all([group1(), group2()]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  () => {
    // Group 1 and 2 starts immediately and then both run in parallel
    const group1 = createPromise("A")
      .then(() => createPromise("B"))
      .then(() => createPromise("C"));

    const group2 = createPromise("D")
      .then(() => createPromise("E"))
      .then(() => createPromise("F"));

    // Promise.all creates a promise that represents both
    // Then you must return it! otherwise the fn will return undefined
    return Promise.all([group1, group2]);
  };

export default {
  makeMixedExercise: skipExercise(mixed),
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
