class APIClient {
  constructor() {
    this.provider = 'openrouter';
    this.apiKey = '';
    this.model = '';
  }

  setProvider(provider) {
    this.provider = provider;
  }

  setApiKey(key) {
    this.apiKey = key;
  }

  setModel(model) {
    this.model = model;
  }

  async makeRequest(messages, options = {}) {
    if (!this.apiKey) throw new Error('API key not set');
    if (!this.model) throw new Error('Model not selected');

    const config = CONFIG[this.provider];
    const headers = this.provider === 'openrouter' 
      ? {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.href,
          'X-Title': 'CYOA TSL Adventure'
        }
      : {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        };

    const body = {
      model: this.model,
      messages: messages,
      max_tokens: options.maxTokens || 300,
      temperature: options.temperature || 1,
      top_p: options.topP || 1,
      n: options.numChoices || 1,
      stop: options.stopSequences || []
    };

    console.log(`📡 Calling ${this.model} via ${this.provider}...`);
    
    const response = await fetch(config.apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('API Error:', data);
      throw new Error(data.error?.message || `${this.provider} request failed`);
    }

    return data.choices.map(choice => choice.message.content.trim());
  }
}

const apiClient = new APIClient();