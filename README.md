# AI Command Center Chrome Extension

## Overview

The **AI Command Center** Chrome extension provides an interface for interacting with AI models hosted on your local machine via the LM Studio API. This extension allows users to send prompts and custom instructions to AI models, view responses in real-time, and adjust generation parameters like temperature and top-k for more controlled output.

## Features

- **Customizable Inputs:**
  - Custom prompt area for specific instructions.
  - User prompt area for general queries.
- **Parameter Controls:**  
  - Temperature slider (0-2) for controlling response randomness.
  - Top-k slider (1-50) for controlling the size of the candidate pool when generating responses.
- **Real-Time Response Display:** AI responses are shown in real-time with support for Markdown formatting.
- **Integrated TTS (Text-to-Speech):** Optional speech generation from AI responses (requires a separate speech API).
- **Error Handling & Loading Indicators:** Clear feedback during API communication.

## Setup

### Prerequisites

1. **Chrome Browser:** Ensure you have the latest version of Chrome installed.
2. **LM Studio API:** Set up the LM Studio API locally. You can download and configure LM Studio from its [official site](https://lmstudio.ai).

### Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable **Developer Mode** in the top right corner.
4. Click **Load unpacked** and select the directory where the extension files are located (ensure `manifest.json` is included).
5. After loading, you should see the **AI Command Center** icon in your Chrome toolbar.

### Configuration

Before using the extension, update the API endpoint in the `sidepanel/index.js` file to match your LM Studio API setup:

```javascript
const response = await fetch('http://localhost:1234/v1/chat/completions', {
  // ... other fetch options
});
```

If you're using a different IP or port for the LM Studio API, make sure to modify the URL accordingly.

If you're using a separate API for speech generation, update the TTS endpoint as well:

```javascript
const speechResponse = await fetch('http://localhost:5000/tts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ text: data.choices[0].message.content }),
});
```

Replace `localhost:5000` with your TTS API endpoint if applicable.

## Usage

1. Click the **AI Command Center** icon in the Chrome toolbar to open the extension.
2. Fill out the following fields:
   - **Custom Prompt:** Enter specific instructions (e.g., "Summarize the following content").
   - **User Prompt:** Enter your main command (e.g., "Write a haiku about Chrome Extensions").
3. Adjust the **Temperature** and **Top-k** sliders for desired response randomness and variety:
   - **Temperature:** Higher values (closer to 2) generate more creative and random responses, while lower values (closer to 0) make them more deterministic.
   - **Top-k:** A higher top-k allows the model to consider more potential next-word candidates, resulting in more diverse responses.
4. Click **Run** to send the prompts to the AI model and see the response in the designated area below.
5. Use the **Reset** button to clear inputs and responses, and **Clipboard** to copy the output to your clipboard.
6. If the extension is connected to a TTS service, the response will be read aloud automatically.

## Development

### File Structure

- `manifest.json`: Configuration for the Chrome extension.
- `sidepanel/index.html`: The main interface of the extension.
- `sidepanel/index.css`: Custom styles for the extension's design.
- `sidepanel/index.js`: Core logic for user interactions, API communication, and response handling.

### Customization

You can adjust the extension’s visual appearance by editing the `sidepanel/index.css` file, which contains neon color schemes, flexible layout rules, and CSS animations.

To modify or add new features, update the JavaScript in `sidepanel/index.js`. For instance, you can integrate additional AI models, adjust parameter ranges, or enhance the UI's functionality.

### API Endpoints

- **LM Studio API:** Used for generating AI responses. Ensure the base URL is correctly set in `index.js` (e.g., `http://localhost:1234/v1/chat/completions`).
- **TTS API (optional):** For text-to-speech functionality, modify the TTS endpoint accordingly in the `index.js` file.

### Error Handling

If there are issues with API calls, an error message will appear in the designated error area. The extension handles API errors gracefully, displaying any relevant error messages to help troubleshoot issues.

### Contributing

Contributions are welcome! If you'd like to propose new features, submit bug reports, or improve the extension, feel free to create a Pull Request or open an issue in this repository.

## License

This project is licensed under the [MIT License](LICENSE).

## Disclaimer

This extension is intended for educational and personal use. Please ensure you comply with all applicable regulations and policies when using AI models and APIs.