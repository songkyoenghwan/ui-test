import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define aliases for module paths
export const aliases = {
	'$': path.resolve(__dirname, './src'),
	'$src': path.resolve(__dirname, './src'),
	'$lib': path.resolve(__dirname, './src/lib'),
	'$layouts': path.resolve(__dirname, './src/layouts'),
	'$pages': path.resolve(__dirname, './src/pages'),
	'$assets': path.resolve(__dirname, './src/assets'),
	'$styles': path.resolve(__dirname, './src/styles'),
	'$components': path.resolve(__dirname, './src/components'),
	'$solid': path.resolve(__dirname, './src/components/solid'),
	'$react': path.resolve(__dirname, './src/components/react'),
	'$vue': path.resolve(__dirname, './src/components/vue'),
	'$stores': path.resolve(__dirname, './src/stores'),
	'$contexts': path.resolve(__dirname, './src/contexts'),
	'$utils': path.resolve(__dirname, './src/utils'),
	'$i18n': path.resolve(__dirname, './src/i18n'),
	'$html': path.resolve(__dirname, './src/html'),
	'$static': path.resolve(__dirname, './static'),
	'$images': path.resolve(__dirname, './public/images'),
	'$events': path.resolve(__dirname, './events'),
	'@/src': path.resolve(__dirname, './src'),
	'@/lib': path.resolve(__dirname, './src/lib'),
	'@/layouts': path.resolve(__dirname, './src/layouts'),
	'@/pages': path.resolve(__dirname, './src/pages'),
	'@/data': path.resolve(__dirname, './src/data'),
	'@/styles': path.resolve(__dirname, './src/styles'),
	'@/components': path.resolve(__dirname, './src/components'),
	'@/components/solid': path.resolve(__dirname, './src/components/solid'),
	'@/components/react': path.resolve(__dirname, './src/components/react'),
	'@/components/vue': path.resolve(__dirname, './src/components/vue'),
	'@/stores': path.resolve(__dirname, './src/stores'),
	'@/contexts': path.resolve(__dirname, './src/contexts'),
	'@/utils': path.resolve(__dirname, './src/utils'),
	'@/i18n': path.resolve(__dirname, './src/i18n'),
	'@/html': path.resolve(__dirname, './src/html'),
	'@/static': path.resolve(__dirname, './static'),
	'@/images': path.resolve(__dirname, './public/images'),
	'@/events': path.resolve(__dirname, './events'),
	'@/mocks': path.resolve(__dirname, './src/mocks'),
	'@/types': path.resolve(__dirname, './src/types'),
};
