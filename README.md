# AI Command Center Chrome Extension

## Overview

AI Command Center is a Chrome extension that provides a sleek, cyberpunk-themed interface for interacting with AI models through the LM Studio API. This extension allows users to send prompts to an AI model and receive responses directly within their browser.

## Features

- Cyberpunk-inspired neon design
- Interactive text area for entering prompts
- Adjustable parameters:
  - Temperature slider (0-2)
  - Top-k slider (1-50)
- Real-time response display
- Error handling and loading indicators

## Installation

1. Clone this repository or download the source code.
2. Open Chrome and navigate to `chrome://extensions`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the directory containing the extension files.

## Usage

1. Click on the AI Command Center icon in your Chrome toolbar to open the extension.
2. Enter your prompt in the text area.
3. Adjust the Temperature and Top-k parameters using the sliders if desired.
4. Click the "Run" button to send your prompt to the AI model.
5. Wait for the response to appear in the designated area below.

## Configuration

Before using the extension, make sure to update the API endpoint in the `index.js` file:

```javascript
const response = await fetch('http://192.168.0.165:1234/v1/chat/completions', {
  // ... other fetch options
});
```

Replace the URL with the appropriate endpoint for your LM Studio API.

## Development

### File Structure

- `manifest.json`: Extension configuration
- `index.html`: Main HTML structure
- `index.css`: Styling for the extension
- `index.js`: JavaScript for handling user interactions and API calls

### Customization

Feel free to modify the CSS in `index.css` to adjust the visual style of the extension. You can also update the `index.js` file to change the behavior or add new features.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)

## Disclaimer

This extension is for educational purposes only. Ensure you have the necessary rights and permissions before using any AI models or APIs.