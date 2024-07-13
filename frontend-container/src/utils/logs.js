import * as diff from 'diff';

let logCount = 0;
const loggedMessages = new Set();
const htmlLogLimit = 2000; // Limit the length of HTML logs

function safeStringify(obj) {
  try {
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (loggedMessages.has(value)) {
          return '[Circular]';
        }
        loggedMessages.add(value);
      }
      return value;
    });
  } catch (e) {
    return String(obj);
  }
}

function truncateMessage(msg, length = 200) {
  if (typeof msg === 'string' && msg.length > length) {
    return msg.slice(0, length) + '...[truncated]';
  }
  return msg;
}

export function log(fileName, functionName, ...messages) {
  logCount += 1;
  const funcName = functionName || 'NONE';
  const formattedMessages = messages.map((msg) =>
    truncateMessage(safeStringify(msg), htmlLogLimit),
  );

  let logMessage = `[LOG] [${fileName}:${funcName}] ${formattedMessages.join(' ')} (Log Count: ${logCount})`;

  // Truncate the entire log message if it exceeds 200 characters
  logMessage = truncateMessage(logMessage, 200);

  // Deduplication check
  if (loggedMessages.has(logMessage)) {
    return; // Do not log duplicate messages
  }

  loggedMessages.add(logMessage);

  if (typeof window === 'undefined') {
    // Node.js environment
    console.log(`${logMessage} [SERVER]`);
  } else {
    // Browser environment
    fetch('/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName,
        functionName: funcName,
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
  diffResult.forEach((part) => {
    if (part.added) {
      log('HTML Diff', 'added', part.value);
    } else if (part.removed) {
      log('HTML Diff', 'removed', part.value);
    }
  });
}
