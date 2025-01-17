import { describe, expect, it } from 'vitest';

import { getUrls, wrapUrls } from '../urls';

describe('URL utilities', () => {
  describe('wrapUrls', () => {
    it('should wrap URLs in anchor tags', () => {
      const input = 'Check out https://example.com';
      const expected =
        'Check out <a href="https://example.com" target="_blank" rel="noreferrer">https://example.com</a>';
      expect(wrapUrls(input)).toBe(expected);
    });

    it('should handle multiple URLs', () => {
      const input = 'Visit https://example.com and http://test.com';
      const result = wrapUrls(input);
      expect(result).toContain('href="https://example.com"');
      expect(result).toContain('href="http://test.com"');
    });

    it('should handle URLs with complex paths and query parameters', () => {
      const input = 'https://example.com/path?param=value#hash';
      const result = wrapUrls(input);
      expect(result).toContain(`href="${input}"`);
    });

    it('should return original string if no URLs present', () => {
      const input = 'Just a regular text';
      expect(wrapUrls(input)).toBe(input);
    });
  });

  describe('getUrls', () => {
    it('should extract URLs from content', () => {
      const input = 'Check out https://example.com';
      const result = getUrls(input);
      expect(result).toEqual(['https://example.com']);
    });

    it('should return multiple URLs', () => {
      const input = 'Visit https://example.com and http://test.com';
      const result = getUrls(input);
      expect(result).toEqual(['https://example.com', 'http://test.com']);
    });

    it('should return null if no URLs present', () => {
      const input = 'Just a regular text';
      const result = getUrls(input);
      expect(result).toBeNull();
    });

    it('should handle URLs with various protocols', () => {
      const input = 'http://example.com https://secure.com';
      const result = getUrls(input);
      expect(result).toHaveLength(2);
      expect(result?.[0]).toMatch(/^http:/);
      expect(result?.[1]).toMatch(/^https:/);
    });

    it('should match urls with dashes', () => {
      const input =
        'this is my url: https://i-have-a-dash.dash-url.com pretty neat';
      const result = getUrls(input);
      expect(result).toEqual(['https://i-have-a-dash.dash-url.com']);
    });
  });
});
