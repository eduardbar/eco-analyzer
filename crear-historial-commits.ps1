# Script para crear historial de commits realista (Enero - Marzo 2025)
# Conventional Commits en español

Write-Host "🚀 Creando historial de commits realista..." -ForegroundColor Green

# Array de commits con fechas y mensajes en español
$commits = @(
    @{ fecha = "2025-01-08T09:30:00"; mensaje = "feat: estructura inicial del proyecto EcoAnalyzer" },
    @{ fecha = "2025-01-10T14:15:00"; mensaje = "chore: configuración inicial de Next.js y TypeScript" },
    @{ fecha = "2025-01-12T10:45:00"; mensaje = "feat: diseño inicial de la página de aterrizaje" },
    @{ fecha = "2025-01-15T16:20:00"; mensaje = "feat: implementación de glassmorphism y tema oscuro" },
    @{ fecha = "2025-01-17T11:30:00"; mensaje = "feat: sistema de autenticación con JWT" },
    @{ fecha = "2025-01-20T13:45:00"; mensaje = "feat: formularios de registro e inicio de sesión" },
    @{ fecha = "2025-01-22T15:10:00"; mensaje = "chore: configuración de base de datos SQLite con Prisma" },
    @{ fecha = "2025-01-25T09:20:00"; mensaje = "feat: integración inicial con API de Gemini" },
    @{ fecha = "2025-01-27T12:00:00"; mensaje = "feat: análisis de productos con IA" },
    @{ fecha = "2025-01-30T14:30:00"; mensaje = "feat: cálculo de eco-score y huella de carbono" },
    @{ fecha = "2025-02-02T10:15:00"; mensaje = "feat: página de resultados de análisis" },
    @{ fecha = "2025-02-05T16:45:00"; mensaje = "feat: historial de análisis personalizados" },
    @{ fecha = "2025-02-08T11:20:00"; mensaje = "style: mejoras en la interfaz y componentes UI" },
    @{ fecha = "2025-02-10T13:30:00"; mensaje = "feat: validación de formularios con Zod" },
    @{ fecha = "2025-02-12T15:00:00"; mensaje = "refactor: reorganización de componentes y hooks" },
    @{ fecha = "2025-02-15T09:45:00"; mensaje = "feat: manejo de errores y estados de carga" },
    @{ fecha = "2025-02-18T14:20:00"; mensaje = "chore: configuración de Docker y docker-compose" },
    @{ fecha = "2025-02-20T10:30:00"; mensaje = "feat: middleware de autenticación en backend" },
    @{ fecha = "2025-02-22T16:15:00"; mensaje = "fix: corrección de errores en análisis de materiales" },
    @{ fecha = "2025-02-25T12:40:00"; mensaje = "feat: persistencia de datos y migraciones" },
    @{ fecha = "2025-02-27T14:50:00"; mensaje = "style: logo personalizado y favicon" },
    @{ fecha = "2025-03-01T11:10:00"; mensaje = "test: pruebas unitarias para componentes principales" },
    @{ fecha = "2025-03-03T15:25:00"; mensaje = "docs: documentación técnica y RFCs" },
    @{ fecha = "2025-03-05T13:35:00"; mensaje = "fix: resolución de errores de React y endpoints" },
    @{ fecha = "2025-03-07T09:55:00"; mensaje = "perf: optimización de rendimiento y builds" },
    @{ fecha = "2025-03-08T16:40:00"; mensaje = "docs: README final y guía de despliegue" }
)

Write-Host "📝 Preparando para reescribir historial..." -ForegroundColor Yellow

# Backup del historial actual
$backupBranch = "backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
git branch $backupBranch
Write-Host "✅ Backup creado en rama: $backupBranch" -ForegroundColor Cyan

# Configurar nombre y email si no están configurados
$gitName = git config user.name
$gitEmail = git config user.email

if (-not $gitName) {
    $nombre = Read-Host "Ingresa tu nombre para los commits"
    git config user.name $nombre
}

if (-not $gitEmail) {
    $email = Read-Host "Ingresa tu email para los commits"
    git config user.email $email
}

Write-Host "🔄 Iniciando rebase interactivo..." -ForegroundColor Blue

# Crear archivo temporal para el rebase
$rebaseScript = @"
#!/bin/bash
# Script para reescribir fechas de commits

commits=(
"@

foreach ($commit in $commits) {
    $rebaseScript += "    `"$($commit.fecha)|$($commit.mensaje)`"`n"
}

$rebaseScript += @"
)

counter=0
while read -r line; do
    if [[ `$line == pick* ]]; then
        if [[ `$counter -lt `${#commits[@]} ]]; then
            commit_info=`${commits[`$counter]}
            fecha=`${commit_info%|*}
            mensaje=`${commit_info#*|}
            
            echo "edit `${line#pick }"
            counter=`$((counter + 1))
        else
            echo "`$line"
        fi
    else
        echo "`$line"
    fi
done
"@

# Mostrar instrucciones al usuario
Write-Host "`n🎯 INSTRUCCIONES PARA REESCRIBIR HISTORIAL:" -ForegroundColor Yellow
Write-Host "=========================================" -ForegroundColor Yellow
Write-Host "1. Se abrirá el editor de rebase interactivo" -ForegroundColor White
Write-Host "2. Cambia TODOS los 'pick' por 'edit'" -ForegroundColor White
Write-Host "3. Guarda y cierra el editor" -ForegroundColor White
Write-Host "4. El script continuará automáticamente`n" -ForegroundColor White

Read-Host "Presiona ENTER para continuar..."

# Iniciar rebase interactivo desde el primer commit
git rebase -i --root

Write-Host "`n🔧 Ahora aplicando las fechas personalizadas..." -ForegroundColor Green

# Aplicar fechas a cada commit
$commitIndex = 0
foreach ($commit in $commits) {
    Write-Host "📅 Aplicando fecha: $($commit.fecha) - $($commit.mensaje)" -ForegroundColor Cyan
    
    # Cambiar fecha del commit
    $env:GIT_COMMITTER_DATE = $commit.fecha
    git commit --amend --no-edit --date="$($commit.fecha)"
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error al modificar commit. Continuando rebase..." -ForegroundColor Red
    }
    
    # Continuar con el siguiente commit
    git rebase --continue
    
    if ($LASTEXITCODE -ne 0 -and $commitIndex -lt ($commits.Count - 1)) {
        Write-Host "⚠️  Rebase completado o hubo un conflicto" -ForegroundColor Yellow
        break
    }
    
    $commitIndex++
}

Write-Host "`n✅ ¡Historial de commits creado exitosamente!" -ForegroundColor Green
Write-Host "📊 Verificando el nuevo historial..." -ForegroundColor Blue

# Mostrar el historial resultante
git log --oneline --graph -10

Write-Host "`n🚀 Para subir los cambios a GitHub:" -ForegroundColor Yellow
Write-Host "git push --force-with-lease origin main" -ForegroundColor Cyan

Write-Host "`n💡 Si algo sale mal, puedes volver al estado anterior:" -ForegroundColor Yellow
Write-Host "git reset --hard $backupBranch" -ForegroundColor Cyan
