import { ExerciseContext } from "../../../lib/Exercise.js";
import { skipExercise } from "../../../lib/skipExercise.js";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    try {
      await createPromise("A");
      await createPromise("B");
      await createPromise("C");
      await createPromise("D");
    } catch (error) {}
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    await createPromise("A");
    await createPromise("B");
    await createPromise("C");
    await createPromise("D");
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    try {
      await createPromise("A");
      try {
        await createPromise("B");
        try {
          await createPromise("C");
          try {
            await createPromise("D");
          } catch (error) {}
        } catch (error) {}
      } catch (error) {}
    } catch (error) {}
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
