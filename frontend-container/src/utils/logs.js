import * as diff from 'diff';

let logCount = 0;
const loggedMessages = new Set();
const htmlLogLimit = 2000; // Limit the length of HTML logs

function safeStringify(obj, replacer = null, space = 0) {
  const seen = new WeakSet();
  return JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          // Circular reference found, replace key
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

export function log(fileName, functionName, route, ...messages) {
  logCount += 1;
  const funcName = functionName || 'NONE';
  const formattedMessages = messages.map((msg) => {
    // Ensure all objects are stringified using safeStringify
    if (typeof msg === 'object') {
      return truncateMessage(safeStringify(msg, null, 2), htmlLogLimit);
    }
    return truncateMessage(msg, htmlLogLimit);
  });

  let logMessage = `[LOG] [${fileName}:${funcName}] [Route:${route}] ${formattedMessages.join(' ')} (Log Count: ${logCount})`;
  logMessage = truncateMessage(logMessage, 200);

  // Deduplication check
  if (loggedMessages.has(logMessage)) {
    return; // Do not log duplicate messages
  }

  loggedMessages.add(logMessage);

  if (typeof window === 'undefined') {
    console.log(`${logMessage} [SERVER]`);
  } else {
    fetch('/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Ensure the entire payload is safely stringified
      body: safeStringify({
        fileName,
        functionName: funcName,
        route,
        messages: formattedMessages,
        logCount,
      }),
    }).catch((error) => {
      console.error('Failed to send log to server:', error);
    });
  }
}

export function compareHtml(serverHtml, clientHtml) {
  const serverHtmlSnippet = truncateMessage(serverHtml, htmlLogLimit);
  const clientHtmlSnippet = truncateMessage(clientHtml, htmlLogLimit);

  const diffResult = diff.diffLines(serverHtmlSnippet, clientHtmlSnippet);
  // Uncomment and adjust the following code as needed for your application
  // diffResult.forEach((part) => {
  //   if (part.added) {
  //     log('HTML Diff', 'added', '', part.value); // Add an empty string for route
  //   } else if (part.removed) {
  //     log('HTML Diff', 'removed', '', part.value); // Add an empty string for route
  //   }
  // });
}
