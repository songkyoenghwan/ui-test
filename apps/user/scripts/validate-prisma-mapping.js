const fs = require('node:fs');
const path = require('node:path');

function findUnmappedSnakeCaseIdentifiers(schema) {
  const issues = [];
  const lines = schema.split(/\r?\n/);
  const modelNames = new Set(
    lines
      .map((line) => line.match(/^\s*model\s+([A-Za-z][A-Za-z0-9_]*)\s*\{/)?.[1])
      .filter(Boolean),
  );
  let blockKind = null;

  lines.forEach((line, index) => {
    const blockMatch = line.match(/^\s*(model|enum)\s+([A-Za-z][A-Za-z0-9_]*)\s*\{/);
    if (blockMatch) {
      blockKind = blockMatch[1];
      if (blockMatch[2].includes('_')) {
        issues.push({ line: index + 1, identifier: blockMatch[2], kind: blockKind });
      }
      return;
    }

    if (/^\s*}/.test(line)) {
      blockKind = null;
      return;
    }

    if (blockKind !== 'model') {
      return;
    }

    const fieldMatch = line.match(
      /^\s+([A-Za-z][A-Za-z0-9_]*)\s+([A-Za-z][A-Za-z0-9_]*)(?:\[\])?\??(?:\s|$)/,
    );
    if (!fieldMatch) {
      return;
    }

    const [, identifier, fieldType] = fieldMatch;
    const isRelation = modelNames.has(fieldType);

    if (identifier.includes('_')) {
      issues.push({
        line: index + 1,
        identifier,
        kind: isRelation ? 'relation field' : 'scalar field',
      });
      return;
    }

    if (!isRelation && /[A-Z]/.test(identifier) && !line.includes('@map(')) {
      issues.push({ line: index + 1, identifier, kind: 'scalar field missing @map' });
    }
  });

  return issues;
}

function validatePrismaMapping(schemaPath = path.resolve(process.cwd(), 'prisma/schema.prisma')) {
  const schema = fs.readFileSync(schemaPath, 'utf8');
  const issues = findUnmappedSnakeCaseIdentifiers(schema);

  if (issues.length > 0) {
    const details = issues
      .map(({ line, identifier, kind }) => `  - line ${line}: ${kind} ${identifier}`)
      .join('\n');
    throw new Error(
      [
        'Invalid Prisma database mappings found after db:pull:',
        details,
        '',
        'Rename models to PascalCase and scalar fields to camelCase with @map/@@map.',
        'Rename relation fields to camelCase without @map.',
      ].join('\n'),
    );
  }
}

if (require.main === module) {
  try {
    const schemaPath = process.argv[2]
      ? path.resolve(process.argv[2])
      : path.resolve(process.cwd(), 'prisma/schema.prisma');
    validatePrismaMapping(schemaPath);
    console.log('Prisma mapping validation passed.');
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}

module.exports = { findUnmappedSnakeCaseIdentifiers, validatePrismaMapping };
