## Yield-Up monorepo

This Turborepo includes the following packages/apps:

### Apps and Packages

This Turborepo includes the following packages/apps:

- `tracker`: a React app with yield tracker table, filters and calculator
- `@yup/ui`: a ui package with main theme and base components

### Build

To build all apps and packages, run the following command:

```
cd yup-mono
npx turbo build
```

### Linter

To lint all apps and packages, run the following command:

```
cd yup-mono
npx turbo lint
```

### Development run

Don't forget to set `.env` file in each app with the required variables.

```
cd yup-mono
npx turbo start:debug
```

### Running particular app

To run a particular app, you can use the following command:

```
cd yup-mono
npx turbo start:debug --filter=<app-name>
```
