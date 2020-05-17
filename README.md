# base-node

This is a template for a node app. This template has support for:

1. typescript
2. linting
3. prettier
4. express

# Project Setup

1. Install dependencies

    ```
    $ npm i @types/express express @types/cookie-session cookie-session typescript body-parser helmet @types/compression compression

    $ npm i -D eslint prettier eslint-config-prettier eslint-plugin-prettier mrm lint-staged pretty-quick @types/jest @types/supertest ts-node-dev jest supertest ts-jest rimraf

    ```

2. Initialize typescript config

    ```
    $ npx typescript --init
    ```

3. Configure esLint

    ```
      $ npx eslint --init
    ```

    1. You will be asked a few questions:

        ```
        Q: How would you like to use ESlint?
        A: To check syntax, find problems, and enforce code style

        Q: What type of modules does your project use?
        A: JavaScript modules (import/export)

        Q: Which framework does your project use?
        A: None of these

        Q: Does your project use TypeScript?
        A: Yes

        Q: Where does your code run?
        A: Node

        Q: How would you like to define a style for your project?
        A: Use a popular style guide

        Q: Which style guide do you want to follow?
        A: Airbnb

        Q: What format do you want your config file to be in?
        A: JSON
        ```

    2. You will be asked to download some packages. Choose yes.
    3. A .eslintrc.json file will be created, Add the followin in the extends array
        ```
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended"
        ```
    4. Add the block in the rules object
        ```
        "prettier/prettier": "error",
        "import/extensions": [
          "error",
          "ignorePackages",
          {
            "js": "never",
            "jsx": "never",
            "ts": "never",
            "tsx": "never"
          }
        ]
        ```

4. Create .editorconfig file in root directory and add the below:

    ```
    root = true

    [*]
    charset = utf-8
    end_of_line = lf
    insert_final_newline = true
    indent_style = space
    indent_size = 4
    trim_trailing_whitespace = true
    ```

5. Configure prettier, husky, tsconfig and lint-staged

    1. edit the config below to package.json

    ```
     "lint-staged": {
     "*.{ts,js}": "eslint --cache --fix"
     },
     "husky": {
       "hooks": {
         "pre-commit": "npm run lint"
       }
     },
    ```

    2. Add the following scripts in package.json

    ```
    "scripts": {
       "build": "npm run clean && tsc ",
       "dev": "ts-node-dev --poll src/index.ts",
       "clean": "rimraf ./dist/*",
       "test": "jest --watchAll --no-cache",
       "lint": "pretty-quick --staged && lint-staged"
    }
    ```

    3. create a .prettierrc.js file and add the following:

    ```
    module.exports = {
     semi: true,
     trailingComma: 'none',
     singleQuote: true,
     printWidth: 90,
     tabWidth: 4
    };

    ```

    4. open tsconfig.json and uncomment the two line and make changes to outDir

    ```
    "declaration": true,
    "outDir": "./dist"
    ```

6. Set up jest

    1. Add the config below in package.json

    ```
    "jest": {
       "preset": "ts-jest",
       "testEnvironment": "node",
       "setupFilesAfterEnv": [
           "./src/test/setup.ts"
       ]
    }
    ```

7. Create a empty file under src > test > setup.ts
