// src/shims/rollup-shim.js

export default function rollupShim() {
  return {
    name: 'rollup-shim',
    buildStart() {
      if (!Array.isArray(this.unresolvedModules)) {
        this.unresolvedModules = [];
      }
    },
    buildEnd() {
      if (!Array.isArray(this.unresolvedModules)) {
        this.unresolvedModules = [];
      }
    },
    generateBundle() {
      if (!Array.isArray(this.unresolvedModules)) {
        this.unresolvedModules = [];
      }
    },
  };
}
