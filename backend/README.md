# Orders Challenge - Backend

Backend con TypeScript y herramientas modernas (2025)

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Instalar dependencias de desarrollo
npm install --save-dev typescript tsx @types/node
```

## 📦 Scripts disponibles

```bash
# Modo desarrollo con hot reload (usa tsx)
npm run dev

# Compilar para producción
npm run build

# Ejecutar versión compilada
npm start
```

## 🛠️ Stack

- **TypeScript**: Latest (5.7.x)
- **tsx**: Ejecutor TypeScript con hot reload (reemplaza tsc-watch)
- **Node.js**: ESM modules
- **@types/node**: Tipos para Node.js

## 📝 Diferencias con el setup antiguo

### Antes (2023):
- ❌ `tsc-watch@6.0.4` - lento y obsoleto
- ❌ `typescript@5.1.3` - versión antigua

### Ahora (2025):
- ✅ `tsx` - mucho más rápido, sin compilación previa
- ✅ `typescript@latest` - últimas features
- ✅ Mejor DX (Developer Experience)

## 🔧 Configuración VS Code

En settings.json agregar:

```json
{
  "javascript.preferences.importModuleSpecifierEnding": "js",
  "typescript.preferences.importModuleSpecifierEnding": "js"
}
```
