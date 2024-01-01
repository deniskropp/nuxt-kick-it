    const publishURL = `https://ntfy.sh/example`;
    const subscribeURL = `https://ntfy.sh/example/sse`;
    const events = document.getElementById('events');
    const eventSource = new EventSource(subscribeURL);

    // Publish button
    document.getElementById("publishButton").onclick = () => {
        fetch(publishURL, {
            method: 'POST', // works with PUT as well, though that sends an OPTIONS request too!
            body: `It is ${new Date().toString()}. This is a test.`
        })
    };

    // Incoming events
    eventSource.onopen = () => {
        let event = document.createElement('div');
        event.innerHTML = `EventSource connected to ${subscribeURL}`;
        events.appendChild(event);
    };
    eventSource.onerror = (e) => {
        let event = document.createElement('div');
        event.innerHTML = `EventSource error: Failed to connect to ${subscribeURL}`;
        events.appendChild(event);
    };
    eventSource.onmessage = (e) => {
        let event = document.createElement('div');
        event.innerHTML = e.data;
        events.appendChild(event);
    };
