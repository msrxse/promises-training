import { ExerciseContext } from "../../../lib/Exercise.js";
import { skipExercise } from "../../../lib/skipExercise.js";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await createPromise("A")
      .then(() => {
        const chain1 = createPromise("B").then(() => createPromise("D"));
        const chain2 = createPromise("C").then(() => createPromise("E"));
        return Promise.all([chain1, chain2]);
      })
      .then(() => createPromise("F"));
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    try {
      await createPromise("A");

      const chain1 = async () => {
        await createPromise("B");
        await createPromise("D");
      };

      const chain2 = async () => {
        await createPromise("C");
        await createPromise("E");
      };

      await Promise.all([chain1(), chain2()]);

      await createPromise("F");
    } catch (error) {}
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  () => {
    try {
      const a = createPromise("A");
      const b = a.then(() => createPromise("B")).then(() => createPromise("D"));
      const c = a.then(() => createPromise("C")).then(() => createPromise("E"));

      return Promise.all([b, c]).then(() => createPromise("F"));
    } catch (error) {}
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
