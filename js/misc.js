// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Utility function to output messages
    const output = (msg, clr) => {
        const txt = document.getElementById("console-output");
        if (txt) {
            txt.style.color = clr;
            txt.innerText = msg;
        } else {
            console.error("Output element not found.");
        }
    };

    // Tab Cloaker Section: Cache DOM elements
    const tcInput = document.getElementById("userinput");

    // Ensure Tab Cloaker elements exist before using them
    if (!tcInput) {
        console.error("Tab Cloaker elements not found in the DOM.");
        return;
    }

    // Function to change the tab title
    const changeTabTitle = () => {
        if (tcInput.value.trim() === "") {
            window.localStorage.removeItem("title");
            output("No title entered. Default applied, refresh to see changes", "red");
        } else {
            window.localStorage.setItem("title", tcInput.value);
            document.title = tcInput.value;
            output("Title change successful", "green");
        }
        tcInput.value = "";
    };

    // Function to change the tab icon
    const changeTabIcon = () => {
        if (tcInput.value.trim() === "") {
            document.querySelector("link[rel*='icon']").href = "";
            window.localStorage.removeItem("icon");
            output("No image entered. Default applied, refresh to see changes", "red");
        } else if (validURL(tcInput.value)) {
            document.querySelector("link[rel*='icon']").href = tcInput.value;
            window.localStorage.setItem("icon", tcInput.value);
            output("Icon change successful", "green");
        } else {
            output("Icon change failed. Make sure you are using a valid URL", "red");
        }
        tcInput.value = "";
    };

    // Function to validate URL
    const validURL = (str) => {
        const exp = /^(https?:\/\/)?([\w\d-]+\.)+[\w]{2,}(\/[\w\d-]*)*\/?$/i;
        return exp.test(str);
    };

    // Function to reset tab settings
    const resetTabSettings = () => {
        ["icon", "title"].forEach(item => window.localStorage.removeItem(item));
        window.location.reload();
    };

    // Event listeners for Tab Cloaker buttons
    document.getElementById('set-title-btn').addEventListener('click', changeTabTitle);
    document.getElementById('set-icon-btn').addEventListener('click', changeTabIcon);
    document.getElementById('reset-btn').addEventListener('click', resetTabSettings);
    document.getElementById('imitate-canvas-btn').addEventListener('click', () => {
        tcInput.value = 'Canvas'; // Set to "Canvas"
        changeTabTitle();
        tcInput.value = 'https://wascouhsd.instructure.com/favicon.ico'; // Set Canvas icon URL
        changeTabIcon();
    });

    // About:blank Section: Event handler for the 'Create page' button
    document.getElementById('create').addEventListener('click', function() {
        const urlInput = document.getElementById("link-input");
        const presetSelect = document.getElementById("page-select");
        let url = urlInput.value.trim();
        const selection = presetSelect.value;
        let title, icon;

        switch (selection) {
            case 'canvas':
                title = 'Canvas';
                icon = 'https://wascouhsd.instructure.com/favicon.ico'; // Canvas favicon URL
                break;
            case 'aeries':
                title = 'Aeries Dashboard';
                icon = 'https://wascouhsd.aeries.net/student/favicon.ico'; // Aeries favicon URL
                break;
            case 'gmail':
                title = 'Gmail';
                icon = 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico'; // Gmail favicon URL
                break;
            default:
                title = 'About Blank';
                icon = '/favicon.ico'; // Default favicon URL
        }

        if (!url.startsWith("https://") && !url.startsWith("http://")) {
            url = `https://${url}`;
        } else if (url.startsWith("http://")) {
            url = `https://${url.substring(7)}`;
        }

        const newWindow = window.open('about:blank', '_blank');

        if (newWindow) {
            newWindow.document.write(`
                <!DOCTYPE html>
                <html lang="en-US">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${title}</title>
                    <link rel="icon" href="${icon}" type="image/x-icon">
                    <style>
                        html, body {
                            margin: 0;
                            padding: 0;
                            overflow: hidden;
                            width: 100%;
                            height: 100%;
                        }
                        iframe {
                            border: none;
                            width: 100vw;
                            height: 100vh;
                            display: block;
                        }
                    </style>
                </head>
                <body>
                    <iframe src="${url}" frameborder="0"></iframe>
                </body>
                </html>
            `);
            newWindow.document.close();
        } else {
            alert('Pop-up blocked! Please allow pop-ups for this site.');
        }
    });
});
