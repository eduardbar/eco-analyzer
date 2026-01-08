import { test, expect } from '@playwright/test';

test.describe('Análisis de Producto', () => {
  const email = 'testuser' + Date.now() + '@example.com';
  const password = 'TestPassword123!';
  const name = 'Test User';

  test.beforeEach(async ({ page }) => {
    // 1. Ir a la página principal
    await page.goto('http://localhost:3000');

    // 2. Registrarse
    await page.click('button:has-text("Registrarse")');
    await page.fill('input[placeholder="Ej: Ana García"]', name);
    await page.fill('input[placeholder="nombre@empresa.com"]', email);
    await page.fill('input[placeholder="••••••••"]', password);
    // Hay dos campos de password (password y confirmar)
    const passwordInputs = await page.$$('input[placeholder="••••••••"]');
    if (passwordInputs.length > 1) {
      await passwordInputs[1].fill(password);
    }
    await page.click('button:has-text("Comenzar Ahora")');

    // Esperar a que se complete el registro y aparezca el formulario de login o cambie el estado
    // En el flujo actual, al registrarse cambia a "Iniciar Sesión" (setShowLogin(true))
    await expect(page.locator('button:has-text("Acceder al Dashboard")')).toBeVisible();

    // 3. Iniciar sesión
    await page.fill('input[placeholder="nombre@empresa.com"]', email);
    await page.fill('input[placeholder="••••••••••••"]', password);
    await page.click('button:has-text("Acceder al Dashboard")');

    // Esperar a que aparezca el dashboard (o el botón de salir)
    await expect(page.locator('button:has-text("Salir")')).toBeVisible();
  });

  test('Debe analizar un producto correctamente', async ({ page }) => {
    // 4. Llenar el formulario de análisis
    const productDescription = 'Una botella de agua de plástico PET de 500ml';
    await page.fill('textarea', productDescription);
    
    // 5. Enviar el formulario
    await page.click('button:has-text("Generar Análisis Completo")');

    // 6. Esperar a que se muestren los resultados
    // Buscamos elementos que aparecen en ResultDisplay
    await expect(page.locator('text=Huella de Carbono')).toBeVisible({ timeout: 60000 });
    await expect(page.locator('text=Eco Score')).toBeVisible();
    
    // Verificar que no hay errores mostrados en la UI
    const errorAlert = page.locator('.bg-red-500');
    await expect(errorAlert).not.toBeVisible();
  });
});
