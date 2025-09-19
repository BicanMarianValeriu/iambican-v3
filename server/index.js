const path = require('path');

// CSS styles will be imported on load and that complicates matters... ignore those bad boys!
const ignoreStyles = require('ignore-styles');
const register = ignoreStyles.default;

// Load Vite manifest
let manifest;
try {
    manifest = require('./../build/.vite/manifest.json');
} catch (e) {
    console.warn('Vite manifest not found, falling back to asset manifest');
    try {
        manifest = require('./../build/asset-manifest.json');
    } catch (e2) {
        console.error('No manifest found');
        manifest = { files: {} };
    }
}

// We also want to ignore all image requests 
const extensions = ['.gif', '.jpeg', '.jpg', '.png', '.ico', '.svg', '.webp', '.avif'];

// Override the default style ignorer, also modifying all image requests
register(ignoreStyles.DEFAULT_EXTENSIONS, (mod, filename) => {
    if (!extensions.find(f => filename.endsWith(f))) {
        // If we find a style
        return ignoreStyles.noOp();
    } else {
        // If we find an image
        const projectRoot = path.resolve(__dirname, '..');
        const relativePath = path.relative(projectRoot, filename).replace(/\\/g, '/');
        let assetPath = '';
        
        if (manifest[relativePath]) {
            // Direct lookup in Vite manifest
            assetPath = `/${manifest[relativePath].file}`;
        } else {
            // Fallback for when direct lookup fails
            const asset = Object.values(manifest).find(
                (entry) => entry.src === relativePath
            );
            
            if(asset) {
                assetPath = `/${asset.file}`;
            } else {
                console.warn(`Asset not found in manifest: ${relativePath}. The path will be broken on the client.`);
            }
        }
        
        mod.exports = assetPath;
    }
});

// Modern module resolution for SSR
const Module = require('module');
const originalRequire = Module.prototype.require;

Module.prototype.require = function(id) {
    // Handle src/ imports with automatic extension resolution
    if (id.startsWith('src/')) {
        const fullPath = path.resolve(process.cwd(), id);
        
        // Try extensions in order of preference
        const extensions = ['.jsx', '.js', '.json'];
        
        // First try direct file with extension
        for (const ext of extensions) {
            try {
                return originalRequire.call(this, fullPath + ext);
            } catch (e) {
                // Continue to next extension
            }
        }
        
        // Then try index file in directory
        for (const ext of extensions) {
            try {
                return originalRequire.call(this, path.join(fullPath, 'index' + ext));
            } catch (e) {
                // Continue to next extension
            }
        }
    }
    
    return originalRequire.call(this, id);
};

// Modern Babel setup for SSR
require('@babel/register')({
    ignore: [/\/(build|node_modules)\//],
    presets: [
        ['@babel/preset-env', {
            targets: { node: 'current' }
        }], 
        '@babel/preset-react'
    ],
    extensions: ['.jsx', '.js']
});

// Load the server
require('./server');