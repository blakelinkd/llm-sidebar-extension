// Filename: sidepanel/index.js

// Elements
const inputCustomPrompt = document.getElementById('input-custom-prompt'); // New custom prompt element
const inputPrompt = document.getElementById('input-prompt');
const buttonPrompt = document.getElementById('button-prompt');
const buttonReset = document.getElementById('button-reset');
const responseDiv = document.getElementById('response');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const temperatureSlider = document.getElementById('temperature');
const topKSlider = document.getElementById('top-k');
const labelTemperature = document.getElementById('label-temperature');
const labelTopK = document.getElementById('label-top-k');

// Set initial values for sliders
temperatureSlider.value = 0.7; // Default temperature
topKSlider.value = 40; // Default top-k

// Update label values for sliders
function updateSliderLabels() {
  labelTemperature.textContent = temperatureSlider.value;
  labelTopK.textContent = topKSlider.value;
}

// Call this function on page load
updateSliderLabels();

temperatureSlider.addEventListener('input', updateSliderLabels);
topKSlider.addEventListener('input', updateSliderLabels);

// Enable Run button when prompt is entered
inputPrompt.addEventListener('input', () => {
  buttonPrompt.disabled = !inputPrompt.value.trim() || !inputCustomPrompt.value.trim(); // Disable if either prompt is empty
  buttonReset.disabled = !inputPrompt.value.trim() || !inputCustomPrompt.value.trim(); // Disable if either prompt is empty
});

// Reset button functionality
buttonReset.addEventListener('click', () => {
  inputPrompt.value = '';
  inputCustomPrompt.value = ''; // Reset the custom prompt
  responseDiv.textContent = '';
  responseDiv.hidden = true;
  errorDiv.textContent = '';
  errorDiv.hidden = true;
  buttonPrompt.disabled = true;
  buttonReset.disabled = true;
});

// Function to send prompt to LM Studio API
async function sendPromptToAPI(customPrompt, userPrompt, temperature, topK) {
  try {
    // Show loading spinner
    loadingDiv.hidden = false;
    responseDiv.hidden = true;
    errorDiv.hidden = true;

    // The model identifier and message structure based on your Python example
    const requestBody = {
      model: "model-identifier", // Replace with the correct model identifier
      messages: [
        { "role": "system", "content": customPrompt }, // Use custom prompt
        { "role": "user", "content": userPrompt } // Use user prompt
      ],
      temperature: parseFloat(temperature),
      top_k: parseInt(topK),
    };

    // Send request to the LM Studio API
    const response = await fetch('http://localhost:1234/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer lm-studio', // Assuming this is the required auth for LM Studio
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Assuming the response from LM Studio contains 'choices' with 'message' in 'choices[0]'
    if (data.choices && data.choices.length > 0) {
      // Use showdown to convert Markdown to HTML
      const converter = new showdown.Converter();
      responseDiv.innerHTML = converter.makeHtml(data.choices[0].message.content); // Convert Markdown to HTML
      responseDiv.hidden = false;

      // Call the speech API with the response text
      const speechResponse = await fetch('http://localhost:5000/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: data.choices[0].message.content }),
      });

      if (!speechResponse.ok) {
        throw new Error(`Speech API error: ${speechResponse.statusText}`);
      }

      const speechData = await speechResponse.json();
      console.log('Speech API response:', speechData);
    } else {
      responseDiv.textContent = 'No response from AI.';
      responseDiv.hidden = false;
    }
  } catch (error) {
    errorDiv.textContent = 'Error: ' + error.message;
    errorDiv.hidden = false;
  } finally {
    // Hide loading spinner
    loadingDiv.hidden = true;
  }
}

// Run button functionality
buttonPrompt.addEventListener('click', () => {
  const customPrompt = inputCustomPrompt.value.trim();
  const userPrompt = inputPrompt.value.trim();
  const temperature = temperatureSlider.value;
  const topK = topKSlider.value;

  // Call the function to send prompt to the API
  sendPromptToAPI(customPrompt, userPrompt, temperature, topK);
});
