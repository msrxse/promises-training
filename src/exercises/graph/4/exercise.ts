import { ExerciseContext } from "../../../lib/Exercise.js";
import { skipExercise } from "../../../lib/skipExercise.js";

const mixed =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    const a = createPromise("A");

    const b = a.then(() => createPromise("B"));
    const c = a.then(() => createPromise("C"));
    const d = a.then(() => createPromise("D"));

    const e = Promise.all([b, c]).then(() => createPromise("E"));

    await Promise.all([a, b, c, d, e]);
  };

const asyncAwait =
  ({ createPromise }: ExerciseContext) =>
  async () => {
    try {
      await createPromise("A");
      // The outer trycatch does not protect 'D' because it is not awaited
      // catch is needed otherwise it would be cause an unhandled rejection
      createPromise("D").catch(() => {});
      await Promise.all([createPromise("C"), createPromise("B")]);
      await createPromise("E");
    } catch (error) {}
  };

const thenCatch =
  ({ createPromise }: ExerciseContext) =>
  () => {
    const a = createPromise("A");

    // .then always returns promises
    // this is called "promise flattening" .then adopts the state of the returned promise it has
    const b = a.then(() => createPromise("B")); // So here Promise for B - but waits for A
    const c = a.then(() => createPromise("C")); // ...
    const d = a.then(() => createPromise("D")); // ...
    // Any tryCatch here would actually be bad - would swallow errors and Promise.all wont see then  right after

    const e = Promise.all([b, c]).then(() => createPromise("E")); // Here as before, waits for B and C, and .then returns E

    // This promise only resolves then everything is complete
    // Promise.all() already has built-in error propagation - no tryCatch needed
    return Promise.all([a, b, c, d, e]);
  };

export default {
  makeMixedExercise: mixed,
  makeAsyncAwaitExercise: asyncAwait,
  makeThenCatchExercise: thenCatch,
};
