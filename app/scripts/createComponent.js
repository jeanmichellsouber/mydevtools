import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentName = process.argv[2];

if (!componentName) {
  console.log('❌ Inform the component name.');
  console.log('Example: npm run create:component Button');
  process.exit(1);
}

const basePath = path.join(__dirname, '../src/components', componentName);

if (fs.existsSync(basePath)) {
  console.log('❌ This component already exists.');
  process.exit(1);
}

fs.mkdirSync(basePath, { recursive: true });

/* ============================= */
/* ComponentName.types.ts */
/* ============================= */
fs.writeFileSync(
  path.join(basePath, `${componentName}.types.ts`),
  `export interface ${componentName}Props {

}
`,
);

/* ============================= */
/* ComponentName.styles.ts */
/* ============================= */
fs.writeFileSync(
  path.join(basePath, `${componentName}.styles.ts`),
  `import styled from 'styled-components';

export const Styled${componentName} = styled.div\`

\`;
`,
);

/* ============================= */
/* ComponentName.tsx */
/* ============================= */
fs.writeFileSync(
  path.join(basePath, `${componentName}.tsx`),
  `import type { ${componentName}Props } from './${componentName}.types';
import { Styled${componentName} } from './${componentName}.styles';

export const ${componentName} = ({}: ${componentName}Props) => {
  return (
    <Styled${componentName}>
      ${componentName}
    </Styled${componentName}>
  );
};
`,
);

/* ============================= */
/* index.ts */
/* ============================= */
fs.writeFileSync(
  path.join(basePath, `index.ts`),
  `export * from './${componentName}';
`,
);

console.log(`✅ Component ${componentName} created successfully!`);
