import * as diff from 'diff';
import chalk from 'chalk';

let routeCounts = {};
let currentRoute = '';
const loggedMessages = new Set();
const htmlLogLimit = 2000; // Limit the length of HTML logs

const colors = {
  server: chalk.green,
  client: chalk.blue,
  error: chalk.red,
  variable: chalk.cyan,
  route: chalk.hex('#FFA500'), // Orange color
  filename: chalk.hex('#FFD700'), // Light orange color
};

// Determine if the code is running on the server (Node.js) or client (browser)
const isSSR =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.SSR
    : process.env.SSR === 'true';

function safeStringify(obj, replacer = null, space = 0) {
  const seen = new WeakSet();
  return JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return '[Circular]';
        }
        seen.add(value);
      }
      return replacer ? replacer(key, value) : value;
    },
    space,
  );
}

function truncateMessage(msg, length = 200) {
  if (typeof msg === 'string' && msg.length > length) {
    return msg.slice(0, length) + '...[truncated]';
  }
  return msg;
}

function getLogCountForRoute(route) {
  if (!routeCounts[route]) {
    routeCounts[route] = 0;
  }
  return routeCounts[route]++;
}

export function log(fileName, functionName, route = '', ...messages) {
  if (typeof route !== 'string') {
    route = '';
  }

  // Skip logging for routes from /node_modules
  if (route.includes('/node_modules')) {
    return;
  }

  if (route !== currentRoute && !route.startsWith('/api')) {
    currentRoute = route;
    routeCounts[route] = 0;
  }
  const logCount = getLogCountForRoute(route);
  const funcName = functionName || 'NONE';
  const formattedMessages = messages
    .map((msg) => {
      if (typeof msg === 'object') {
        return truncateMessage(safeStringify(msg, null, 2), htmlLogLimit);
      }
      return truncateMessage(msg, htmlLogLimit);
    })
    .join(' ');
  const isError = messages.some((msg) => msg instanceof Error);
  const logType = isSSR ? 'server' : 'client';
  const color = isError ? colors.error : colors[logType];
  const routeColor = route.includes(':') ? colors.filename : colors.route;

  let logMessage = `[${logCount}] [R:${route || ''}] [${fileName}:${funcName}]`;
  if (formattedMessages) {
    logMessage += ` [${formattedMessages}]`;
  }
  logMessage = truncateMessage(logMessage, 200);

  if (loggedMessages.has(logMessage)) {
    return;
  }
  loggedMessages.add(logMessage);

  const coloredMessage = logMessage
    .replace(/(\[R:[^\]]+\])/g, routeColor('$1'))
    .replace(/(\w+::[^ ]+)/g, colors.variable('$1'))
    .replace(/^(\[\d+\])/g, color('$1'))
    .replace(/\[([^]]+)\]$/, chalk.white('[$1]'));

  logger.debug(
    color(`[${logType === 'server' ? 'S' : 'C'}] `) + coloredMessage,
  );
}

export function compareHtml(serverHtml, clientHtml) {
  const serverHtmlSnippet = truncateMessage(serverHtml, htmlLogLimit);
  const clientHtmlSnippet = truncateMessage(clientHtml, htmlLogLimit);

  const diffResult = diff.diffLines(serverHtmlSnippet, clientHtmlSnippet);
  // Uncomment and adjust the following code as needed for your application
  // diffResult.forEach((part) => {
  //   if (part.added) {
  //     logger.debug('HTML Diff', 'added', '', part.value);
  //   } else if (part.removed) {
  //     logger.debug('HTML Diff', 'removed', '', part.value);
  //   }
  // });
}

export function logDiff(oldStr, newStr) {
  const diffResult = diff.diffWordsWithSpace(oldStr, newStr);
  diffResult.forEach((part) => {
    const color = part.added
      ? colors.variable
      : part.removed
        ? colors.error
        : chalk.gray;
    process.stderr.write(color(part.value));
  });
  logger.debug();
}

export function resetLogs() {
  routeCounts = {};
  currentRoute = '';
  loggedMessages.clear();
}

export default {
  log,
  logDiff,
  resetLogs,
};
