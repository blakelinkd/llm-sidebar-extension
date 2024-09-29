// Elements
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
temperatureSlider.value = 0.7; // You can adjust this default value
topKSlider.value = 40; // You can adjust this default value

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
  if (inputPrompt.value.trim()) {
    buttonPrompt.disabled = false;
    buttonReset.disabled = false;
  } else {
    buttonPrompt.disabled = true;
    buttonReset.disabled = true;
  }
});

// Reset button functionality
buttonReset.addEventListener('click', () => {
  inputPrompt.value = '';
  responseDiv.textContent = '';
  responseDiv.hidden = true;
  errorDiv.textContent = '';
  errorDiv.hidden = true;
  buttonPrompt.disabled = true;
  buttonReset.disabled = true;
});

// Function to send prompt to LM Studio API
async function sendPromptToAPI(prompt, temperature, topK) {
  try {
    // Show loading spinner
    loadingDiv.hidden = false;
    responseDiv.hidden = true;
    errorDiv.hidden = true;

    // The model identifier and message structure based on your Python example
    const requestBody = {
      model: "model-identifier", // Replace with the correct model identifier
      messages: [
        { "role": "system", "content": "Always answer in rhymes." }, // System instruction
        { "role": "user", "content": prompt } // User's input prompt
      ],
      temperature: parseFloat(temperature),
      top_k: parseInt(topK), // Ensure top_k is correctly passed
    };

    // Send request to the LM Studio API
    const response = await fetch('http://localhost:1234/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer lm-studio', // Assuming this is the required auth for LM Studio
      },
      body: JSON.stringify(requestBody), // Pass the structured request
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Assuming the response from LM Studio contains 'choices' with 'message' in 'choices[0]'
    if (data.choices && data.choices.length > 0) {
      responseDiv.textContent = data.choices[0].message.content;
      responseDiv.hidden = false;
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
  const prompt = inputPrompt.value.trim();
  const temperature = temperatureSlider.value;
  const topK = topKSlider.value;

  // Call the function to send prompt to the API
  sendPromptToAPI(prompt, temperature, topK);
});