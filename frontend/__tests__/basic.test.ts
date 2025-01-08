// Test básico para verificar que el entorno de testing funciona
describe('Basic Test Suite', () => {
  it('should run basic math operations', () => {
    expect(2 + 2).toBe(4);
    expect(5 * 3).toBe(15);
    expect(10 - 4).toBe(6);
  });

  it('should handle string operations', () => {
    expect('Hello' + ' World').toBe('Hello World');
    expect('test'.toUpperCase()).toBe('TEST');
    expect('javascript'.includes('script')).toBe(true);
  });

  it('should work with arrays', () => {
    const fruits = ['apple', 'banana', 'orange'];
    expect(fruits.length).toBe(3);
    expect(fruits[0]).toBe('apple');
    expect(fruits.includes('banana')).toBe(true);
  });

  it('should handle async operations', async () => {
    const promise = Promise.resolve('success');
    const result = await promise;
    expect(result).toBe('success');
  });
});

// Test para funciones utilitarias
describe('Utility Functions', () => {
  const calculateEcoScore = (carbonFootprint: number, waterUsage: number, materialsScore: number): number => {
    const maxCarbon = 100;
    const maxWater = 5000;
    const maxMaterials = 10;
    
    const normalizedCarbon = (maxCarbon - carbonFootprint) / maxCarbon;
    const normalizedWater = (maxWater - waterUsage) / maxWater;
    const normalizedMaterials = materialsScore / maxMaterials;
    
    const score = (normalizedCarbon * 0.4 + normalizedWater * 0.3 + normalizedMaterials * 0.3) * 10;
    return Math.max(0, Math.min(10, score));
  };

  it('should calculate eco-score correctly', () => {
    const score = calculateEcoScore(50, 2000, 7);
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(10);
  });

  it('should handle edge cases', () => {
    const minScore = calculateEcoScore(100, 5000, 0);
    expect(minScore).toBe(0);
    
    const maxScore = calculateEcoScore(0, 0, 10);
    expect(maxScore).toBe(10);
  });
});

// Test para validaciones básicas
describe('Validation Tests', () => {
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password);
  };

  it('should validate email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user@domain.org')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('test@')).toBe(false);
  });

  it('should validate passwords', () => {
    expect(validatePassword('password123')).toBe(true);
    expect(validatePassword('strong1pass')).toBe(true);
    expect(validatePassword('weak')).toBe(false);
    expect(validatePassword('12345678')).toBe(false);
    expect(validatePassword('onlyletters')).toBe(false);
  });
});
