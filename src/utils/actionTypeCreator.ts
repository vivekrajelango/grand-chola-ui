export function addAsyncActionPostfixes(obj: any) {
  const postfixes: any = {
    pending: '_PENDING',
    fulfilled: '_FULFILLED',
    rejected: '_REJECTED'
  };

  const modifiedObj: any = {};
  Object.keys(obj).forEach((key: any) => {
    Object.keys(postfixes).forEach((it: any) => {
      modifiedObj[key + postfixes[it]] = obj[key] + postfixes[it];
    });
  });

  return { ...obj, ...modifiedObj };
}
