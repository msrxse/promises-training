import { ExerciseContext } from "../../../lib/Exercise.js";
import { skipExercise } from "../../../lib/skipExercise.js";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");

    await a.then(() => {
      const c = createPromise("C");

      return Promise.all([
        Promise.all([createPromise("B"), c]).then(() => createPromise("E")),
        Promise.all([c, createPromise("D")]).then(() => createPromise("F")),
      ]);
    });
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await createPromise("A");

    const c = createPromise("C");
    const b = createPromise("B");
    const d = createPromise("D");

    const group1 = async () => {
      await Promise.all([b, c]);
      await createPromise("E");
    };
    const group2 = async () => {
      await Promise.all([c, d]);
      await createPromise("F");
    };

    await Promise.all([group1(), group2()]);
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  () => {
    const a = createPromise("A");

    return a.then(() => {
      const c = createPromise("C");

      return Promise.all([
        Promise.all([createPromise("B"), c]).then(() => createPromise("E")),
        Promise.all([c, createPromise("D")]).then(() => createPromise("F")),
      ]);
    });
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
