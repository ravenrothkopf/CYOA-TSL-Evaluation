# Choose Your Own TSL Adventure 🗺️

An interactive choose-your-own-adventure story powered by TSL state machines and AI language models. Now supports both OpenRouter and OpenAI APIs!

## Features

- 🎭 Dynamic story generation using AI
- 🔀 TSL state machine for narrative control
- 🎨 Beautiful, responsive UI with animated transitions
- 🤖 Support for multiple AI providers and models
- 📜 Story chronicle to track your journey
- 🗺️ Location tracking (Town, Market, Cave)

## Setup

1. Open `index.html` in a modern web browser
2. Choose your API provider:
   - **OpenRouter**: Access to multiple models (GPT-4, Claude, Gemini, etc.)
   - **OpenAI Direct**: Direct access to OpenAI models

3. Enter your API key:
   - For OpenRouter: Get your key at [openrouter.ai](https://openrouter.ai)
   - For OpenAI: Get your key at [platform.openai.com](https://platform.openai.com)

4. Select your preferred model from the dropdown
5. Click "Start Adventure" to begin!

## Supported Models

### OpenRouter
- GPT-4o (Latest)
- Claude 3.5 Sonnet
- Gemini Pro 1.5
- Llama 3.1 70B
- Mistral Large
- And more!

### OpenAI Direct
- GPT-4o
- GPT-4o Mini
- GPT-4 Turbo

## How It Works

The application uses TSL (Temporal Stream Logic) state machines to control the narrative flow, ensuring that your adventure follows a coherent path through different locations. The AI generates dynamic story content while the TSL automaton manages state transitions between the town, market, and cave locations.

## Files

- `index.html` - Main UI
- `main.js` - Core game logic
- `api.js` - API client for OpenRouter/OpenAI
- `config.js` - Model configurations
- `TSLfunctions.js` - TSL predicate functions
- `automata.js` - State machine logic
- `style.css` - Enhanced styling

## Tips

- Your choices matter! Each decision leads to different story paths
- The checkboxes show which locations you've visited
- The story chronicle on the right keeps track of your journey
- Try different models for varied storytelling styles

Enjoy your adventure! 🚀