
export function middleware (...list) {
  return async function (...args) {
    var i = list.length;
    var next = args[args.length-1] = noop;
    var current;

    while (i--) {
      current = wrap(list[i], ...args);
      next = args[args.length-1] = current;
    }

    await next();
  };
}

async function noop () {}

function wrap (fn, ...args) {
  return async function () {
    await fn(...args);
  };
}
