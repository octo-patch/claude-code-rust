import { describe, expect, it } from 'vitest';
import { detectProvider } from '../components/ProviderSettings';

describe('MiniMax provider preset', () => {
  it('recognizes the documented regional endpoints', () => {
    const globalOpenAI = detectProvider('https://api.minimax.io/v1');
    const chinaOpenAI = detectProvider('https://api.minimaxi.com/v1');
    const globalAnthropic = detectProvider('https://api.minimax.io/anthropic');
    const chinaAnthropic = detectProvider('https://api.minimaxi.com/anthropic');

    expect(globalOpenAI?.name).toBe('MiniMax');
    expect(chinaOpenAI?.name).toBe('MiniMax');
    expect(globalOpenAI?.format).toBe('openai');
    expect(chinaOpenAI?.format).toBe('openai');
    expect(globalAnthropic?.format).toBe('anthropic');
    expect(chinaAnthropic?.format).toBe('anthropic');
    expect(globalOpenAI?.endpoints).toEqual([
      { region: 'global_en', format: 'openai', url: 'https://api.minimax.io/v1' },
      { region: 'cn_zh', format: 'openai', url: 'https://api.minimaxi.com/v1' },
      { region: 'global_en', format: 'anthropic', url: 'https://api.minimax.io/anthropic' },
      { region: 'cn_zh', format: 'anthropic', url: 'https://api.minimaxi.com/anthropic' },
    ]);
  });

  it('includes the current model parameters and input capabilities', () => {
    const preset = detectProvider('https://api.minimax.io/v1');

    expect(preset?.defaultModels).toEqual([
      {
        id: 'MiniMax-M3',
        name: 'MiniMax M3',
        contextWindow: 1_000_000,
        pricingUsdPerMillionTokens: { input: 0.6, output: 2.4, cacheRead: 0.12, cacheWrite: null },
        inputModalities: ['text', 'image', 'video'],
        thinking: ['adaptive', 'disabled'],
      },
      {
        id: 'MiniMax-M2.7',
        name: 'MiniMax M2.7',
        contextWindow: 204_800,
        pricingUsdPerMillionTokens: { input: 0.3, output: 1.2, cacheRead: 0.06, cacheWrite: 0.375 },
        inputModalities: ['text'],
        thinking: ['always_on'],
      },
    ]);
  });
});
