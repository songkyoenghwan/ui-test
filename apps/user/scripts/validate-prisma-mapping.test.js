'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const { findUnmappedSnakeCaseIdentifiers } = require('./validate-prisma-mapping');

test('accepts mapped scalar fields and ignores enum values', () => {
  const schema = `
model UserProfile {
  id            Int            @id
  displayName   String         @map("display_name")
  relatedThings RelatedThing[]

  @@map("user_profiles")
}

model RelatedThing {
  id Int @id
}

enum CongestionStatus {
  VERY_CROWDED
}
`;

  assert.deepEqual(findUnmappedSnakeCaseIdentifiers(schema), []);
});

test('reports snake_case identifiers and missing scalar maps', () => {
  const schema = `
model user_profiles {
  id             Int            @id
  created_at     DateTime
  displayName    String
  related_things RelatedThing[]
}

model RelatedThing {
  id Int @id
}
`;

  assert.deepEqual(findUnmappedSnakeCaseIdentifiers(schema), [
    { line: 2, identifier: 'user_profiles', kind: 'model' },
    { line: 4, identifier: 'created_at', kind: 'scalar field' },
    { line: 5, identifier: 'displayName', kind: 'scalar field missing @map' },
    { line: 6, identifier: 'related_things', kind: 'relation field' },
  ]);
});
